<?php

namespace Drupal\public_preview\Storage;

use Drupal\Core\Cache\Cache;
use Drupal\Core\Database\Connection;
use Drupal\Core\Database\SchemaObjectExistsException;
use Drupal\Core\Language\LanguageInterface;

/**
 * Class PreviewStorage.
 *
 * Based on the Drupal\Core\Path\AliasStorage.
 *
 * @package Drupal\public_preview\Storage
 */
class PreviewStorage implements PreviewStorageInterface {

  /**
   * The table for the url_path storage.
   */
  const TABLE = 'public_preview';

  /**
   * The database connection.
   *
   * @var \Drupal\Core\Database\Connection
   */
  protected $connection;

  /**
   * Constructs a Preview CRUD object.
   *
   * @param \Drupal\Core\Database\Connection $connection
   *   A database connection for reading and writing previews.
   */
  public function __construct(Connection $connection) {
    $this->connection = $connection;
  }

  /**
   * {@inheritdoc}
   */
  public function save($nid, $hash, $langcode = LanguageInterface::LANGCODE_NOT_SPECIFIED, $id = NULL) {
    $fields = [
      'nid' => $nid,
      'hash' => $hash,
      'langcode' => $langcode,
    ];

    $result = FALSE;
    // Insert or update the preview.
    if (NULL === $id) {
      $tryAgain = FALSE;
      try {
        $query = $this->connection->insert(static::TABLE)
          ->fields($fields);
        $result = $query->execute();
      }
      catch (\Exception $e) {
        // If there was an exception, try to create the table.
        if (!$tryAgain = $this->ensureTableExists()) {
          // If the exception happened for other reason than the missing table,
          // propagate the exception.
          throw $e;
        }
      }
      // Now that the table has been created, try again if necessary.
      if ($tryAgain) {
        $query = $this->connection->insert(static::TABLE)
          ->fields($fields);
        $result = $query->execute();
      }

      $fields['id'] = $id;
    }
    else {
      // Fetch the current values so that an update hook can identify what
      // exactly changed.
      try {
        $query = $this->connection->select(static::TABLE);
        $query->fields(static::TABLE, ['nid', 'hash', 'langcode']);
        $query->condition('id', $id);
        $result = $query->execute();
        $original = $result->fetchAssoc();
      }
      catch (\Exception $e) {
        $this->catchException($e);
        $original = FALSE;
      }
      $fields['id'] = $id;
      $query = $this->connection->update(static::TABLE)
        ->fields($fields)
        ->condition('id', $id);
      $result = $query->execute();
      $fields['original'] = $original;
    }
    if ($result) {
      Cache::invalidateTags(['route_match']);
      return $fields;
    }
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function load(array $conditions) {
    $select = $this->connection->select(static::TABLE);
    foreach ($conditions as $field => $value) {
      if ($field === 'hash') {
        // Use LIKE for case-insensitive matching.
        $select->condition($field, $this->connection->escapeLike($value), 'LIKE');
      }
      else {
        $select->condition($field, $value);
      }
    }
    try {
      return $select
        ->fields(static::TABLE)
        ->orderBy('id', 'DESC')
        ->range(0, 1)
        ->execute()
        ->fetchAssoc();
    }
    catch (\Exception $e) {
      $this->catchException($e);
      return FALSE;
    }
  }

  /**
   * {@inheritdoc}
   */
  public function loadMultiple(array $ids = []) {
    $select = $this->connection->select(static::TABLE);

    if (!empty($ids)) {
      $select->condition('id', $ids, 'in');
    }

    try {
      return $select->fields(static::TABLE)
        ->orderBy('id')
        ->execute()
        ->fetchAllAssoc('id');
    }
    catch (\Exception $e) {
      $this->catchException($e);
      return FALSE;
    }
  }

  /**
   * {@inheritdoc}
   */
  public function loadForNode($nid) {
    // @todo: Clean up.
    $select = $this->connection->select(static::TABLE);
    $select->fields(static::TABLE);
    $select->condition('nid', $nid);
    $result = $select->execute();

    return $result->fetchAllAssoc('langcode');
  }

  /**
   * {@inheritdoc}
   */
  public function delete(array $conditions) {
    $query = $this->connection->delete(static::TABLE);
    foreach ($conditions as $field => $value) {
      if ($field === 'hash') {
        // Use LIKE for case-insensitive matching.
        $query->condition($field, $this->connection->escapeLike($value), 'LIKE');
      }
      else {
        $query->condition($field, $value);
      }
    }
    try {
      $deleted = $query->execute();
    }
    catch (\Exception $e) {
      $this->catchException($e);
      $deleted = FALSE;
    }
    Cache::invalidateTags(['route_match']);
    return $deleted;
  }

  /**
   * Check if the table exists and create it if not.
   */
  protected function ensureTableExists() {
    try {
      $databaseSchema = $this->connection->schema();
      if (!$databaseSchema->tableExists(static::TABLE)) {
        $schemaDefinition = static::schemaDefinition();
        $databaseSchema->createTable(static::TABLE, $schemaDefinition);
        return TRUE;
      }
    }

    // If another process has already created the table,
    // attempting to recreate it will throw an exception.
    // In this case just catch the exception and do nothing.
    catch (SchemaObjectExistsException $e) {
      return TRUE;
    }
    return FALSE;
  }

  /**
   * Act on an exception when url_alias might be stale.
   *
   * If the table does not yet exist, that's fine, but if the table exists and
   * yet the query failed, then the url_alias is stale and the exception needs
   * to propagate.
   *
   * @param \Exception $exception
   *   The exception.
   *
   * @throws \Exception
   */
  protected function catchException(\Exception $exception) {
    if ($this->connection->schema()->tableExists(static::TABLE)) {
      throw $exception;
    }
  }

  /**
   * Defines the schema for the {public_preview} table.
   */
  public static function schemaDefinition() {
    return [
      'description' => 'The table for public node previews.',
      'fields' => [
        'id' => [
          'description' => 'The ID of the preview.',
          'type' => 'serial',
          'unsigned' => TRUE,
          'not null' => TRUE,
        ],
        'nid' => [
          'description' => 'The ID of the node.',
          'type' => 'int',
          'unsigned' => TRUE,
          'not null' => TRUE,
        ],
        'hash' => [
          'description' => 'The public hash.',
          'type' => 'varchar',
          'length' => 255,
          'not null' => TRUE,
        ],
        'langcode' => [
          'description' => 'The language code.',
          'type' => 'varchar_ascii',
          'length' => 12,
          'not null' => TRUE,
          'default' => '',
        ],
      ],
      'primary key' => ['id'],
      'indexes' => [
        'hash_langcode_id' => ['hash', 'langcode', 'id'],
        'nid_langcode_id' => ['nid', 'langcode', 'id'],
      ],
      // Only for documentation.
      'foreign_keys' => [
        'node' => [
          'table' => 'node',
          'columns' => [
            'nid' => 'nid',
          ],
        ],
      ],
    ];
  }

}

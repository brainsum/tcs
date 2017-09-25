<?php

namespace Drupal\node_public_url\Storage;

use Drupal\Core\Language\LanguageInterface;

/**
 * Provides a class for CRUD operations on public paths.
 */
interface PathStorageInterface {

  /**
   * Create or update a path.
   *
   * @param int $nid
   *   The node ID.
   * @param string $path
   *   The public path.
   * @param string $langcode
   *   (optional) The language code.
   * @param null|int $id
   *   (optional) The path ID.
   *
   * @return array|bool
   *   FALSE, if the save failed.
   *   An associative array with the following keys:
   *   - $nid (int): The node id.
   *   - $path (string): The public path.
   *   - $id (int): Unique identifier.
   *   - $langcode (string): The language code of the path.
   *
   * @throws \InvalidArgumentException
   * @throws \Exception
   */
  public function save($nid, $path, $langcode = LanguageInterface::LANGCODE_NOT_SPECIFIED, $id = NULL);

  /**
   * Fetches a specific public path from the database.
   *
   * The default implementation performs case-insensitive matching on the
   * '$path' string.
   *
   * @param array $conditions
   *   An array of query conditions.
   *
   * @return \stdClass[]|false
   *   FALSE if no path was found or an associative array containing the
   *   following keys:
   *   - $nid (int): The node id.
   *   - $path (string): The public path.
   *   - $id (int): Unique identifier.
   *   - $langcode (string): The language code of the path.
   *
   * @throws \Exception
   */
  public function load(array $conditions);

  /**
   * Load multiple paths.
   *
   * @param array $ids
   *   (optional) An array of IDs.
   *
   * @return \stdClass[]|bool
   *   FALSE, if there was a handled exception.
   *   An associative or empty array otherwise.
   *
   * @throws \Exception
   */
  public function loadMultiple(array $ids = []);

  /**
   * Load paths for a node keyed by the language code.
   *
   * @param int $nid
   *   The node ID.
   *
   * @return \stdClass[]|bool
   *   FALSE, if there was a handled exception.
   *   An array of paths or an empty array.
   */
  public function loadForNode($nid);

  /**
   * Deletes a public path.
   *
   * The default implementation performs case-insensitive matching on the
   * 'path' string.
   *
   * @param array $conditions
   *   An array of criteria.
   *
   * @throws \Exception
   */
  public function delete(array $conditions);

}

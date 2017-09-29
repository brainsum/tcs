<?php

namespace Drupal\public_preview\Storage;

use Drupal\Core\Language\LanguageInterface;

/**
 * Provides a class for CRUD operations on public previews.
 */
interface PreviewStorageInterface {

  /**
   * Create or update a preview.
   *
   * @param int $nid
   *   The node ID.
   * @param string $hash
   *   The public preview.
   * @param string $langcode
   *   (optional) The language code.
   * @param null|int $id
   *   (optional) The preview ID.
   *
   * @return array|bool
   *   FALSE, if the save failed.
   *   An associative array with the following keys:
   *   - $nid (int): The node id.
   *   - $hash (string): The unique hash.
   *   - $id (int): Unique identifier.
   *   - $langcode (string): The language code of the preview.
   *
   * @throws \InvalidArgumentException
   * @throws \Exception
   */
  public function save($nid, $hash, $langcode = LanguageInterface::LANGCODE_NOT_SPECIFIED, $id = NULL);

  /**
   * Fetches a specific public preview from the database.
   *
   * The default implementation performs case-insensitive matching on the
   * '$hash' string.
   *
   * @param array $conditions
   *   An array of query conditions.
   *
   * @return \stdClass[]|false
   *   FALSE if no preview was found or an associative array containing the
   *   following keys:
   *   - $nid (int): The node id.
   *   - $hash (string): The unique hash.
   *   - $id (int): Unique identifier.
   *   - $langcode (string): The language code of the preview.
   *
   * @throws \Exception
   */
  public function load(array $conditions);

  /**
   * Load multiple previews.
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
   * Load previews for a node keyed by the language codes.
   *
   * @param int $nid
   *   The node ID.
   *
   * @return \stdClass[]|bool
   *   FALSE, if there was a handled exception.
   *   An array of previews or an empty array.
   */
  public function loadForNode($nid);

  /**
   * Deletes public previews according to the conditions.
   *
   * The default implementation performs case-insensitive matching on the
   * 'hash' string.
   *
   * @param array $conditions
   *   An array of criteria.
   *
   * @throws \Exception
   */
  public function delete(array $conditions);

}

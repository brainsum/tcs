<?php

namespace Drupal\campaign_pages\Service;

use Drupal\Core\Database\Connection;
use Drupal\node\NodeInterface;

/**
 * Class OnepageIdAutoincrement.
 *
 * @package Drupal\campaign_pages\Service
 */
class OnepageIdAutoincrement {

  protected $database;

  /**
   * OnepageIdAutoincrement constructor.
   *
   * @param \Drupal\Core\Database\Connection $database
   *   The database connection.
   */
  public function __construct(Connection $database) {
    $this->database = $database;
  }

  /**
   * Increments the $node->parade_onepage_id value if needed.
   *
   * The new value is going to be 'current max value + 1'.
   * If incrementing is not needed, no new value is set.
   * Note, we don't save the node here.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The node to be updated.
   *
   * @throws \Drupal\Core\Database\InvalidQueryException
   * @throws \InvalidArgumentException
   * @throws \Drupal\Core\TypedData\Exception\ReadOnlyException
   */
  public function doIncrement(NodeInterface $node) {
    if ($node->hasField('parade_onepage_id') && !empty($node->get('parade_onepage_id')->value)) {
      $onepageId = $node->get('parade_onepage_id')->value;
      $select = $this->database->select('node__parade_onepage_id');
      $select->fields('node__parade_onepage_id', ['entity_id', 'parade_onepage_id_value']);
      $select->condition('parade_onepage_id_value', $onepageId . '%', 'like');
      $result = $select->execute();

      if (NULL === $result) {
        return;
      }

      /** @var array $rows */
      $rows = $result->fetchAllAssoc('entity_id');
      $count = count($rows);

      // If the current onepage ID already exists, but we are not trying to
      // save that entity, then we need an autoincrement value.
      if ($count > 0 && !array_key_exists((string) $node->id(), $rows)) {

        $value = 0;
        foreach ($rows as $row) {
          // If it's the same ID, skip.
          if ($onepageId === $row->parade_onepage_id_value) {
            continue;
          }

          // Remove the "$onepageId_" from every queried item.
          $counter = str_replace($onepageId . '_', '', $row->parade_onepage_id_value);

          // If the counter is empty, skip.
          if (empty($counter)) {
            continue;
          }

          // Determine the max value among the counters.
          $value = max($value, (int) $counter);
        }

        // If the value is the initial one, then there are no existing IDs,
        // so we start at 1.
        // If it's not 0, there are already IDs present,
        // so we increment the max, and use that.
        $value = ($value === 0) ? 1 : ++$value;
        $onepageId .= '_' . $value;
        $node->get('parade_onepage_id')->setValue($onepageId);
      }
    }
  }

}

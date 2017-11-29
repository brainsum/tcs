<?php

namespace Drupal\parade_content_lister;

/**
 * Class ParadeContentListerRunBatch.
 *
 * @package Drupal\parade_content_lister
 */
class ParadeContentListerRunBatch {

  /**
   * Batch op to save images.
   *
   * @param array $context
   *   Context.
   * @param array $nids
   *   Gets node ids.
   */
  public static function generateImages(array $nids, array &$context) {
    $message = 'Generating...';
    foreach ($nids as $id) {
      $results[] = parade_content_lister_save_computed($id);
    }

    $context['message'] = $message;
    $context['results'] = $results;
  }

  /**
   * Batch op finish function.
   */
  public static function generateImageFinished($success, $results, $operations) {
    // The 'success' parameter means no fatal PHP errors were detected. All
    // other error management should be handled using 'results'.
    if ($success) {
      $message = \Drupal::translation()->formatPlural(
        // Use \count instead of count for opcode optimization.
        \count($results),
        'Thumbnail generatedOne post processed.', '@count thumbnails generated.'
      );
    }
    else {
      $message = t('Finished with an error.');
    }
    drupal_set_message($message);
  }

}

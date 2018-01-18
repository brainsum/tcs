<?php

namespace Drupal\campaign_pages\Handler;

use Drupal\Core\Database\StatementInterface;
use Drupal\Core\Entity\EntityStorageInterface;

/**
 * Class ColorUpdateHandler.
 *
 * @package Drupal\campaign_pages\Handler
 */
class ColorUpdateHandler {

  /**
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  protected $storage;

  protected $targetIdField = 'parade_onepage_sections_target_revision_id';
  protected $colorSchemeField = 'parade_color_scheme';
  protected $layoutField = 'parade_layout';

  public function __construct() {
    $this->storage = \Drupal::entityTypeManager()->getStorage('paragraph');
  }

  /**
   * @param string $targetIdField
   */
  public function setTargetIdField($targetIdField) {
    $this->targetIdField = $targetIdField;
  }

  /**
   * @param \Drupal\Core\Entity\EntityStorageInterface $storage
   */
  public function setStorage(EntityStorageInterface $storage) {
    $this->storage = $storage;
  }

  /**
   * Helper function for updating the color_scheme field value.
   *
   * @param \Drupal\Core\Database\StatementInterface $results
   *   Query results.
   * @param null|string $targetColor
   *   NULL to set the field to 'None', or
   *   The machine name of the target color (classy paragraph).
   * @param null|bool|string $originalColor
   *   FALSE if the update should happen for any value, or
   *   NULL if the 'None' field is targeted, or
   *   The machine name of the original color (classy paragraph).
   *   Note: Use an invalid machine name (e.g 'placeholder') to
   *   disable the color check. This makes the code rely on the layout only.
   * @param null|bool|string $layout
   *   FALSE to disable the check, or
   *   NULL for the 'None' layout, or
   *   The layout machine name.
   */
  public function handle(
    StatementInterface $results,
    $targetColor,
    $originalColor = FALSE,
    $layout = FALSE
  ) {
    foreach ($results as $result) {
      $revisionId = $result->{$this->targetIdField};
      /** @var \Drupal\paragraphs\Entity\Paragraph $entityRevision */
      $entityRevision = $this->storage->loadRevision($revisionId);

      if (NULL === $entityRevision) {
        drush_print("Paragraph with revision ID '$revisionId' is NULL.");
        continue;
      }

      $translations = $entityRevision->getTranslationLanguages();
      foreach ($translations as $langcode => $language) {
        /** @var \Drupal\paragraphs\Entity\Paragraph $entity */
        $entity = $entityRevision->getTranslation($langcode);
        // We can only update colors for entities with the color field.
        if ($entity->hasField($this->colorSchemeField)) {
          $colorCondition = (FALSE === $originalColor ? TRUE : $entity->{$this->colorSchemeField}->target_id === $originalColor);
          $layoutCondition = (FALSE !== $layout && $entity->hasField($this->layoutField) && $entity->{$this->layoutField}->target_id === $layout);

          if ($colorCondition || $layoutCondition) {
            $entity->{$this->colorSchemeField}->target_id = $targetColor;
            $entity->setNewRevision(FALSE);
            $entity->enforceIsNew(FALSE);
            $entity->save();
          }
        }
      }
    }
  }

}

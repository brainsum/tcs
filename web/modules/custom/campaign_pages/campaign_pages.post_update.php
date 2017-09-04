<?php

/**
 * @file
 * Post update functions for Campaign Pages.
 */

use Drupal\Core\Database\Database;
use Drupal\Core\Database\StatementInterface;
use Drupal\Core\Entity\EntityStorageInterface;

/**
 * Re-save classy paragraphs.
 */
function campaign_pages_post_update_8001() {
  echo "\nRunning: campaign_pages_post_update_resave_classy_paragraphs\n";
  $entityStorage = \Drupal::entityTypeManager()->getStorage('classy_paragraphs_style');
  $classes = $entityStorage->loadMultiple();
  foreach ($classes as $class) {
    $class->save();
  }
}

/**
 * Copy old data to parade 2.x fields.
 */
function campaign_pages_post_update_8002() {
  echo "\nRunning: campaign_pages_post_update_parade_value_migration\n";

  // Old fields with same type as new field.
  $fields = [
    'field_anchor' => 'parade_anchor',
    'field_background' => 'parade_background',
    'field_boxes_per_row' => 'parade_boxes_per_row',
    'field_call_to_action' => 'parade_call_to_action',
    //    'field_color_scheme' => 'parade_color_scheme',
    'field_enable_confirm_message' => 'parade_enable_confirm_message',
    'field_enable_linkedin_autofill' => 'parade_enable_linkedin_autofill',
    'field_enable_parallax' => 'parade_enable_parallax',
    'field_geofield' => 'parade_geofield',
    'field_image' => 'parade_image',
    'field_images' => 'parade_images',
    'field_input_label' => 'parade_input_label',
    //    'field_layout' => 'parade_layout',
    'field_lead_text' => 'parade_lead_text',
    'field_location' => 'parade_location',
    'field_marketo_form' => 'parade_marketo_form',
    'field_marketo_poll' => 'parade_marketo_poll',
    'field_minimum_height' => 'parade_minimum_height',
    'field_paragraphs' => 'parade_paragraphs',
    'field_result_label' => 'parade_result_label',
    'field_secondary_title' => 'parade_secondary_title',
    'field_social_link' => 'parade_social_link',
    'field_text' => 'parade_text',
    'field_title' => 'parade_title',
    'field_twitter_feed' => 'parade_twitter_feed',
    'field_value' => 'parade_value',
    'field_view_mode' => 'parade_view_mode',
  ];

  // Old layout fields goes to layout + view mode fields.
  $layouts = [
    'marketo_form' => [
      'field_marketo_form_layout' => [
        // Clean.
        0 => [
          'layout' => 'layout_clean',
        ],
        // Download.
        1 => [
          'layout' => 'layout_download',
        ],
      ],
    ],
    'simple' => [
      'field_simple_layout' => [
        0 => [
          'view_mode' => 'default',
          'layout' => 'layout_one_column_centered',
          'color' => 'color_default',
        ],
        1 => [
          'view_mode' => 'default',
          'layout' => 'layout_one_column',
          'color' => 'color_light_grey',
        ],
        2 => [
          'view_mode' => 'default',
          'layout' => 'layout_one_column',
          'color' => 'color_shaded',
        ],
        3 => [
          'view_mode' => 'inverse',
          'layout' => 'layout_two_column_title_1st',
        ],
        4 => [
          'view_mode' => 'inverse',
          'layout' => 'layout_two_column_content_1st',
        ],
        5 => [
          'view_mode' => 'default',
          'layout' => 'layout_separator_clean',
        ],
      ],
    ],
    'image_text' => [
      'field_image_text_layout' => [
        0 => [
          'view_mode' => 'default',
          'layout' => 'layout_image_1st',
        ],
        1 => [
          'view_mode' => 'inverse',
          'layout' => 'layout_text_1st',
        ],
        2 => [
          'view_mode' => 'inverse',
          'layout' => 'layout_text_1st_enhanced',
        ],
      ],
    ],
    'text_box' => [
      'field_text_box_layout' => [
        0 => [
          'color' => 'color_light_grey',
        ],
        1 => [
          'color' => 'color_blue',
        ],
        2 => [
          'color' => 'color_red',
        ],
        3 => [
          'color' => 'color_orange',
        ],
        4 => [
          'color' => 'color_green',
        ],
      ],
    ],
    'text_boxes' => [
      'field_text_boxes_layout' => [
        0 => [
          'view_mode' => 'default',
          'layout' => 'layout_none',
        ],
        1 => [
          'view_mode' => 'default',
          'layout' => 'layout_text_with_an_icon',
        ],
        2 => [
          'view_mode' => 'default',
          'layout' => 'layout_lot_of_infos',
        ],
        3 => [
          'view_mode' => 'default',
          'layout' => 'layout_lot_of_infos',
          'color' => 'color_light_grey',
        ],
        4 => [
          'view_mode' => 'default',
          'layout' => 'layout_text_with_an_icon',
        ],
        5 => [
          'view_mode' => 'custom',
          'layout' => 'layout_rounded_image',
        ],
        6 => [
          'view_mode' => 'default',
          'layout' => 'layout_contacts',
        ],
      ],
    ],
  ];

  $colors = [
    'header' => [
      'red' => 'color_red',
      'grey_dark' => 'color_dark_grey',
      'blue' => 'color_blue',
    ],
    'image_text' => [
      'grey_light' => 'color_light_grey',
    ],
    'locations' => [
      'orange_light' => 'color_light_orange',
    ],
    'marketo_form' => [
      'orange' => 'color_orange',
    ],
    'simple' => [
      'grey' => 'color_grey',
    ],
    'text_box' => [
      'green_light' => 'color_light_green',
      'red_light' => 'color_light_red',
    ],
    'text_boxes' => [
      'green' => 'color_green',
      'blue_light' => 'color_light_blue',
    ],
  ];

  /** @var \Drupal\file\FileUsage\FileUsageInterface $fileUsage */
  $fileUsage = \Drupal::service('file.usage');
  $fileStorage = \Drupal::entityTypeManager()->getStorage('file');
  $fileFields = [
    'field_background',
    'parade_image',
    'parade_images',
  ];

  $paragraphStorage = \Drupal::entityTypeManager()->getStorage('paragraph');
  $typeStorage = \Drupal::entityTypeManager()->getStorage('paragraphs_type');
  // Load the paragraph types.
  $paragraphTypes = $typeStorage->loadMultiple();

  foreach ($paragraphTypes as $type) {
    // Chart box and boxes are new, no need for migrating them.
    if (in_array($type->id(), ['chart_box', 'chart_boxes'], FALSE)) {
      continue;
    }
    $results = [];
    // Load every paragraph active revisions for each type separately.
    if ($type->id() === 'text_box') {
      // @todo - re-save only active revisions.

      if (Database::getConnection()->schema()->tableExists('paragraph_revision__field_paragraphs')) {
        $results = Database::getConnection()
          ->query("SELECT DISTINCT field_paragraphs_target_revision_id FROM {paragraph_revision__field_paragraphs}");
      }
      else {
        drupal_set_message('paragraph_revision__field_paragraphs does not exists. If this is not a new migration, this warning can be ignored.', 'warning');
      }
    }
    else {
      $results = Database::getConnection()
        ->query("SELECT nfp.field_paragraphs_target_revision_id FROM {node__field_paragraphs} AS nfp, {paragraphs_item} AS pi WHERE nfp.field_paragraphs_target_id = pi.id AND pi.type = :type_id", [':type_id' => $type->id()]);
    }
    foreach ($results as $result) {
      /** @var \Drupal\paragraphs\Entity\Paragraph $entityRevision */
      $entityRevision = $paragraphStorage->loadRevision($result->field_paragraphs_target_revision_id);
      $translations = $entityRevision->getTranslationLanguages();
      foreach ($translations as $langcode => $language) {
        /** @var \Drupal\paragraphs\Entity\Paragraph $entity */
        $entity = $entityRevision->getTranslation($langcode);
        $entityType = $entity->getType();

        foreach ($fields as $old_field => $new_field) {
          if ($entity->hasField($old_field)) {
            $entity->set($new_field, $entity->get($old_field)->getValue());

            $entity->get($new_field)->setLangcode($entity->get($old_field)
              ->getLangcode());
          }
        }
        // Layout field.
        if (isset($layouts[$entityType])) {
          foreach ($layouts[$entityType] as $old_layout_field => $layout_mappings) {
            if (isset($entity->{$old_layout_field})) {
              $layout_settings = $layout_mappings[$entity->{$old_layout_field}->value];
              if (isset($entity->parade_view_mode)) {
                $entity->parade_view_mode->value = $layout_settings['view_mode'];
              }
              // Set colors according to the settings. If it was specifically
              // Overwritten in field_color_scheme, we set the overwrite later.
              if (isset($entity->parade_color_scheme, $layout_settings['color'])) {
                $entity->parade_color_scheme->target_id = $layout_settings['color'];
              }
              // Layouts were removed for text_box types, so we need to check
              // fields and settings.
              if (isset($entity->parade_layout, $layout_settings['layout'])) {
                $entity->parade_layout->target_id = $layout_settings['layout'];
              }
            }
          }
        }
        // Color scheme field.
        // @see: https://brainsum.atlassian.net/browse/TCS-307,
        // 'text_box old colors can be ignored'
        if ('text_box' !== $entityType && isset(
            $colors[$entityType],
            $entity->field_color_scheme,
            $colors[$entityType][$entity->field_color_scheme->target_id]
          )
        ) {
          $entity->parade_color_scheme->target_id = $colors[$entityType][$entity->field_color_scheme->target_id];
        }

        $entity->setNewRevision(FALSE);
        $entity->enforceIsNew(FALSE);
        $entity->save();
      }
    }
  }
}

/**
 * Additional fixes for colors and layouts.
 */
function campaign_pages_post_update_8003() {
  // Text boxes: light_blue color -> Text box: light_grey should be default.
  $paragraphStorage = \Drupal::entityTypeManager()->getStorage('paragraph');
  $entities = $paragraphStorage->loadByProperties(['type' => 'text_boxes']);

  /** @var \Drupal\paragraphs\Entity\Paragraph $entity */
  foreach ($entities as $entity) {
    if (isset($entity->parade_layout, $entity->parade_color_scheme) && 'layout_rounded_image' === $entity->parade_layout->target_id) {
      $data = $entity->get('parade_paragraphs')->getValue();
      $data = array_map(function ($item) {
        return $item['target_id'];
      }, $data);
      // Load them at once in hopes of a performance gain.
      // Note: I seriously hope the order stays the same.
      // @todo: Load every revision, like above.
      $references = $paragraphStorage->loadMultiple($data);
      /** @var \Drupal\paragraphs\Entity\Paragraph $textBox */
      foreach ($references as $textBox) {
        $textBox->parade_color_scheme->target_id = 'color_default';
        // @todo: This will likely screw up revisions again.
        $textBox->setNewRevision(FALSE);
        $textBox->enforceIsNew(FALSE);
        $textBox->save();
      }
      // @todo: Re-save parade_paragraphs with new revisions?
    }
  }

}

/**
 * Update Header colors to Blue.
 */
function campaign_pages_post_update_8004() {
  $results = Database::getConnection()
    ->query('SELECT nfp.field_paragraphs_target_revision_id FROM {node__field_paragraphs} AS nfp, {paragraphs_item} AS pi WHERE nfp.field_paragraphs_target_id = pi.id AND pi.type = :type_id', [
      ':type_id' => 'header',
    ]);

  $paragraphStorage = \Drupal::entityTypeManager()->getStorage('paragraph');
  _campaign_pages_color_update_helper($paragraphStorage, $results, 'color_blue');
}

/**
 * Update remaining color fields.
 */
function campaign_pages_post_update_8005() {
  $paragraphStorage = \Drupal::entityTypeManager()->getStorage('paragraph');
  $database = \Drupal::database();
  $baseQuery = 'SELECT nfp.field_paragraphs_target_revision_id FROM {node__field_paragraphs} AS nfp, {paragraphs_item} AS pi WHERE nfp.field_paragraphs_target_id = pi.id';

  // Set light_grey for marketo_form and social_links.
  $results = $database
    ->query($baseQuery . ' AND pi.type IN (:type_ids[]);',
      [':type_ids[]' => ['marketo_form', 'social_links']]
    );
  _campaign_pages_color_update_helper($paragraphStorage, $results, 'color_light_grey');

  // Change 'Color default' to 'None'.
  $results = $database
    ->query($baseQuery . ';');
  _campaign_pages_color_update_helper($paragraphStorage, $results, NULL, 'color_default');

  // Simple 'Color shaded' should be 'Color light blue'.
  $results = $database
    ->query($baseQuery . ' AND pi.type = :type_id;', [
      ':type_id' => 'simple',
    ]);
  // Simple 'Color shaded' should be 'Color light blue'.
  _campaign_pages_color_update_helper($paragraphStorage, $results, 'color_light_blue', 'color_shaded');
  // Use the 'placeholder' string to disable to color check, so we only
  // use the layout for the comparison.
  $results = $database
    ->query($baseQuery . ' AND pi.type = :type_id;', [
      ':type_id' => 'simple',
    ]);
  _campaign_pages_color_update_helper($paragraphStorage, $results, 'color_blue', 'placeholder', 'layout_two_column_title_1st');
}

/**
 * Helper function for updating the color_scheme field value.
 *
 * @param \Drupal\Core\Entity\EntityStorageInterface $paragraphStorage
 *   Paragraph storage.
 * @param \Drupal\Core\Database\StatementInterface $results
 *   Query results.
 * @param null|string $targetColor
 *   NULL to set the field to 'None', or
 *   The machine name of the target color (classy paragraph).
 * @param null|bool|string $originalColor
 *   FALSE if the update should happen for any value, or
 *   NULL if the 'None' field is targeted, or
 *   The machine name of the original color (classy paragraph).
 *   Note: Use an invalid machine name (e.g 'placeholder') to disable the color
 *   check. This makes the code rely on the layout only.
 * @param null|bool|string $layout
 *   FALSE to disable the check, or
 *   NULL for the 'None' layout, or
 *   The layout machine name.
 */
function _campaign_pages_color_update_helper(
  EntityStorageInterface $paragraphStorage,
  StatementInterface $results,
  $targetColor,
  $originalColor = FALSE,
  $layout = FALSE
) {
  foreach ($results as $result) {
    /** @var \Drupal\paragraphs\Entity\Paragraph $entityRevision */
    $entityRevision = $paragraphStorage->loadRevision($result->field_paragraphs_target_revision_id);
    $translations = $entityRevision->getTranslationLanguages();
    foreach ($translations as $langcode => $language) {
      /** @var \Drupal\paragraphs\Entity\Paragraph $entity */
      $entity = $entityRevision->getTranslation($langcode);
      // We can only update colors for entities with the color field.
      if ($entity->hasField('parade_color_scheme')) {
        $colorCondition = (FALSE === $originalColor ? TRUE : $entity->parade_color_scheme->target_id === $originalColor);
        $layoutCondition = (FALSE !== $layout && $entity->hasField('parade_layout') && $entity->parade_layout->target_id === $layout);

        if ($colorCondition || $layoutCondition) {
          $entity->parade_color_scheme->target_id = $targetColor;
          $entity->setNewRevision(FALSE);
          $entity->enforceIsNew(FALSE);
          $entity->save();
        }
      }
    }
  }
}

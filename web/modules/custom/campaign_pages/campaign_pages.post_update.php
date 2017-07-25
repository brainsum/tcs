<?php

/**
 * @file
 * Post update functions for Campaign Pages.
 */

/**
 * Copy old data to parade 2.x fields.
 */
function campaign_pages_post_update_parade_value_migration() {

//  // Load all campaign pages entities.
//  $nodeStorage = \Drupal::entityTypeManager()->getStorage('node');
//  $nodes = $nodeStorage->loadByProperties(['type' => 'campaign']);
//  $fields = [
//    'field_machine_name' => 'parade_machine_name',
//    'field_paragraphs' => 'parade_onepage_sections',
//  ];
//  foreach ($nodes as $node) {
//    foreach ($fields as $old_field => $new_field) {
//      if (isset($node->{$old_field})) {
//        $node->{$new_field} = $node->{$old_field};
//      }
//    }
//  $node->setNewRevision(FALSE);
//  $node->save();
//  }

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
          'color' => 'color_default',
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
    // Load every paragraph for each type separately.
    $entities = $paragraphStorage->loadByProperties(['type' => $type->id()]);

    if ($type->id() === 'text_boxes') {
      echo 'Text boxes: ' . count($entities);
    }

    /** @var \Drupal\paragraphs\Entity\Paragraph $entity */
    foreach ($entities as $entity) {
      $entityType = $entity->getType();

      foreach ($fields as $old_field => $new_field) {
        if ($entity->hasField($old_field)) {
          if (in_array($new_field, $fileFields, TRUE)) {
            foreach ($entity->get($old_field)->getValue() as $value) {
              /** @var \Drupal\file\Entity\File $file */
              $file = $fileStorage->load($value['target_id']);
              if (NULL !== $file) {
                // @todo: Image alts.
                $file->setPermanent();
                $file->save();
                $entity->set($new_field, $file);
                $fileUsage->add($file, 'file', 'paragraph', (NULL === $file->getOwnerId()) ? 1 : $file->getOwnerId());
              }
              else {
                echo 'File entity is NULL for file ID ' . $value['target_id'] . "\n";
              }
            }
          }
          else {
            $entity->set($new_field, $entity->get($old_field)->getValue());
            $entity->get($new_field)->setLangcode($entity->get($old_field)
              ->getLangcode());
          }
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
      )) {
        $entity->parade_color_scheme->target_id = $colors[$entityType][$entity->field_color_scheme->target_id];
      }

      $entity->setNewRevision(FALSE);
      $entity->save();
    }
  }
}

/**
 * Re-save classy paragraphs.
 */
function campaign_pages_post_update_resave_classy_paragraphs() {
  $entityStorage = \Drupal::entityTypeManager()->getStorage('classy_paragraphs_style');
  $classes = $entityStorage->loadMultiple();
  foreach ($classes as $class) {
    $class->save();
  }
}

<?php

namespace Drupal\twitter_feed_parade_type\Plugin\Field\FieldType;

use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\TypedData\DataDefinition;

/**
 * Plugin implementation of the 'twitter_feed' field type.
 *
 * @FieldType(
 *   id = "twitter_feed",
 *   label = @Translation("Twitter Feed"),
 *   module = "twitter_feed_parade_type",
 *   description = @Translation("Twitter Feed field type."),
 *   default_widget = "twitter_feed",
 *   default_formatter = "twitter_feed"
 * )
 */
class TwitterFeed extends FieldItemBase {

  /**
   * {@inheritdoc}
   */
  public static function schema(FieldStorageDefinitionInterface $field_definition) {
    return [
      'columns' => [
        'type' => [
          'description' => 'The feed type.',
          'type' => 'int',
          'not null' => TRUE,
        ],
        'width' => [
          'description' => 'The feed width.',
          'type' => 'int',
          'not null' => FALSE,
        ],
        'height' => [
          'description' => 'The feed height.',
          'type' => 'int',
          'not null' => FALSE,
        ],
        'username' => [
          'description' => t('The username.'),
          'type' => 'varchar',
          'length' => 255,
        ],
        'widget_id' => [
          'description' => t('The widget ID.'),
          'type' => 'varchar',
          'length' => 72,
        ],
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function isEmpty() {
    $type = $this->get('type')->getValue();

    return $type === NULL || $type === '';
  }

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {
    $properties['type'] = DataDefinition::create('integer')
      ->setLabel(t('Feed type'));
    $properties['width'] = DataDefinition::create('integer')
      ->setLabel(t('Width'));
    $properties['height'] = DataDefinition::create('integer')
      ->setLabel(t('Height'));
    $properties['username'] = DataDefinition::create('string')
      ->setLabel(t('Username'));
    $properties['widget_id'] = DataDefinition::create('string')
      ->setLabel(t('Widget ID'));

    return $properties;
  }

}

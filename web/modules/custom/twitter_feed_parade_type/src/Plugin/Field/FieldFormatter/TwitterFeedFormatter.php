<?php

namespace Drupal\twitter_feed_parade_type\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Render\Markup;
use Drupal\twitter_feed_parade_type\Plugin\Field\FieldWidget\TwitterFeedWidget;

/**
 * Plugin implementation of the 'twitter_feed' formatter.
 *
 * @FieldFormatter(
 *   id = "twitter_feed",
 *   label = @Translation("Twitter Feed Formatter"),
 *   module = "twitter_feed_parade_type",
 *   field_types = {
 *     "twitter_feed"
 *   }
 * )
 */
class TwitterFeedFormatter extends FormatterBase {

  protected $modulePath;

  /**
   * TwitterFeedFormatter constructor.
   *
   * {@inheritdoc}
   */
  public function __construct($plugin_id, $plugin_definition, FieldDefinitionInterface $field_definition, array $settings, $label, $view_mode, array $third_party_settings) {
    parent::__construct($plugin_id, $plugin_definition, $field_definition, $settings, $label, $view_mode, $third_party_settings);

    $this->modulePath = drupal_get_path('module', 'twitter_feed_parade_type');
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $rendered_feeds = [];
    $raw_feeds = [];
    foreach ($items as $item) {
      $feed = ['#type' => 'inline_template'];
      if (TwitterFeedWidget::FEED_TYPE_USER === (int) $item->type) {
        $feed['#template'] = Markup::create(file_get_contents($this->modulePath . '/templates/twitter-timeline-user-embed.html.twig'));
        $feed['#context'] = [
          'username' => $item->username,
        ];
      }
      else {
        // https://twitter.com/settings/widgets
        $feed['#template'] = Markup::create(file_get_contents($this->modulePath . '/templates/twitter-timeline-search-embed.html.twig'));
        $feed['#context'] = [
          'data_widget_id' => $item->widget_id,
        ];
      }

      $feed['#context']['height'] = isset($item->height) ? $item->height : 600;
      $feed['#context']['width'] = isset($item->width) ? $item->width : 300;

      $feed['#weight'] = 100;

      $rendered_feeds[] = $feed;

      $raw_feeds[] = [
        'type' => $item->type,
        'height' => $item->height,
        'width' => $item->width,
        'username' => $item->username,
        'widget_id' => $item->widget_id,
      ];
    }

    return [
      '#theme' => 'twitter_feed_field',
      '#rendered_feeds' => $rendered_feeds,
      '#feeds' => $raw_feeds,
      '#entity' => $items->getEntity(),
    ];
  }

}

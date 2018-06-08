<?php

namespace Drupal\twitter_feed_parade_type\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Render\Markup;
use Drupal\twitter_feed_parade_type\Plugin\Field\FieldType\TwitterFeed;
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

    $this->modulePath = \drupal_get_path('module', 'twitter_feed_parade_type');
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $renderedFeeds = [];
    $rawFeeds = [];
    $startingWeight = 100;
    $feed = [
      '#type' => 'inline_template',
      '#context' => [],
    ];
    /** @var \Drupal\twitter_feed_parade_type\Plugin\Field\FieldType\TwitterFeed $item */
    foreach ($items as $delta => $item) {
      switch ((int) $item->type) {
        case TwitterFeedWidget::FEED_TYPE_USER:
          $itemFeed = \array_merge($feed, $this->createUserTimeLineFeed($item));
          break;

        case TwitterFeedWidget::FEED_TYPE_GRID:
          $itemFeed = \array_merge($feed, $this->createGridFeed($item));
          break;

        default:
          $itemFeed = \array_merge($feed, $this->createWidgetFeed($item));

      }

      $contextData = [
        'type' => $item->type,
        'height' => $item->height ?? 600,
        'width' => $item->width ?? 300,
        'do_not_track' => (bool) ($item->do_not_track ?? TRUE),
        'link_color' => $item->link_color ?? TwitterFeedWidget::FEED_COLOR_MAPPING[0]['hex'],
        'feed_theme' => $item->theme ?? TwitterFeedWidget::FEED_THEME_MAPPING[0],
      ];
      $itemFeed['#context'] = \array_merge($itemFeed['#context'], $contextData);
      $itemFeed['#weight'] = $startingWeight + (int) $delta;
      $renderedFeeds[] = $itemFeed;
      $rawFeeds[] = $itemFeed['#context'];
    }

    return [
      '#theme' => 'twitter_feed_field',
      '#rendered_feeds' => $renderedFeeds,
      '#feeds' => $rawFeeds,
      '#entity' => $items->getEntity(),
    ];
  }

  /**
   * Get the timeline feed template.
   *
   * @param \Drupal\twitter_feed_parade_type\Plugin\Field\FieldType\TwitterFeed $item
   *   The field item.
   *
   * @return array
   *   The feed render array.
   */
  protected function createUserTimeLineFeed(TwitterFeed $item): array {
    $feed = [];
    $feed['#template'] = Markup::create(\file_get_contents($this->modulePath . '/templates/twitter-publish--embedded-timeline.html.twig'));
    $feed['#context'] = [
      'username' => $item->username,
      'tweet_limit' => $item->tweet_limit,
    ];

    return $feed;
  }

  /**
   * Get the grid feed template.
   *
   * @param \Drupal\twitter_feed_parade_type\Plugin\Field\FieldType\TwitterFeed $item
   *   The field item.
   *
   * @return array
   *   The feed render array.
   */
  protected function createGridFeed(TwitterFeed $item): array {
    $feed = [];
    $feed['#template'] = Markup::create(\file_get_contents($this->modulePath . '/templates/twitter-publish--embedded-grid.html.twig'));
    $feed['#context'] = [
      'username' => $item->username,
      'collection_id' => $item->collection_id,
      'data_limit' => $item->data_limit,
    ];

    return $feed;
  }

  /**
   * Get the widget feed template.
   *
   * @param \Drupal\twitter_feed_parade_type\Plugin\Field\FieldType\TwitterFeed $item
   *   The field item.
   *
   * @return array
   *   The feed render array.
   *
   * @deprecated
   */
  protected function createWidgetFeed(TwitterFeed $item): array {
    $feed = [];
    // https://twitter.com/settings/widgets
    $feed['#template'] = Markup::create(\file_get_contents($this->modulePath . '/templates/twitter-timeline-search-embed.html.twig'));
    $feed['#context'] = [
      'widget_id' => $item->widget_id,
    ];
    return $feed;
  }

}

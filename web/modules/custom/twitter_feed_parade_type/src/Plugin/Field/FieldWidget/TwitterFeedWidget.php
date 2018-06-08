<?php

namespace Drupal\twitter_feed_parade_type\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Link;
use Drupal\Core\Url;

/**
 * Plugin implementation of the 'twitter_feed' widget.
 *
 * @FieldWidget(
 *   id = "twitter_feed",
 *   label = @Translation("Twitter Feed Widget"),
 *   module = "twitter_feed_parade_type",
 *   field_types = {
 *     "twitter_feed"
 *   }
 * )
 */
class TwitterFeedWidget extends WidgetBase {

  const FEED_TYPE_USER = 0;

  /**
   * Widget constant.
   *
   * @deprecated
   */
  const FEED_TYPE_WIDGET = 1;
  const FEED_TYPE_GRID = 2;

  const FEED_THEME_MAPPING = [
    0 => 'light',
    1 => 'dark',
  ];

  const FEED_COLOR_MAPPING = [
    0 => ['name' => 'blue', 'hex' => '#2B7BB9'],
    1 => ['name' => 'purple', 'hex' => '#981CEB'],
    2 => ['name' => 'green', 'hex' => '#19CF86'],
    3 => ['name' => 'yellow', 'hex' => '#FAB81E'],
    4 => ['name' => 'orange', 'hex' => '#E95F28'],
    5 => ['name' => 'red', 'hex' => '#E81C4F'],
  ];

  /**
   * {@inheritdoc}
   *
   * @throws \InvalidArgumentException
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $item = $items[$delta];

    $element['type'] = [
      '#type' => 'radios',
      '#title' => $this->t('Type'),
      '#description' => $this->t('The type of the feed'),
      '#default_value' => $item->type,
      '#options' => [
        static::FEED_TYPE_USER => $this->t('User timeline'),
        // static::FEED_TYPE_WIDGET => $this->t('Widget'),.
        static::FEED_TYPE_GRID => $this->t('Grid'),
      ],
      '#maxlength' => 64,
      '#required' => TRUE,
    ];
    $element['width'] = [
      '#type' => 'number',
      '#title' => $this->t('Width'),
      '#description' => $this->t('The width of the feed'),
      '#default_value' => $item->width,
      '#maxlength' => 64,
      '#min' => 100,
      '#required' => TRUE,
    ];
    $element['height'] = [
      '#type' => 'number',
      '#title' => $this->t('Height'),
      '#description' => $this->t('The height of the feed'),
      '#default_value' => $item->height,
      '#maxlength' => 64,
      '#min' => 100,
      '#required' => TRUE,
    ];
    $element['username'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Username'),
      '#description' => $this->t('The twitter username'),
      '#default_value' => $item->username,
      '#maxlength' => 255,
    ];
    $element['do_not_track'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Opt-out from advertisement tailoring'),
      '#default_value' => $item->do_not_track ?? 1,
    ];

    $element['collection_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Collection ID'),
      '#description' => $this->t('The numerical ID of a collection. E.g @example from @example_link.', [
        '@example_link' => Link::fromTextAndUrl('https://twitter.com/TwitterDev/timelines/539487832448843776', Url::fromUri('https://twitter.com/TwitterDev/timelines/539487832448843776', [
          'attributes' => ['target' => '_blank', 'rel' => 'noopener'],
        ]))->toString(),
        '@example' => '539487832448843776',
      ]),
      '#default_value' => $item->collection_id,
      '#maxlength' => 24,
    ];

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public static function afterBuild(array $element, FormStateInterface $form_state) {
    // Hide+optional/Show+required the username and widget_id fields
    // based on the type field value.
    $usernameOn = [':input[name="' . $element[0]['type']['#name'] . '"]' => ['value' => static::FEED_TYPE_USER]];
    $gridOn = [':input[name="' . $element[0]['type']['#name'] . '"]' => ['value' => static::FEED_TYPE_GRID]];
    $element[0]['username']['#states'] = [
      'visible' => $usernameOn,
      'required' => $usernameOn,
    ];

    $element[0]['collection_id']['#states'] = [
      'visible' => $gridOn,
      'required' => $gridOn,
      'invisible' => $usernameOn,
      'optional' => $usernameOn,
    ];

    return parent::afterBuild($element, $form_state);
  }

}

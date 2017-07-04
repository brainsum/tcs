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
  const FEED_TYPE_WIDGET = 1;

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state): array {
    $item = $items[$delta];

    $element['type'] = [
      '#type' => 'radios',
      '#title' => $this->t('Type'),
      '#description' => $this->t('The type of the feed'),
      '#default_value' => $item->type,
      '#options' => [
        static::FEED_TYPE_USER => $this->t('User timeline'),
        static::FEED_TYPE_WIDGET => $this->t('Widget'),
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
    $element['widget_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Widget ID'),
      '#description' => $this->t('The ID of a widget created at the @url', [
        '@url' => Link::fromTextAndUrl('twitter widget settings', Url::fromUri('https://twitter.com/settings/widgets'))->toString(),
      ]),
      '#default_value' => $item->widget_id,
      '#maxlength' => 255,
    ];
    return $element;
  }

}

<?php

namespace Drupal\campaign_pages\Handler;

use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\Core\Menu\MenuLinkTreeInterface;
use Drupal\Core\Menu\MenuTreeParameters;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class ToolbarHandler.
 *
 * @package Drupal\campaign_pages\Handler
 */
class ToolbarHandler implements ContainerInjectionInterface {

  use StringTranslationTrait;

  /**
   * The menu link tree service.
   *
   * @var \Drupal\Core\Menu\MenuLinkTreeInterface
   */
  protected $menuLinkTree;

  /**
   * The current user.
   *
   * @var \Drupal\Core\Session\AccountProxyInterface
   */
  protected $account;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('toolbar.menu_tree'),
      $container->get('current_user')
    );
  }

  /**
   * ToolbarHandler constructor.
   *
   * @param \Drupal\Core\Menu\MenuLinkTreeInterface $menuLinkTree
   *   The menu link tree service.
   * @param \Drupal\Core\Session\AccountProxyInterface $account
   *   The current user.
   */
  public function __construct(
    MenuLinkTreeInterface $menuLinkTree,
    AccountProxyInterface $account
  ) {
    $this->menuLinkTree = $menuLinkTree;
    $this->account = $account;
  }

  /**
   * Hook bridge.
   *
   * @return array
   *   The module toolbar items render array.
   *
   * @see hook_toolbar()
   *
   * @throws \InvalidArgumentException
   */
  public function toolbar() {
    // Don't display anything in the toolbar if there are no plugins,
    // or there are, but none are selected.
    // The user also must have proper access permissions.
    if (!$this->access()) {
      return [];
    }

    $items['campaign_pages'] = [
      '#type' => 'toolbar_item',
      '#weight' => 0,
      'tab' => [
        '#type' => 'link',
        '#title' => $this->t('Changelog'),
        '#url' => Url::fromUri('https://drive.google.com/drive/folders/0B3lAo1rFzM2VV0N6ZGp5S1prZ3M', [
          'attributes' => [
            'target' => '_blank',
            'rel' => 'noopener',
          ],
        ]),
        '#attributes' => [
          'title' => $this->t('Changelog'),
          'class' => [
            'toolbar-icon',
            'toolbar-icon-campaign-pages-changelog',
          ],
        ],
      ],
      '#wrapper_attributes' => [
        'class' => [
          'campaign-pages-changelog-toolbar-tab',
        ],
      ],
      '#cache' => [
        'contexts' => ['user.permissions'],
      ],
    ];

    return $items;
  }

  /**
   * Lazy builder callback for the menu toolbar.
   *
   * @return array
   *   The renderable array representation of the devel menu.
   */
  public function lazyBuilder() {
    $parameters = new MenuTreeParameters();
    $parameters->onlyEnabledLinks()->setTopLevelOnly();

    $tree = $this->menuLinkTree->load('campaign_pages', $parameters);

    $manipulators = [
      ['callable' => 'menu.default_tree_manipulators:checkAccess'],
      ['callable' => 'menu.default_tree_manipulators:generateIndexAndSort'],
    ];
    $tree = $this->menuLinkTree->transform($tree, $manipulators);

    $build = $this->menuLinkTree->build($tree);

    CacheableMetadata::createFromRenderArray($build)->applyTo($build);

    return $build;
  }

  /**
   * Access check for the handler.
   *
   * @return bool
   *   TRUE, if the user can access it, FALSE otherwise.
   */
  protected function access() {
    return $this->account->hasPermission('access campaigns changelog');
  }

}

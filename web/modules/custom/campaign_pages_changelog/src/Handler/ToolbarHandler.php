<?php

namespace Drupal\campaign_pages_changelog\Handler;

use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\Core\Menu\MenuLinkTreeInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class ToolbarHandler.
 *
 * @package Drupal\campaign_pages_changelog\Handler
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

    $items['campaign_pages_changelog'] = [
      '#type' => 'toolbar_item',
      '#weight' => 0,
      'tab' => [
        '#type' => 'link',
        '#title' => $this->t("What's new?"),
        '#url' => Url::fromRoute('campaign_pages_changelog.changelog'),
        '#attributes' => [
          'title' => $this->t('Changes on the Tieto Campaign Sites'),
          'class' => [
            'toolbar-icon',
            'toolbar-icon-campaign-pages-changelog',
          ],
          'rel' => 'noopener',
          'target' => '_blank',
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
      '#attached' => [
        'library' => [
          'campaign_pages_changelog/toolbar',
        ],
      ],
    ];

    return $items;
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

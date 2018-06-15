<?php

namespace Drupal\campaign_pages\Plugin\Block;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Url;

/**
 * Class CampaignPagesPrivacyPolicyBlock.
 *
 * Provides a block with the Privacy Policy link.
 *
 * @Block(
 *   id="campaign_pages_privacy_policy_block",
 *   admin_label=@Translation("Campaign Pages Privacy Policy"),
 *   category=@Translation("Campaign Pages")
 * )
 *
 * @package Drupal\campaign_pages\Plugin\Block
 */
class CampaignPagesPrivacyPolicyBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [
      'privacy_policy' => [
        '#type' => 'link',
        '#url' => Url::fromUri('https://corners.intra.tieto.com/Inside-Tieto/Tieto-Basics/privacy/privacy-governance'),
        '#title' => t('Privacy Policy'),
      ],
    ];

    return $build;
  }

  /**
   * {@inheritdoc}
   */
  protected function blockAccess(AccountInterface $account) {
    // Protect block access from anonymous users.
    if (!$account->isAnonymous()) {
      return AccessResult::allowed();
    }
    return AccessResult::forbidden();
  }

}

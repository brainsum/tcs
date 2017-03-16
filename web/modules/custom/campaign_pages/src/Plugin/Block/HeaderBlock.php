<?php

namespace Drupal\campaign_pages\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a Header Block.
 *
 * @Block(
 *   id = "header_block",
 *   admin_label = @Translation("Header block"),
 * )
 */
class HeaderBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return array(
      '#markup' => $this->t('Insert snippet here!'),
    );
  }

}
<?php

namespace Drupal\campaign_pages\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a Burger Block.
 *
 * @Block(
 *   id = "burger_block",
 *   admin_label = @Translation("Burger block"),
 * )
 */
class BurgerBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return array(
      '#markup' => $this->t('Insert snippet here!'),
    );
  }

}
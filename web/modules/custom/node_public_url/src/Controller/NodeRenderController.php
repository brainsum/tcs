<?php

namespace Drupal\node_public_url\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\node\NodeInterface;

/**
 * Class NodeRenderController.
 *
 * @package Drupal\node_public_url\Controller
 */
class NodeRenderController extends ControllerBase {

  /**
   * Render a node.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The node.
   * @param string $langcode
   *   The language code.
   *
   * @return array
   *   Node render array.
   *
   * @throws \InvalidArgumentException
   */
  public function render(NodeInterface $node, $langcode) {
    // @todo: Maybe check the route and the node ID, and check
    // if they are the same.
    $viewBuilder = $this->entityTypeManager()->getViewBuilder($node->getEntityTypeId());
    return $viewBuilder->view($node, 'full', $langcode);
  }

}

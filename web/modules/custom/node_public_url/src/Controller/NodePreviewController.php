<?php

namespace Drupal\node_public_url\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\node\NodeInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class NodePreviewController.
 *
 * @package Drupal\node_public_url\Controller
 */
class NodePreviewController extends ControllerBase {

  /**
   * Render a node according to the hash.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The node.
   * @param string $hash
   *   A hash that was generated by the module.
   *
   * @return array
   *   The render array of the node.
   *
   * @throws \InvalidArgumentException
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
   * @throws \Exception
   */
  public function createPreview(NodeInterface $node, $hash) {
    /** @var \Drupal\node_public_url\Storage\PathStorageInterface $pathStorage */
    $pathStorage = \Drupal::service('node_public_url.path_storage');
    $path = $pathStorage->load(['hash' => $hash]);

    if (FALSE === $path) {
      throw new NotFoundHttpException();
    }

    $langcode = $path['langcode'];
    $node->addCacheContexts(['languages:language_content']);

    $viewBuilder = $this->entityTypeManager()->getViewBuilder($node->getEntityTypeId());

    return $viewBuilder->view($node, 'full', $langcode);
  }

}

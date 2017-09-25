<?php

namespace Drupal\node_public_url\EventSubscriber;

use Drupal\Core\Routing\RouteSubscriberBase;
use Drupal\node_public_url\Storage\PathStorageInterface;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

/**
 * Class RouteSubscriber.
 *
 * @package Drupal\node_public_url\EventSubscriber
 */
class RouteSubscriber extends RouteSubscriberBase {

  /**
   * The path storage.
   *
   * @var \Drupal\node_public_url\Storage\PathStorageInterface
   */
  protected $pathStorage;

  /**
   * RouteSubscriber constructor.
   *
   * @param \Drupal\node_public_url\Storage\PathStorageInterface $pathStorage
   *   The path storage.
   */
  public function __construct(PathStorageInterface $pathStorage) {
    $this->pathStorage = $pathStorage;
  }

  /**
   * Returns a set of route objects.
   *
   * @return \Symfony\Component\Routing\RouteCollection
   *   A route collection.
   *
   * @throws \Exception
   */
  public function routes(): RouteCollection {
    $publicUrls = $this->pathStorage->loadMultiple();
    $collection = new RouteCollection();
    foreach ($publicUrls as $url) {
      $route = new Route($url->path);
      $route->addDefaults([
        '_controller' => '\Drupal\node_public_url\Controller\NodeRenderController::render',
        'node' => $url->nid,
      ]);
      $route->addRequirements([
        '_access' => 'TRUE',
      ]);
      $route->addOptions([
        'parameters' => [
          'node' => [
            'type' => 'entity:node',
          ],
        ],
      ]);

      $collection->add('node_public_url.' . $url->nid . '.' . $url->langcode, $route);
    }

    return $collection;
  }

  /**
   * {@inheritdoc}
   *
   * Not needed.
   */
  protected function alterRoutes(RouteCollection $collection) {}

}

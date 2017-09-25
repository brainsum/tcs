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

  const ROUTE_PREFIX = 'node_public_url.preview_link.';

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
   * {@inheritdoc}
   *
   * @throws \Exception
   */
  protected function alterRoutes(RouteCollection $collection) {
    $this->clearCollection($collection);

    $publicUrls = $this->pathStorage->loadMultiple();

    foreach ($publicUrls as $url) {
      $route = new Route($url->path);
      $route->addDefaults([
        '_controller' => '\Drupal\node_public_url\Controller\NodeRenderController::render',
        'node' => $url->nid,
        'langcode' => $url->langcode,
      ]);
      $route->addRequirements([
        '_access' => 'TRUE',
      ]);
      $route->addOptions([
        'parameters' => [
          'node' => [
            'type' => 'entity:node',
          ],
          'langcode' => [
            'type' => 'string',
          ],
        ],
      ]);

      $collection->add(static::ROUTE_PREFIX . $url->nid . '.' . $url->langcode, $route);
    }
  }

  /**
   * Remove every dynamic route added by our module.
   *
   * @param \Symfony\Component\Routing\RouteCollection $collection
   *   The route collection.
   */
  protected function clearCollection(RouteCollection $collection) {
    foreach (array_keys($collection->all()) as $name) {
      if (strpos($name, static::ROUTE_PREFIX) !== FALSE) {
        $collection->remove($name);
      }
    }
  }

}

<?php

namespace Drupal\campaign_pages\Service;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Image\ImageFactory;
use Drupal\node\NodeInterface;

/**
 * Class NodeLogoResolver.
 *
 * @see campaign_pages.services.yml / campaign_pages.node_logo_resolver
 *
 * @package Drupal\campaign_pages\Service
 */
class NodeLogoResolver {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The image factory.
   *
   * @var \Drupal\Core\Image\ImageFactory
   */
  protected $imageFactory;

  /**
   * NodeLogoResolver constructor.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   *   The entity type manager.
   * @param \Drupal\Core\Image\ImageFactory $imageFactory
   *   The entity type manager.
   */
  public function __construct(
    EntityTypeManagerInterface $entityTypeManager,
    ImageFactory $imageFactory
  ) {
    $this->entityTypeManager = $entityTypeManager;
    $this->imageFactory = $imageFactory;
  }

  /**
   * Extracts the field_logo data from the node, or returns default data.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The node.
   *
   * @return array
   *   The array with the logo data.
   *
   * @see web/themes/tieto_admin/templates/inc/logo.html.twig
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   */
  public function resolve(NodeInterface $node) {
    if (
      $node->hasField('field_logo')
      && $logo = $node->get('field_logo')->getValue()
    ) {
      $logo = $logo[0];

      /** @var \Drupal\file\FileInterface $file */
      $file = $this->entityTypeManager->getStorage('file')
        ->load($logo['target_id']);

      $image = $this->imageFactory->get($file->getFileUri());
      $imageUri = $image->getSource();

      /** @var \Drupal\image\ImageStyleInterface $style */
      $style = $this->entityTypeManager->getStorage('image_style')
        ->load('site_logo');
      $styleUri = $style->buildUri($imageUri);

      // Generate the styled image if it doesn't exist.
      if (!file_exists($styleUri)) {
        $style->createDerivative($imageUri, $styleUri);
      }

      return [
        'logo_path' => $style->buildUrl($imageUri),
        'alt' => isset($logo['alt']) ? $logo['alt'] : t('Tieto'),
        'href' => '//www.tieto.com',
        'dimensions' => [
          'width' => 98,
          'height' => 65,
        ],
      ];
    }

    // The default logo.
    return $this->defaultLogo();
  }

  /**
   * The default logo.
   *
   * @return array
   *   The array with the default logo data.
   */
  protected function defaultLogo() {
    return [
      'logo_path' => '/' . drupal_get_path('theme', 'tieto_admin') . '/images/tietologo.svg?v2',
      'alt' => t('Tieto'),
      'href' => '//www.tieto.com',
      'dimensions' => [
        'width' => 98,
        'height' => 65,
      ],
    ];
  }

}

<?php

namespace Drupal\parade_domain;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\domain_path\Entity\DomainPath;

/**
 * Class ParadeDomainSiteSettings.
 */
class ParadeDomainHelper implements ParadeDomainHelperInterface {

  /**
   * Contains the configuration object factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Constructs a ParadeDomainSiteSettings object.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The config factory.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   */
  public function __construct(ConfigFactoryInterface $config_factory, EntityTypeManagerInterface $entity_type_manager) {
    $this->configFactory = $config_factory;
    $this->entityTypeManager = $entity_type_manager;
  }

  /**
   * {@inheritdoc}
   */
  public function updateDomainSiteFrontpage(DomainPath $domain_path, int $nid) {
    $original = $domain_path->original;

    if (!($domain_path->getAlias() === '/' || $original->getAlias() === '/')) {
      return;
    }

    $config = $this->configFactory->getEditable('domain_site_settings.domainconfigsettings');
    $domainId = $domain_path->getDomainId();
    $defaultSiteData = $this->getDefaultSiteData();

    $data = $config->get($domainId) ?? $defaultSiteData;
    // Front page should be set to the node.
    if ($domain_path->getAlias() === '/') {
      $data['site_frontpage'] = '/node/' . $nid;
    }
    // Front page should be removed - the default will be added.
    elseif ($original && $original->getAlias() === '/') {
      $data['site_frontpage'] = $defaultSiteData['site_frontpage'];
    }

    $config->set($domainId, $data);
    $config->save(TRUE);
  }

  /**
   * {@inheritdoc}
   */
  public function removeDomainSiteFrontpage(DomainPath $domain_path) {
    if ($domain_path->getAlias() !== '/') {
      return;
    }

    $config = $this->configFactory->getEditable('domain_site_settings.domainconfigsettings');
    $domainId = $domain_path->getDomainId();
    $defaultSiteData = $this->getDefaultSiteData();

    $data = $config->get($domainId) ?? $defaultSiteData;
    $data['site_frontpage'] = $defaultSiteData['site_frontpage'];
    $config->set($domainId, $data);
    $config->save(TRUE);
  }

  /**
   * @return array|mixed|null
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  private function getDefaultSiteData() {
    $config = $this->configFactory->getEditable('domain_site_settings.domainconfigsettings');
    $defaultDomainId = $this->entityTypeManager->getStorage('domain')->loadDefaultId();
    $defaultSiteData = $config->get($defaultDomainId);

    if (!$defaultSiteData) {
      $siteConfig = $this->configFactory->get('system.site');
      $siteConfigPage = $siteConfig->get('page');
      $defaultSiteData = [
        'site_name' => $siteConfig->get('name'),
        'site_slogan' => $siteConfig->get('slogan'),
        'site_mail' => $siteConfig->get('mail'),
        'site_frontpage' => $siteConfigPage['front'],
        'site_403' => $siteConfigPage['403'],
        'site_404' => $siteConfigPage['404'],
      ];
      $config->set($defaultDomainId, $defaultSiteData);
      $config->save(TRUE);
    }

    return $defaultSiteData;
  }

}

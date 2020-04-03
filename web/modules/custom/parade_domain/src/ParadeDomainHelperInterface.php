<?php

namespace Drupal\parade_domain;

use Drupal\domain_path\Entity\DomainPath;

/**
 * Interface DiginomicaGeneralInterface.
 */
interface ParadeDomainHelperInterface {

  /**
   * Set front page to '/node/nid' for domain is '/' domain alias was added.
   *
   * @param \Drupal\domain_path\Entity\DomainPath $domain_path
   *   The domain_path entity.
   * @param int $nid
   *   The node id.
   */
  public function updateDomainSiteFrontpage(DomainPath $domain_path, int $nid);

  /**
   * Remove domain specific front page if '/' domain alias was deleted.
   *
   * @param \Drupal\domain_path\Entity\DomainPath $domain_path
   *   The domain_path entity.
   */
  public function removeDomainSiteFrontpage(DomainPath $domain_path);

}

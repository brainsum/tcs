<?php

namespace Drupal\campaign_pages_changelog\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Routing\TrustedRedirectResponse;

/**
 * Class ChangelogController.
 *
 * @package Drupal\campaign_pages_changelog\Controller
 */
class ChangelogController extends ControllerBase {

  /**
   * Changelog handler.
   *
   * @return \Drupal\Core\Routing\TrustedRedirectResponse
   *   Redirect to the changelog google drives.
   *
   * @throws \InvalidArgumentException
   */
  public function changelog() {
    return new TrustedRedirectResponse('https://drive.google.com/drive/folders/0B3lAo1rFzM2VV0N6ZGp5S1prZ3M');
  }

}

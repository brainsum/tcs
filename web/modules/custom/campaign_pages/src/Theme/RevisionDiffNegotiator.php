<?php

namespace Drupal\campaign_pages\Theme;

use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Theme\ThemeNegotiatorInterface;

/**
 * Class RevisionDiffNegotiator.
 *
 * See: https://brainsum.atlassian.net/browse/TCS-176
 *
 * @package Drupal\campaign_pages\Theme
 */
class RevisionDiffNegotiator implements ThemeNegotiatorInterface {

  /**
   * {@inheritdoc}
   */
  public function applies(RouteMatchInterface $routeMatch) {
    return 'diff.revisions_diff' === $routeMatch->getRouteName();
  }

  /**
   * {@inheritdoc}
   */
  public function determineActiveTheme(RouteMatchInterface $routeMatch) {
    return 'tieto_admin';
  }

}

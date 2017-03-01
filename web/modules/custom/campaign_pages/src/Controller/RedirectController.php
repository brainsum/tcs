<?php

namespace Drupal\campaign_pages\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Routing\TrustedRedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Controller for redirect to tieto.com.
 */
class RedirectController extends ControllerBase {

  /**
   * Redirect to tieto.com if it is non local or dev site (brainsum domain).
   *
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The request.
   *
   * @throws \InvalidArgumentException
   *
   * @return array|\Drupal\Core\Routing\TrustedRedirectResponse
   *   Redirection to tieto.com or a simple markup depending on the environment.
   */
  public function redirectToTietoCom(Request $request) {
    global $base_url;

    if ('127.0.0.1' === $request->getClientIp()
      || strpos($base_url, 'brainsum') !== FALSE
      || strpos($base_url, 'localhost') !== FALSE
    ) {
      return ['#markup' => 'This seems to be a development environment. Redirecting to tieto.com has been disabled.'];
    }

    return new TrustedRedirectResponse('https://www.tieto.com');
  }

}

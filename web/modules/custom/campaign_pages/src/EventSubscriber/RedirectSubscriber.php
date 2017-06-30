<?php

namespace Drupal\campaign_pages\EventSubscriber;

use Drupal\Core\Url;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Subscribe to KernelEvents::REQUEST events and redirect.
 */
class RedirectSubscriber implements EventSubscriberInterface {

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events[KernelEvents::REQUEST][] = array('checkForRedirection');
    return $events;
  }

  /**
   * This is called whenever the KernelEvents::REQUEST event is dispatched.
   *
   * @param GetResponseEvent $event
   *   The event.
   */
  public function checkForRedirection(GetResponseEvent $event) {
    // Users would get redirected to the front page after registration.
    // We redirect from the front page to tieto.com.
    // Since we don't really want to confuse users, let's redirect to login.
    if (
      $event->getRequest()->getRequestUri() === '/'
      && strpos($event->getRequest()->server->get('HTTP_REFERER'), 'user/register') !== FALSE
    ) {
      $url = Url::fromRoute('user.login')->toString();
      $response = new RedirectResponse($url);
      $event->setResponse($response);
    }
  }

}

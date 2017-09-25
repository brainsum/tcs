<?php

namespace Drupal\node_public_url\Form;

use Drupal\Component\Render\FormattableMarkup;
use Drupal\Component\Utility\Random;
use Drupal\Core\Access\AccessResultAllowed;
use Drupal\Core\Access\AccessResultForbidden;
use Drupal\Core\Access\AccessResultInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Language\LanguageInterface;
use Drupal\Core\Routing\RouteBuilderInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Url;
use Drupal\node_public_url\Storage\PathStorageInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class PreviewLinksForm.
 *
 * @package Drupal\node_public_url\Form
 */
class PreviewLinksForm extends FormBase {

  /**
   * The path storage.
   *
   * @var \Drupal\node_public_url\Storage\PathStorageInterface
   */
  protected $pathStorage;

  /**
   * The route builder.
   *
   * @var \Drupal\Core\Routing\RouteBuilderInterface
   */
  protected $routeBuilder;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('node_public_url.path_storage'),
      $container->get('router.builder')
    );
  }

  /**
   * PreviewLinksForm constructor.
   *
   * @param \Drupal\node_public_url\Storage\PathStorageInterface $pathStorage
   *   The path storage.
   * @param \Drupal\Core\Routing\RouteBuilderInterface $routeBuilder
   *   The route builder.
   */
  public function __construct(
    PathStorageInterface $pathStorage,
    RouteBuilderInterface $routeBuilder
  ) {
    $this->pathStorage = $pathStorage;
    $this->routeBuilder = $routeBuilder;
  }

  /**
   * Returns a unique string identifying the form.
   *
   * @return string
   *   The unique string identifying the form.
   */
  public function getFormId() {
    return 'node_public_url_preview_links_form';
  }

  /**
   * Form constructor.
   *
   * @param array $form
   *   An associative array containing the structure of the form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   *
   * @return array
   *   The form structure.
   *
   * @throws \InvalidArgumentException
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    if (!$this->getRequest()->attributes->has('node') || NULL === $this->getRequest()->attributes->get('node')) {
      throw new \InvalidArgumentException($this->t('This does not seem to be a node route.'));
    }

    /** @var \Drupal\node\NodeInterface $node */
    $node = $this->getRequest()->attributes->get('node');
    $paths = $this->pathStorage->loadForNode($node->id());
    // Add the original language separately.
    $defaultLanguage = $node->getTranslation(LanguageInterface::LANGCODE_DEFAULT)->language();
    $form['paths'][$defaultLanguage->getId()] = $this->createLanguageElement($defaultLanguage, $paths, TRUE);

    // Go through the other translations, and create the form element for them.
    $translations = $node->getTranslationLanguages(FALSE);
    foreach ($translations as $language) {
      $form['paths'][$language->getId()] = $this->createLanguageElement($language, $paths);
    }

    $form['nid'] = [
      '#type' => 'value',
      '#value' => $node->id(),
    ];

    $form['generate'] = [
      '#type' => 'submit',
      '#name' => 'generate_button',
      '#value' => $this->t('Generate'),
    ];
    $form['remove'] = [
      '#type' => 'submit',
      '#name' => 'remove_button',
      '#value' => $this->t('Remove'),
    ];

    $form['#tree'] = TRUE;

    return $form;
  }

  /**
   * Create an element for a language.
   *
   * @param \Drupal\Core\Language\LanguageInterface $language
   *   The language object.
   * @param array $existingPaths
   *   The existing paths for the node.
   * @param bool $originalLanguage
   *   TRUE, if it's the original node language, FALSE otherwise.
   *
   * @return array
   *   The render array for the form element.
   *
   * @throws \InvalidArgumentException
   */
  protected function createLanguageElement(LanguageInterface $language, array $existingPaths, $originalLanguage = FALSE) {
    $langId = $language->getId();
    $element = [];

    $checkboxTitle = $language->getName();

    if (TRUE === $originalLanguage) {
      $checkboxTitle = new FormattableMarkup('<strong>@lang (Original language)</strong>', [
        '@lang' => $language->getName(),
      ]);
    }

    $element['checkbox'] = [
      '#type' => 'checkbox',
      '#title' => $checkboxTitle,
    ];

    if (isset($existingPaths[$langId])) {
      $path = $existingPaths[$langId];

      $url = Url::fromUserInput($path->path, ['absolute' => TRUE]);
      $element['url'] = [
        '#type' => 'url',
        '#title' => $this->t('URL'),
        '#disabled' => TRUE,
        '#default_value' => $url->toString(TRUE)->getGeneratedUrl(),
        '#size' => 70,
      ];

      // @todo: Maybe add this https://www.drupal.org/project/clipboardjs
    }

    return $element;
  }

  /**
   * Form submission handler.
   *
   * Depending on the triggering element, it saves or removes the public paths.
   *
   * @param array $form
   *   An associative array containing the structure of the form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   *
   * @throws \Exception
   * @throws \InvalidArgumentException
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $triggerName = $form_state->getTriggeringElement()['#name'];

    $values = $form_state->getValues();
    if (isset($values['paths'])) {
      /** @var array $paths */
      $paths = $values['paths'];
      foreach ($paths as $langCode => $path) {
        // Act only if the checkbox is checked.
        if (1 === $path['checkbox']) {
          // If the 'Generate' button was pressed, and there's no existing url..
          if ('generate_button' === $triggerName && !isset($path['url'])) {
            $rand = new Random();
            // @todo: It should be unique,
            // but we should make sure it doesn't exists in the table.
            $publicPath = '/' . $rand->name(69, TRUE);

            $this->pathStorage->save(
              (int) $values['nid'],
              $publicPath,
              $langCode
            );
          }
          // If the 'Remove' button was pressed, and there's an existing url..
          elseif ('remove_button' === $triggerName && isset($path['url'])) {
            $this->pathStorage->delete([
              'nid' => (int) $values['nid'],
              'langcode' => $langCode,
            ]);
          }
        }
      }
    }

    $this->routeBuilder->rebuild();
  }

  /**
   * Access check for the form.
   *
   * @param \Drupal\Core\Session\AccountInterface $account
   *   The account.
   *
   * @return \Drupal\Core\Access\AccessResultInterface
   *   The access result.
   */
  public function access(AccountInterface $account): AccessResultInterface {
    $access = new AccessResultForbidden();

    if ($account->hasPermission('access preview links form')) {
      $access = new AccessResultAllowed();
    }

    return $access;
  }

}

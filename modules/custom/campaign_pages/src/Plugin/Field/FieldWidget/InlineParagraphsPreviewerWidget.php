<?php

/**
 * @file
 * Paragraphs Previewer widget implementation for paragraphs.
 */

namespace Drupal\campaign_pages\Plugin\Field\FieldWidget;

use Drupal\paragraphs\Plugin\Field\FieldWidget\InlineParagraphsWidget;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\OpenModalDialogCommand;
use Drupal\Core\Ajax\AlertCommand;
use Drupal\Component\Utility\NestedArray;
use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Drupal\Core\Form\FormState;
use Drupal\Core\Field\WidgetBase;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\Entity\EntityViewDisplay;
use Drupal\Core\Field\Plugin\Field\FieldFormatter\EntityReferenceFormatterBase;

/**
 * Plugin implementation of the 'Paragraphs with preview' widget.
 *
 * We hide add / remove buttons when translating to avoid accidental loss of
 * data because these actions effect all languages.
 *
 * @FieldWidget(
 *   id = "entity_reference_paragraphs_preview",
 *   label = @Translation("Paragraphs with preview"),
 *   description = @Translation("An inline Paragraphs form widget with the ability to preview."),
 *   field_types = {
 *     "entity_reference_revisions"
 *   }
 * )
 */
class InlineParagraphsPreviewerWidget extends InlineParagraphsWidget {

  /**
   * Determine if the previewer is enabled for the given paragraphs edit mode.
   *
   * @param string $mode
   *   The paragraphs edit mode.
   *
   * @return bool
   *   TRUE if the previewer is enabled.
   */
  public function isPreviewerEnabled($mode) {
    return $mode != 'removed' && $mode != 'remove';
  }

  /**
   * {@inheritdoc}
   *
   * @see \Drupal\content_translation\Controller\ContentTranslationController::prepareTranslation()
   *   Uses a similar approach to populate a new translation.
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $element = parent::formElement($items, $delta, $element, $form, $form_state);
    $field_name = $this->fieldDefinition->getName();
    $parents = $element['#field_parents'];

    $widget_state = static::getWidgetState($parents, $field_name, $form_state);
    if (!isset($widget_state['paragraphs'][$delta]['mode']) ||
        !isset($widget_state['paragraphs'][$delta]['entity'])) {
      return $element;
    }

    $item_mode = $widget_state['paragraphs'][$delta]['mode'];
    if (!$this->isPreviewerEnabled($item_mode)) {
      return $element;
    }

    $paragraphs_entity = $widget_state['paragraphs'][$delta]['entity'];
    $element_parents = array_merge($parents, [$field_name, $delta]);
    $id_prefix = implode('-', $element_parents);

    $preview_button = [
      '#type' => 'submit',
      '#value' => t('Preview'),
      '#name' => strtr($id_prefix, '-', '_') . '_previewer',
      '#weight' => 99999,
      '#submit' => [[$this, 'submitPreviewerItem']],
      '#field_item_parents' => $element_parents,
      '#limit_validation_errors' => [
        array_merge($parents, [$field_name, 'add_more']),
      ],
      '#delta' => $delta,
      '#ajax' => [
        'callback' => [get_class($this), 'ajaxSubmitPreviewerItem'],
        'wrapper' => $widget_state['ajax_wrapper_id'],
        'effect' => 'fade',
      ],
      '#access' => $paragraphs_entity->access('view'),
      '#prefix' => '<li class="preview">',
      '#suffix' => '</li>',
      '#attached' => [
        'library' => ['campaign_pages/dialog'],
      ],
      '#attributes' => [
        'class' => ['button'],
      ],
    ];

    // Set the dialog title.
    if (isset($element['top']['paragraph_type_title']['info']['#markup'])) {
      $preview_button['#dialog_title'] = t('Preview of @type', [
        '@type' => strip_tags($element['top']['paragraph_type_title']['info']['#markup']),
      ]);
    }

    $element['top']['links']['preview_button'] = $preview_button;
    return $element;
  }

  /**
   * Previewer button submit callback.
   *
   * @param array $form
   *   The form array.
   * @param FormStateInterface $form_state
   *   The form state.
   */
  public function submitPreviewerItem(array $form, FormStateInterface $form_state) {
    if (!$form_state->isCached()) {
      $form_state->setRebuild();
    }
  }

  /**
   * Previewer button AJAX callback.
   *
   * @param array $form
   *   The form array.
   * @param FormStateInterface $form_state
   *   The form state.
   */
  public function ajaxSubmitPreviewerItem(array $form, FormStateInterface $form_state) {
    $paragraph = NULL;
    $preview_button = $form_state->getTriggeringElement();

    $dialog_options = array(
      'dialogClass' => 'dialog-preview-paragraph',
      'minWidth' => 480,
      'width' => '80%',
      // 'minHeight' => 320,
      // 'height' => 400,
      'autoOpen' => TRUE,
      'modal' => TRUE,
      'draggable' => TRUE,
      'autoResize' => FALSE,
      'resizable' => TRUE,
      'closeOnEscape' => TRUE,
      'closeText' => t('Close preview'),
    );

    // Get dialog title.
    if (isset($preview_button['#dialog_title'])) {
      $dialog_title = $preview_button['#dialog_title'];
    }
    else {
      $dialog_title = t('Preview');
    }

    // Build previewer callback url.
    // if (!empty($preview_button['#field_item_parents']) && !empty($form['#build_id'])) {
    //   $route_name = 'campaign_pages.paragraph_preview';
    //   $route_parameters = [
    //     'form_build_id' => $form['#build_id'],
    //     'element_parents' => implode(':', $preview_button['#field_item_parents']),
    //   ];
    //   $preview = \Drupal\Core\Url::fromRoute($route_name, $route_parameters);
    // }

    if (!empty($preview_button['#field_item_parents']) && !empty($form['#build_id'])) {
      $paragraph = static::paragraphsPreviewRenderField($form['#build_id'], $preview_button['#field_item_parents']);
    }

    // Build modal content.
    $dialog_content = [
      '#theme' => 'paragraph_preview_modal',
      '#paragraph' => $paragraph,
    ];

    // Build response.
    $response = new AjaxResponse();

    // Attach the library necessary for using the OpenModalDialogCommand and
    // set the attachments for this Ajax response.
    $form['#attached']['library'][] = 'core/drupal.dialog.ajax';
    $response->setAttachments($form['#attached']);

    // Add modal dialog.
    $response->addCommand(new OpenModalDialogCommand($dialog_title, $dialog_content, $dialog_options));

    return $response;
  }

  /**
   * Render a preview while on a form.
   *
   * @param string $form_build_id
   *   The form build id.
   * @param array $element_parents
   *   An array of item parents from the field to the item delta.
   *
   * @return array
   *   The render array.
   */
  public static function paragraphsPreviewRenderField($form_build_id, $element_parents) {

    // Initialize render array.
    $output = array();

    if (!empty($element_parents) && count($element_parents) >= 2) {
      $form_state = new FormState();
      $form = \Drupal::formBuilder()->getCache($form_build_id, $form_state);

      if ($form && $parent_entity = $form_state->getFormObject()->getEntity()) {
        $field_parents = $element_parents;
        $field_delta = array_pop($field_parents);
        // TODO: support langcode or is d8 always field_name:delta?
        $field_name = array_pop($field_parents);

        $widget_state = WidgetBase::getWidgetState($field_parents, $field_name, $form_state);

        if (!empty($widget_state['paragraphs'][$field_delta]['entity'])) {
          $paragraph = $widget_state['paragraphs'][$field_delta]['entity'];
          $field_render = static::paragraphsPreviewRenderParentField($paragraph, $field_name, $parent_entity);
          if ($field_render) {
            $output['paragraph'] = $field_render;
          }
        }
      }
    }

    return $output;
  }

  /**
   * Render a single field on the parent entity for the given paragraph.
   *
   * @param Paragraph $paragraph
   *   The paragraph entity.
   * @param string $parent_field_name
   *   The field name of the paragraph reference field on the parent entity.
   * @param ContentEntityBase $parent_entity
   *   Optional. The parent entity. This is used when on a form to allow
   *   rendering with un-saved parents.
   *
   * @return array|null
   *   A render array for the field.
   */
  public static function paragraphsPreviewRenderParentField(Paragraph $paragraph, $parent_field_name, ContentEntityBase $parent_entity = NULL) {
    if (!isset($parent_entity)) {
      $parent_entity = $paragraph->getParentEntity();
    }

    if ($parent_entity && ($parent_entity instanceof ContentEntityBase)) {
      $parent_class = get_class($parent_entity);
      $parent_entity_type = $parent_entity->getEntityTypeId();

      if ($parent_entity->hasField($parent_field_name)) {

        // Create a new paragraph with no id.
        $paragraph_clone = $paragraph->createDuplicate();

        // Clone the entity since we are going to modify field values.
        $parent_clone = clone $parent_entity;

        // Create field item values.
        $parent_field_item_value = ['entity' => $paragraph_clone];

        // Based on \Drupal\Core\Entity\EntityViewBuilder to allow arbitrary
        // field data to be rendered.
        // See https://www.drupal.org/node/2274169

        // Push the item as the single value for the field, and defer to
        // FieldItemBase::view() to build the render array.
        $parent_clone->{$parent_field_name}->setValue([$parent_field_item_value]);

        // TODO: This clones the parent again and uses
        // EntityViewBuilder::viewFieldItem().
        $elements = $parent_clone->{$parent_field_name}->view('default');

        // Extract the part of the render array we need.
        $output = isset($elements[0]) ? $elements[0] : [];
        if (isset($elements['#access'])) {
          $output['#access'] = $elements['#access'];
        }

        return $output;
      }
    }
  }

}

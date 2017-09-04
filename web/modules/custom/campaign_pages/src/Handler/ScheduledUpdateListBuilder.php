<?php

namespace Drupal\campaign_pages\Handler;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Link;
use Drupal\Core\Url;
use Drupal\scheduled_updates\ClassUtilsTrait;
use Drupal\scheduled_updates\UpdateUtils;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Defines a class to build a listing of Scheduled update entities.
 *
 * @see campaign_pages_entity_type_alter()
 *
 * @ingroup scheduled_updates
 */
class ScheduledUpdateListBuilder extends EntityListBuilder {

  use ClassUtilsTrait;

  /**
   * Entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Update utils.
   *
   * @var \Drupal\scheduled_updates\UpdateUtils
   */
  protected $updateUtils;

  /**
   * {@inheritdoc}
   */
  public static function createInstance(ContainerInterface $container, EntityTypeInterface $entity_type) {
    return new static(
      $entity_type,
      $container->get('entity.manager')->getStorage($entity_type->id()),
      $container->get('scheduled_updates.update_utils')
    );
  }

  /**
   * Constructs a new EntityListBuilder object.
   *
   * @param \Drupal\Core\Entity\EntityTypeInterface $entityType
   *   The entity type definition.
   * @param \Drupal\Core\Entity\EntityStorageInterface $storage
   *   The entity storage class.
   * @param \Drupal\scheduled_updates\UpdateUtils $updateUtils
   *   Update utils.
   */
  public function __construct(EntityTypeInterface $entityType, EntityStorageInterface $storage, UpdateUtils $updateUtils) {
    parent::__construct($entityType, $storage);
    $this->updateUtils = $updateUtils;
  }

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['parent_entity'] = $this->t('Parent Entity');
    $header['time'] = $this->t('Update Time');
    $header['type'] = $this->t('Update Type');
    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    /* @var \Drupal\scheduled_updates\Entity\ScheduledUpdate $entity */

    $updateTime = $entity->get('update_timestamp')->value;
    if (isset($updateTime) && ((int) $updateTime < REQUEST_TIME)) {
      return [];
    }

    $updateType = str_replace('node__', '', $entity->get('type')->target_id);
    switch ($updateType) {
      case 'moderation_state_1': $moderationType = 'scheduled_archive_date';
        break;

      default: $moderationType = 'scheduled_publish_date';
    }

    $query = \Drupal::database()->select("node_revision__$moderationType", 'schedule_date');
    $query->condition($moderationType . '_target_id', $entity->id());
    $query->fields('schedule_date', ['entity_id']);
    $result = $query->execute()->fetchObject();

    if (FALSE === $result) {
      $row['parent_entity'] = $this->t('Not available');
    }
    else {
      $node = \Drupal::entityTypeManager()->getStorage('node')->load($result->entity_id);
      $row['parent_entity'] = $node->toLink(NULL, 'edit-form');
    }

    $row['time'] = Link::fromTextAndUrl(
      $entity->label(),
      new Url(
        'entity.scheduled_update.edit_form', array(
          'scheduled_update' => $entity->id(),
        )
      )
    );

    $row['type'] = $this->updateUtils->getUpdateTypeLabel($entity);
    return $row + parent::buildRow($entity);
  }

}

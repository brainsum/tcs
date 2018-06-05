<?php

namespace Drupal\campaign_pages\Handler;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\Core\Link;
use Drupal\Core\Url;
use Drupal\scheduled_updates\ClassUtilsTrait;
use Drupal\scheduled_updates\UpdateRunnerUtils;
use Drupal\scheduled_updates\UpdateUtils;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Defines a class to build a listing of Scheduled update entities.
 *
 * Updated according to this patch:
 *   https://www.drupal.org/files/issues/update-title.patch
 * It doesn't work for us (revisions) so the relevant code has been copied
 * instead of using it.
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
   * Update runner.
   *
   * @var \Drupal\scheduled_updates\UpdateRunnerUtils
   */
  protected $updateRunner;

  /**
   * Entity query factory.
   *
   * @var \Drupal\Core\Entity\Query\QueryFactory
   */
  protected $entityQuery;

  /**
   * {@inheritdoc}
   */
  public static function createInstance(ContainerInterface $container, EntityTypeInterface $entity_type) {
    return new static(
      $entity_type,
      $container->get('entity.manager')->getStorage($entity_type->id()),
      $container->get('scheduled_updates.update_utils'),
      $container->get('entity_type.manager'),
      $container->get('scheduled_updates.update_runner'),
      $container->get('entity.query')
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
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   *   Entity type manager.
   * @param \Drupal\scheduled_updates\UpdateRunnerUtils $updateRunner
   *   Update runner.
   * @param \Drupal\Core\Entity\Query\QueryFactory $entityQuery
   *   Entity query factory.
   */
  public function __construct(
    EntityTypeInterface $entityType,
    EntityStorageInterface $storage,
    UpdateUtils $updateUtils,
    EntityTypeManagerInterface $entityTypeManager,
    UpdateRunnerUtils $updateRunner,
    QueryFactory $entityQuery
  ) {
    parent::__construct($entityType, $storage);
    $this->updateUtils = $updateUtils;
    $this->entityTypeManager = $entityTypeManager;
    $this->updateRunner = $updateRunner;
    $this->entityQuery = $entityQuery;
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
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Core\Entity\EntityMalformedException
   * @throws \Drupal\Core\Entity\Exception\UndefinedLinkTemplateException
   * @throws \InvalidArgumentException
   */
  public function buildRow(EntityInterface $entity) {
    /* @var \Drupal\scheduled_updates\Entity\ScheduledUpdate $entity */

    // Don't show past updates.
    $updateTime = $entity->get('update_timestamp')->value;
    if (isset($updateTime) && ((int) $updateTime < REQUEST_TIME)) {
      return [];
    }

    $type = $this->updateUtils->getUpdateType($entity);

    if (NULL === $type) {
      return [];
    }

    $targetType = $type->getUpdateEntityType();
    $runner = $this->updateRunner->getUpdateRunnerInstance($type);

    if (NULL === $runner) {
      return [];
    }

    $targetFields = $runner->getReferencingFieldIds();
    $targetField = reset($targetFields);
    // ->allRevisions()
    $targetEntities = $this->entityQuery->get($targetType, 'AND')->condition($targetField . '.target_id', $entity->id())->execute();
    $entities = [];
    foreach (array_keys($targetEntities) as $targetEntityId) {
      $entities[] = $this->entityTypeManager
        ->getStorage($targetType)
        ->loadRevision($targetEntityId);
    }

    $items = array_map(function (EntityInterface $entity) {
      return $entity->toLink($entity->label(), 'edit-form');
    }, $entities);

    if (empty($items)) {
      $row['parent_entity'] = $this->t('Not available');
    }
    else {
      $row['parent_entity'] = [
        'data' => [
          '#theme' => 'item_list',
          '#context' => ['list_style' => 'comma-list'],
          '#items' => $items,
        ],
      ];
    }

    $row['time'] = Link::fromTextAndUrl(
      $entity->label(),
      new Url(
        'entity.scheduled_update.edit_form', [
          'scheduled_update' => $entity->id(),
        ]
      )
    );

    $row['type'] = $this->updateUtils->getUpdateTypeLabel($entity);
    return $row + parent::buildRow($entity);
  }

}

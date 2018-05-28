<?php

namespace Drupal\campaign_pages\Helper;

use Drupal\Core\Config\FileStorage;

/**
 * Class ScheduledUpdateUpdateHandler.
 *
 * Includes part of the refactor done in TCS-392.
 * Creates new types of scheduled updates,
 * migrates old data to it,
 * removes old data from the original fields.
 *
 * @package Drupal\campaign_pages\Helper
 */
class ScheduledUpdateUpdateHandler {

  /**
   * Do the updates.
   *
   * 1, Import new config.
   * 2, Move data to new entities, remove old data.
   * 3, Remove old data types.
   *
   * @throws \Drupal\Core\Config\StorageException
   * @throws \Drupal\Core\Config\UnsupportedDataTypeConfigException
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Core\Entity\EntityStorageException
   * @throws \InvalidArgumentException
   */
  public function update() {
    $this->importConfig();
    $this->migrateData();
    $this->cleanup();

    // Finally, clean the caches.
    drupal_flush_all_caches();
  }

  /**
   * Import the configs.
   *
   * @throws \Drupal\Core\Config\StorageException
   * @throws \Drupal\Core\Config\UnsupportedDataTypeConfigException
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function importConfig() {
    $configDir = DRUPAL_ROOT . '/sites/default/config/prod';
    $source = new FileStorage($configDir);
    /** @var \Drupal\Core\Config\StorageInterface $configStorage */
    $configStorage = \Drupal::service('config.storage');

    $configs = [
      'scheduled_updates.scheduled_update_type.node_archive_with_status' => [
        'field_storage' => 'field.storage.scheduled_update.field_status_1',
        'field' => 'field.field.scheduled_update.node_archive_with_status.field_status_1',
        'form_display' => 'core.entity_form_display.scheduled_update.node_archive_with_status.default',
        'view_display' => 'core.entity_view_display.scheduled_update.node_archive_with_status.default',
      ],
      'scheduled_updates.scheduled_update_type.node_publish_with_status' => [
        'field_storage' => 'field.storage.scheduled_update.field_status',
        'field' => 'field.field.scheduled_update.node_publish_with_status.field_status',
        'form_display' => 'core.entity_form_display.scheduled_update.node_publish_with_status.default',
        'view_display' => 'core.entity_view_display.scheduled_update.node_publish_with_status.default',
      ],
    ];

    $entityTypeManager = \Drupal::entityTypeManager();

    $scheduleTypeStorage = $entityTypeManager->getStorage('scheduled_update_type');
    $fieldStorageStorage = $entityTypeManager->getStorage('field_storage_config');
    $fieldConfigStorage = $entityTypeManager->getStorage('field_config');
    $viewDisplayStorage = $entityTypeManager->getStorage('entity_view_display');
    $formDisplayStorage = $entityTypeManager->getStorage('entity_form_display');

    foreach ($configs as $type => $data) {
      $scheduledType = $scheduleTypeStorage->create($source->read($type));
      $scheduledType->save();

      $fieldStorage = $fieldStorageStorage->create($source->read($data['field_storage']));
      $fieldStorage->save();
      $field = $fieldConfigStorage->create($source->read($data['field']));
      $field->save();
      $formDisplay = $formDisplayStorage->create($source->read($data['form_display']));
      $formDisplay->save();
      $viewDisplay = $viewDisplayStorage->create($source->read($data['view_display']));
      $viewDisplay->save();
    }

    // Needed, otherwise they get deleted with the old config.
    $miscConfigs = [
      'field.field.node.campaign.scheduled_archive_date',
      'field.field.node.campaign.scheduled_publish_date',
    ];

    foreach ($miscConfigs as $configuration) {
      $configStorage->write($configuration, $source->read($configuration));
    }
  }

  /**
   * Migrate old data to the new entities.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Core\Entity\EntityStorageException
   * @throws \InvalidArgumentException
   */
  public function migrateData() {
    $database = \Drupal::database();
    $bundles = ['node__moderation_state', 'node__moderation_state_1'];

    $scheduleStorage = \Drupal::entityTypeManager()->getStorage('scheduled_update');
    $schedules = $scheduleStorage->loadByProperties([
      'type' => $bundles,
    ]);

    /** @var \Drupal\scheduled_updates\ScheduledUpdateInterface $schedule */
    foreach ($schedules as $schedule) {
      // Loop core.
      $bundle = $schedule->bundle();
      $scheduledTime = (int) $schedule->get('update_timestamp')->value;
      if (!in_array($bundle, [
        'node__moderation_state',
        'node__moderation_state_1',
      ], TRUE)) {
        continue;
      }

      // Delete old type updates from the past.
      if ($scheduledTime < REQUEST_TIME) {
        $schedule->delete();
        continue;
      }

      $newType = ($bundle === 'node__moderation_state') ? 'node_publish_with_status' : 'node_archive_with_status';
      $newValues = [
        'type' => $newType,
        'status' => $schedule->get('status')->value,
        'langcode' => $schedule->get('langcode')->value,
        'update_timestamp' => $scheduledTime,
        'user_id' => $schedule->get('user_id')->target_id,
        'entity_ids' => $schedule->get('entity_ids')->getValue(),
        'created' => $schedule->get('created')->value,
        'changed' => $schedule->get('entity_ids')->value,
      ];

      if ($bundle === 'node__moderation_state') {
        $newValues['field_status'] = TRUE;
      }
      else {
        $newValues['field_status_1'] = FALSE;
      }

      $oldScheduleId = $schedule->id();

      /** @var \Drupal\scheduled_updates\ScheduledUpdateInterface $newSchedule */
      $newSchedule = $scheduleStorage->create($newValues);
      $scheduleStorage->save($newSchedule);

      $newScheduleId = $newSchedule->id();

      $fieldName = ($bundle === 'node__moderation_state') ? 'scheduled_publish_date' : 'scheduled_archive_date';
      $fieldTargetId = $fieldName . '_target_id';

      // Update the field directly so we don't create new node revisions, etc.
      // Current revision.
      $updateQuery = $database->update('node__' . $fieldName);
      $updateQuery->fields([$fieldTargetId => $newScheduleId]);
      $updateQuery->condition($fieldTargetId, $oldScheduleId);
      $updateQuery->execute();
      // Other revisions.
      $updateQuery = $database->update('node_revision__' . $fieldName);
      $updateQuery->fields([$fieldTargetId => $newScheduleId]);
      $updateQuery->condition($fieldTargetId, $oldScheduleId);
      $updateQuery->execute();
    }

    $scheduleStorage->delete($schedules);
  }

  /**
   * Remove the old scheduled updates.
   *
   * @throws \Drupal\Core\Entity\EntityStorageException
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   */
  public function cleanup() {
    $bundles = ['node__moderation_state', 'node__moderation_state_1'];

    $scheduleStorage = \Drupal::entityTypeManager()->getStorage('scheduled_update');
    $schedules = $scheduleStorage->loadByProperties([
      'type' => $bundles,
    ]);
    $scheduleStorage->delete($schedules);

    $scheduleTypeStorage = \Drupal::entityTypeManager()->getStorage('scheduled_update_type');
    $types = $scheduleTypeStorage->loadByProperties([
      'id' => $bundles,
    ]);
    $scheduleTypeStorage->delete($types);
  }

}

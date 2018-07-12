<?php

namespace Drupal\campaign_pages\Helper;

use Drupal\Core\Config\FileStorage;

/**
 * Class ScheduledUpdateState2WorkbenchModeration.
 *
 * Includes part of the refactor done in TCS-455.
 * Creates new types of scheduled updates,
 * migrates old data to it,
 * removes old data from the original fields.
 *
 * @package Drupal\campaign_pages\Helper
 */
class ScheduledUpdateState2WorkbenchModeration {

  /**
   * Do the updates.
   *
   * 1, Import new config.
   * 2, Move data to new entities, remove old data.
   * 3, Remove old data and types.
   *
   * @throws \Exception
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
   * @throws \Exception
   * @throws \Drupal\Core\Config\StorageException
   * @throws \Drupal\Core\Config\UnsupportedDataTypeConfigException
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function importConfig() {
    $projectConfigPath = config_get_config_directory(CONFIG_SYNC_DIRECTORY);
    $source = new FileStorage($projectConfigPath);

    $configs = [
      'scheduled_updates.scheduled_update_type.moderation_publish' => [
        'field_storage' => [
          'field.storage.scheduled_update.field_moderation_state',
          'field.storage.node.moderation_state_publish',
        ],
        'field' => [
          'field.field.scheduled_update.moderation_publish.field_moderation_state',
          'field.field.node.campaign.moderation_state_publish',
        ],
      ],
      'scheduled_updates.scheduled_update_type.moderation_archive' => [
        'field_storage' => [
          'field.storage.scheduled_update.field_moderation_state_1',
          'field.storage.node.moderation_state_archive',
        ],
        'field' => [
          'field.field.scheduled_update.moderation_archive.field_moderation_state_1',
          'field.field.node.campaign.moderation_state_archive',
        ],
      ],
    ];

    $entityTypeManager = \Drupal::entityTypeManager();

    $scheduleTypeStorage = $entityTypeManager->getStorage('scheduled_update_type');
    $fieldStorageStorage = $entityTypeManager->getStorage('field_storage_config');
    $fieldConfigStorage = $entityTypeManager->getStorage('field_config');

    foreach ($configs as $type => $data) {
      $scheduledType = $scheduleTypeStorage->create($source->read($type));
      $scheduledType->save();

      foreach ($data['field_storage'] as $field_storage) {
        $fieldStorage = $fieldStorageStorage->create($source->read($field_storage));
        $fieldStorage->save();
      }
      foreach ($data['field'] as $field) {
        $field = $fieldConfigStorage->create($source->read($field));
        $field->save();
      }
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
    $oldBundles = ['node_publish_with_status', 'node_archive_with_status'];

    $scheduleStorage = \Drupal::entityTypeManager()->getStorage('scheduled_update');
    $schedules = $scheduleStorage->loadByProperties([
      'type' => $oldBundles,
    ]);

    $schedulesIds = [];

    /** @var \Drupal\scheduled_updates\ScheduledUpdateInterface $schedule */
    foreach ($schedules as $schedule) {
      $bundle = $schedule->bundle();
      $scheduledTime = (int) $schedule->get('update_timestamp')->value;

      $newType = ($bundle === 'node_publish_with_status') ? 'moderation_publish' : 'moderation_archive';
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

      if ($bundle === 'node_publish_with_status') {
        $newValues['field_moderation_state']['target_id'] = 'published';
      }
      else {
        $newValues['field_moderation_state_1']['target_id'] = 'archived';
      }

      /** @var \Drupal\scheduled_updates\ScheduledUpdateInterface $newSchedule */
      $newSchedule = $scheduleStorage->create($newValues);
      $scheduleStorage->save($newSchedule);

      $schedulesIds[$schedule->id()] = $newSchedule->id();
    }

    $fieldNames = [
      'scheduled_publish_date' => 'moderation_state_publish',
      'scheduled_archive_date' => 'moderation_state_archive',
    ];
    foreach (['node_', 'node_revision_'] as $table_prefix) {
      foreach ($fieldNames as $oldField => $newField) {
        $data = [];
        $table = $table_prefix . '_' . $oldField;
        $result = $database->query('SELECT * FROM ' . $table);
        foreach ($result as $item) {
          $item->{$newField . '_target_id'} = $schedulesIds[$item->{$oldField . '_target_id'}];
          unset($item->{$oldField . '_target_id'});
          if ($item->{$newField . '_target_id'}) {
            $data[] = (array) $item;
          }
        }

        if (!empty($data)) {
          $table = $table_prefix . '_' . $newField;
          $fields = array_keys($data[0]);
          $query = $database->insert($table)->fields($fields);
          foreach ($data as $record) {
            $query->values($record);
          }
          $query->execute();
        }
      }
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
    $olDBundles = ['node_publish_with_status', 'node_archive_with_status'];

    $scheduleStorage = \Drupal::entityTypeManager()->getStorage('scheduled_update');
    $schedules = $scheduleStorage->loadByProperties([
      'type' => $olDBundles,
    ]);
    $scheduleStorage->delete($schedules);
  }

}

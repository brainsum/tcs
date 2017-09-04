<?php
/**
 * Helper drush script for developers to remove paragraph types and content
 * DO NOT RUN ON PRODUCTION, this WILL REMOVE CONTENT
 **/

$entity_types = ['taxonomy_term','node','paragraph'];
foreach ($entity_types as $entity_type) {
  $query = \Drupal::entityQuery($entity_type);
  $ids = $query->execute();

  $storage_handler = \Drupal::entityTypeManager()->getStorage($entity_type);
  $entities = $storage_handler->loadMultiple($ids);
  $storage_handler->delete($entities);
}


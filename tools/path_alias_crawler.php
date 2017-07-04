<?php
/**
 * drush php-script workaround fix for TCS-280
 * run this script to populate purge_queuer_url for missing path aliases
 **/

$nids = db_query('SELECT nid FROM {node}')->fetchCol();
$langcodes = db_query('SELECT langcode FROM {node}')->fetchCol();
foreach ($nids as $key => $nid) {
  $node = node_load($nid);
  $lang = $langcodes[$key];
  if (!$node->isPublished()) {
    //echo "NOTICE: node " .$nid . " is not published, skipping\n";
    continue;
  }
  
  $alias = \Drupal::service('path.alias_manager')->getAliasByPath('/node/'.$nid);
//  $alias = getAliasByPath('node/' . $nid);
  $langalias = ($lang=='en' ? $alias : '/' . $lang . $alias);
//  echo $langalias . "\n";
  $langalias = (substr($langalias, 0, 1) == '/' ? substr($langalias, 1) : $langalias);
  $urls = db_query('SELECT url FROM purge_queuer_url WHERE url = \'' . $langalias . '\'')->fetchCol();
  $nodecount++;
  if (count($urls) == 0) {
    echo 'MISSING: ' . $nid . "\t" . $langcodes[$key] . "\t" . $alias . "\t" . $langalias . "\n";
    $missing++;
    file_get_contents('http://tietocampaigns.brainsum.com/' . $langalias);
  }
}

$count = db_query('SELECT count(*) FROM purge_queuer_url')->fetchCol();
echo $missing . " missing out of " . $nodecount . " nodes. " . $count[0] . " rows in purge_queuer_url.\n";

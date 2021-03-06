<?php

/**
 * @file
 * Custom Drupal site-specific configuration file for managing String overrides.
 *
 * Include code needed in settings.php:
 * // String overrides in separate file (for git)
 * if (file_exists($config_directories['sync'] . '/translations/locale_custom_strings_en.php')) {
 *  include $config_directories['sync'] . '/translations/locale_custom_strings_en.php';
 * }
 */

/**
 * String overrides.
 *
 * To override specific strings on your site with or without enabling the Locale
 * module, add an entry to this list. This functionality allows you to change
 * a small number of your site's default English language interface strings.
 *
 * Remove the leading hash signs to enable.
 *
 * The "en" part of the variable name, is dynamic and can be any langcode of
 * any added language. (eg locale_custom_strings_de for german).
 */
$settings['locale_custom_strings_en'][''] = array(
  'JSON API Library'      => 'dam.tieto.com',
  'Open JSON API browser' => 'Open DAM browser',
);
$settings['locale_custom_strings_de'][''] = array(
  'JSON API Library'      => 'dam.tieto.com',
  'Open JSON API browser' => 'Open DAM browser',
);
$settings['locale_custom_strings_fr'][''] = array(
  'JSON API Library'      => 'dam.tieto.com',
  'Open JSON API browser' => 'Open DAM browser',
);
$settings['locale_custom_strings_sv'][''] = array(
  'JSON API Library'      => 'dam.tieto.com',
  'Open JSON API browser' => 'Open DAM browser',
);
$settings['locale_custom_strings_fi'][''] = array(
  'JSON API Library'      => 'dam.tieto.com',
  'Open JSON API browser' => 'Open DAM browser',
);
$settings['locale_custom_strings_ru'][''] = array(
  'JSON API Library'      => 'dam.tieto.com',
  'Open JSON API browser' => 'Open DAM browser',
);
$settings['locale_custom_strings_hi'][''] = array(
  'JSON API Library'      => 'dam.tieto.com',
  'Open JSON API browser' => 'Open DAM browser',
);
$settings['locale_custom_strings_zh-hans'][''] = array(
  'JSON API Library'      => 'dam.tieto.com',
  'Open JSON API browser' => 'Open DAM browser',
);
$settings['locale_custom_strings_nb'][''] = array(
  'JSON API Library'      => 'dam.tieto.com',
  'Open JSON API browser' => 'Open DAM browser',
);
$settings['locale_custom_strings_da'][''] = array(
  'JSON API Library'      => 'dam.tieto.com',
  'Open JSON API browser' => 'Open DAM browser',
);

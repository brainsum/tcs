#!/usr/bin/env sh

SETTINGS="sites/default/settings.php"

sudo chgrp 82 . -R \
  && composer install -o \
  && cd web \
  && printf "\n\$base_url = 'tcs.docker.localhost:8000';" >> ${SETTINGS} \
  && printf "\n\$config_directories[CONFIG_SYNC_DIRECTORY] = 'sites/default/config/prod';" >> ${SETTINGS} \
  && printf "\nif (file_exists(__DIR__ . '/settings.development.php')) {" >> ${SETTINGS} \
  && printf "\n  include_once __DIR__ . '/settings.development.php';" >> ${SETTINGS} \
  && printf "\n}\n" >> ${SETTINGS} \
  && drush site-install --account-pass=123 --db-url=mysql://drupal:drupal@mariadb/drupal standard -y \
  && drush config-set 'system.site' uuid "ab099d2a-d866-46ad-96c2-6ab1ccaf3fd5" -y \
  && drush ev '\Drupal::entityManager()->getStorage("shortcut_set")->load("default")->delete();' \
  && drush cim -y \
  && drush cim -y \
  && drush cr

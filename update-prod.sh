#!/bin/bash
# This bash script will update the project without installing the development modules, that's why it's "prod"
git pull && composer install --no-dev -n -o && cd web && drush updb -y && drush cim -y || exit -1
CIMTESTRET=$( { drush cim -n; } 2>&1 )
if [[ $CIMTESTRET == "There are no changes to import"* ]]; then
  echo "Config import successful.";
else
  echo "Config import was not completely successful.";
  exit -1;
fi
drush entity-updates && echo "SUCCESS" || exit -1

#!/bin/bash

echo "Executing core for update.sh"
composer install \
 && cd web \
 && drush updb -y \
 && drush cim sync -y \
 && drush entity-updates -y \
 && echo "Successfully updated."

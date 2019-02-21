#!/bin/bash
cd web && \
 ../vendor/bin/drush updb -y \
 && ../vendor/bin/drush cim sync -y \
 && ../vendor/bin/drush entup -y \
 && ../vendor/bin/drush cr \
 && echo "Successfully updated."

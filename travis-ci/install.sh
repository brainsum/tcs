#!/usr/bin/env bash

# Debug.
{ echo "# DEBUG - PHP Mem limit" ; php -ini | grep memory_limit ; }
echo "# Preparing GIT repos"

# Remove the git details from our repo so we can treat it as a path.
cd ${TRAVIS_BUILD_DIR}
rm .git -rf

composer --verbose validate
composer install

# Add test dependencies
composer require --dev --no-update squizlabs/php_codesniffer drupal/coder wimg/php-compatibility jakub-onderka/php-parallel-lint jakub-onderka/php-console-highlighter

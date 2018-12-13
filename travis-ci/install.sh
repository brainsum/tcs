#!/usr/bin/env bash

# Debug.
{ echo "# DEBUG - PHP Mem limit" ; php -ini | grep memory_limit ; }
echo "# Preparing GIT repos"

# Remove the git details from our repo so we can treat it as a path.
cd ${TRAVIS_BUILD_DIR}
rm .git -rf

composer global require hirak/prestissimo:^0.3

composer --verbose validate
composer install


# Add test dependencies
composer global require drupal/coder:^8.3 squizlabs/php_codesniffer:^3.3 phpcompatibility/php-compatibility:^9.0 jakub-onderka/php-parallel-lint:^1.0 jakub-onderka/php-console-highlighter:^0.4 dealerdirect/phpcodesniffer-composer-installer:^0.4
#phpcs --config-set installed_paths ${GLOBAL_VENDOR_DIR}/drupal/coder/coder_sniffer,${GLOBAL_VENDOR_DIR}/phpcompatibility/php-compatibility

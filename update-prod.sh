#!/bin/bash
# This bash script will update the project without installing the development modules, that's why it's "prod"
git pull \
    && ./scripts/custom/core.update-prod.sh

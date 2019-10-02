#!/usr/bin/env bash

docker-compose up -d --force-recreate || exit 1
docker-compose ps || exit 1
docker-compose exec php sh || exit 1

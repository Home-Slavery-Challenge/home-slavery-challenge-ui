#!/usr/bin/env bash
set -euo pipefail

cd /srv/slavery-home-challenge-ui

echo "Current directory:"
pwd

echo "Docker version:"
docker --version

echo "Docker Compose version:"
docker compose version

echo "Pulling latest images..."
docker compose -f docker-compose.yml pull

echo "Restarting containers..."
docker compose -f docker-compose.yml up -d --remove-orphans

echo "Done ✅"

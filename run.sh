COMPOSE_FILE="compose.dev.yaml"

echo "Switching to default Docker context..."
docker context use "default"

echo "Starting project..."
docker compose -f "${COMPOSE_FILE}" up --watch

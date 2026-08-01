CONTEXT_NAME="delaneys-website"
COMPOSE_FILE="compose.prod.yaml"
SERVICE_NAME="delaneys"

echo "Switching to context '${CONTEXT_NAME}'..."
docker context use "${CONTEXT_NAME}"

echo "Deploying to remote..."
docker stack deploy -c "${COMPOSE_FILE}" "${SERVICE_NAME}" --with-registry-auth

echo "Switching back to default context"
docker context use "default"

echo "All done!"

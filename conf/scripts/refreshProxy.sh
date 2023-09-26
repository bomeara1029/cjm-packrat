echo "Restarting nginx service"
# Restart nginx service
docker compose --env-file .env.prod -f ./conf/docker/docker-compose.prod.yml up --build -d packrat-proxy

# Check if status is active
docker container ls | grep s3fs
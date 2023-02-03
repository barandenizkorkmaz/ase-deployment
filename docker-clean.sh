docker compose down --volumes
docker rm -vf $(docker ps -aq)
docker rmi -f $(docker images -aq)
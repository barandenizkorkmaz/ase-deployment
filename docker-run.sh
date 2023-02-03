cd authentication-service/ && mvn clean compile package && cd ..
cd delivery-service/ && mvn clean compile package && cd ..
cd gateway/ && mvn clean compile package && cd ..
cd registry-service/ && mvn clean compile package && cd ..
docker compose down --volumes
docker rm -vf $(docker ps -aq)
docker rmi -f $(docker images -aq)
docker compose up -d --build
FROM openjdk:17

WORKDIR /app

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} ./app.jar

EXPOSE 8082

ENTRYPOINT ["java","-jar","./app.jar"]
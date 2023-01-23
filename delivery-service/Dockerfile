FROM openjdk:17
# set working directory
WORKDIR /build
# Copy the jar package into the container
ADD ./target/ase_box-0.0.1-SNAPSHOT.jar ./test.jar
# Expose port 8080
EXPOSE 8082
# Run the jar package
CMD java -jar test.jar
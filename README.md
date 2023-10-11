# Introduction

This file contains the instructions for running the ASE Delivery App for the course of Advanced Topics of Software Engineering in WS22/23.



## Team Members

- Baran Deniz Korkmaz
- Doğukan Ali Gündoğan
- Didem Öngü



## Program Specifications

The application has been tested in the following test environment:

- OS: Ubuntu 22.04
- Python: 3.9.2

The tests with Mac devices using M1 processor showed that the application starts very slowly.



## Installation

This section includes instructions for running the microservices and hardware device. The installation manual **assumes** that you clone the root team repository containing the following repositories:

1. ASE 22-23 / Team03 / deployment
2. ASE 22-23 / Team03 / raspberry-pi

The repositories below have been used for development purposes and the developers committed their development contributions inside those repositories. The content of the repositories are identical with the folders inside `depoyment` repository except for spring, react, and docker configuration files.

1. ASE 22-23 / Team03 / authentication-service-v3
2. ASE 22-23 / Team03 / delivery-service
3. ASE 22-23 / Team03 / frontend_v2
4. ASE 22-23 / Team03 / gateway
5. ASE 22-23 / Team03 / registry-service

In addition, there are some additionally archived repositories that the developers contributed during the development phases but later decided not to use for production.



### ASE Delivery Microservices

There are two possible ways to run the application. The instructions assume that you are currently located in the repository `ASE 22-23 / Team03 / deployment`. Please make sure that you checked the section **`Important Notes`** before running application.



#### 1. Running Microservices Using Docker Compose by Pulling From Docker Hub

This method describes how to pull and run microservices in your local machine from Docker Hub repository of Baran Deniz Korkmaz.

1. Run the following command:

   ```bash
   sudo docker compose -f docker-compose.prod.yml up -d --build
   ```

   

#### 2. Building and Running Microservices Manually Using Docker Compose

This method describes how to build and run microservices in your local machine. In terminal:

1.  Run the script called `docker-run.sh` with `sudo` priviledges.

   ```bash
   sudo ./docker-run.sh
   ```

   - **IMPORTANT NOTE:** This script removes all docker containers, images, and volumes that are previously generated to avoid any duplicate instances. You might feel free to delete lines 5-7 to avoid that behavior if you don't want to lose your important data.

   - You might need to give additionally the privilege to run the file.

     ```bash
     chmod +x docker-run.sh
     ```

**Upon successful orchestration of microservices, you can log-in with the following credentials which has been created as a root `DISPATCHER` user.** 

- Email: `admin@tum.de`
- Password: `admin`

**IMPORTANT NOTE:** If you are using any operating system that does **NOT** use the file system of **Linux**-based distributions, you need to ensure that the path of Mongo initialization script that will be mounted to Mongo container should be provided correctly in Docker Compose files. Otherwise, your Mongo container will **NOT** contain any data.



### Raspberry Pi

The instructions assume that you are currently located in the repository `ASE 22-23 / Team03 / raspberry-pi` and you are already connected to your raspberry pi device.

1. Make sure that your Python environment contains required packages.

   ```bash
   pip3 install -r requirements.txt
   ```

2. Make sure that you previously created a box using ASE Delivery software and you configured config.json file accordingly. This means that you need to change the id, name, and address values in `config.json` accordingly. You can use the box listing functionality of dispatcher for obtaining id of a box. The program assumes by default that `config.json` file is inside the repository root folder.

3. Get the public IP address of your local machine that is running microservices.

   ```bash
   hostname -I
   ```

4.  Run raspberry pi using the following command:

   ```bash
   python3 main.py --host [YOUR_IP_ADDRESS]
   ```

   - There are two more arguments that the program can take, however please leave them as their default values. The program automatically takes the default values if you just ignore these arguments. These arguments are:
     - --port [PORT]: By default `10789` for the port of gateway.
     - --config [CONFIG_PATH]: By default`config.json`

Extras:

1. For reading and writing rfid tags, you can use the script called `writer.py` in the repository folder.

   ```bash
   python3 writer.py
   ```



## Important Notes

1. You might need to replace lines 1-4 in `docker-run.sh` file as follows in order to install Spring dependencies:

   ```bash
   cd authentication-service/ && mvn clean install && mvn clean compile package && cd ..
   cd delivery-service/ && mvn clean install && mvn clean compile package && cd ..
   cd gateway/ && mvn clean install && mvn clean compile package && cd ..
   cd registry-service/ && mvn clean install && mvn clean compile package && cd ..
   ```

2. After running micro-services, it takes some time for micro-services to successfully start. You can view the status of micro-services using registry service on `localhost:8761`. After all micro-services (namely authentication service, delivery service, and gateway) are up and running, **you are kindly suggested to wait some more time until front-end service is ready as orchestration takes time.**

3. Notes on UI-Service:

   1. If the login form does not show up on startup, please click into `ASE-Delivery` text/icon.
   2. For CSRF token to be assigned, you might need to click into login twice to log-in successfully.
   3. In case of unsuccessful log-in, there is no warning pop-up appearing on the screen unfortunately.

4. The Email Notifications have been tested successfully for emails with `gmail` extensions. The tests for TUM emails have been failed probably due to security reasons by TUM server-side.

5. **Upon successful orchestration of microservices, you can log-in with the following credentials which has been created as a root `DISPATCHER` user.** 

   - Email: `admin@tum.de`
   - Password: `admin`



## Acknowledgment
We would like to present our most sincere thanks to all the teaching staff for all their interest, understanding, and patience.

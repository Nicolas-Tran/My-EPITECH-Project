FROM maven:3.5-jdk-8-alpine AS builder

WORKDIR /build

COPY pom.xml .

RUN mvn dependency:resolve

COPY src/ /build/src

RUN cd /build && mvn package

FROM openjdk:8-jre-alpine

EXPOSE 80

WORKDIR /app

COPY . /app

CMD ["java", "-jar", "worker-jar-with-dependencies.jar"]
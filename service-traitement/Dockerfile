# Étape 1: Build
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2/repository mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Étape 2: Exécution
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8082
# On lance directement l'application, sans script
ENTRYPOINT ["java","-jar","/app/app.jar"]
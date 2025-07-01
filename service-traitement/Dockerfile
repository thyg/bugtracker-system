# Étape 1: Build (INCHANGÉE)
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2/repository mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Étape 2: Exécution (MODIFIÉE)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# On installe les outils pour le script
RUN apk add --no-cache netcat-openbsd

# On copie le script
COPY scripts/wait-for-it.sh .
RUN chmod +x wait-for-it.sh

# On copie le JAR de l'application
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8082

# On utilise le script pour lancer l'application, en attendant Kafka
ENTRYPOINT ["./wait-for-it.sh", "kafka", "9092", "--", "java","-jar","/app/app.jar"]
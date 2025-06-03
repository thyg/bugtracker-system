# ---- Étape 1 : compilation Maven ----
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn -q package -DskipTests

# ---- Étape 2 : image d’exécution légère ----
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# copie le jar généré (on wildcard : *.jar)
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","app.jar"]

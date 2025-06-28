# ---- Étape 1 : compilation Maven ----
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# -- OPTIMISATION DU CACHE --
# 1. Copier UNIQUEMENT le pom.xml
COPY pom.xml .

# 2. Télécharger toutes les dépendances.
# Cette étape ne sera ré-exécutée que si le pom.xml change.
RUN mvn dependency:go-offline

# 3. Maintenant, copier le reste du code source.
# Si seul le code source change, les étapes ci-dessus seront chargées depuis le cache.
COPY src ./src

# -- FIN DE L'OPTIMISATION --

# Lance la compilation. Maven utilisera les dépendances déjà téléchargées.
RUN mvn -q package -DskipTests

# ---- Étape 2 : image d’exécution légère (INCHANGÉE) ----
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","app.jar"]
# ---- Étape 1 : compilation (INCHANGÉE) ----
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# ---- Étape 2 : image d’exécution (MODIFIÉE) ----
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# --- MODIFICATIONS ICI ---
# 1. On installe 'netcat' qui est nécessaire pour le script
RUN apk add --no-cache netcat-openbsd

# 2. On copie notre script 'wait-for-it.sh'
#    (Note: ce chemin suppose que vous avez créé 'scripts/wait-for-it.sh' à la racine)
COPY scripts/wait-for-it.sh .
RUN chmod +x wait-for-it.sh
# --- FIN DES MODIFICATIONS ---

COPY --from=build /app/target/*.jar app.jar
EXPOSE 8082

# On modifie le point d'entrée pour utiliser le script
ENTRYPOINT ["./wait-for-it.sh", "kafka", "--", "java","-jar","/app/app.jar"]
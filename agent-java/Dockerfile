# ================================================================
# DOCKERFILE POUR BUILD DE L'AGENT BUGTRACKER
# ================================================================

FROM maven:3.9.4-eclipse-temurin-11 AS builder

WORKDIR /build

# Copier les fichiers de configuration Maven
COPY pom.xml .
COPY src ./src

# Build de l'agent avec toutes les dépendances
RUN mvn clean package -DskipTests

# Vérifier que l'agent a été créé
RUN ls -la target/ && \
    test -f target/bugtracker-agent-1.0.0-agent.jar

# ================================================================
# IMAGE FINALE - DISTRIBUTION DE L'AGENT
# ================================================================

FROM eclipse-temurin:11-jre-alpine

# Métadonnées
LABEL maintainer="BugTracker Team"
LABEL description="BugTracker Java Agent - Sentry Hybrid"
LABEL version="1.0.0"

# Créer un utilisateur non-root
RUN addgroup -g 1001 bugtracker && \
    adduser -D -u 1001 -G bugtracker bugtracker

# Créer les répertoires
RUN mkdir -p /app/agent

# Copier l'agent depuis le builder
COPY --from=builder /build/target/bugtracker-agent-1.0.0-agent.jar /app/agent/bugtracker-agent.jar

# Rendre l'agent accessible
RUN chmod +r /app/agent/bugtracker-agent.jar

# Changer vers l'utilisateur non-root
USER bugtracker

WORKDIR /app

# Point d'entrée pour distribuer l'agent
CMD ["sh", "-c", "echo '🚀 BugTracker Agent prêt à être utilisé!' && \
                  echo '📁 Agent JAR: /app/agent/bugtracker-agent.jar' && \
                  echo '📖 Usage: java -javaagent:/app/agent/bugtracker-agent.jar=http://bugtracker:8081/api/errors YourApp' && \
                  echo '⏳ Container en attente...' && \
                  tail -f /dev/null"]

# Exposer un volume pour que l'agent puisse être monté
VOLUME ["/app/agent"]
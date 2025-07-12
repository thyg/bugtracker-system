# 📥 Service d'Ingestion (service-ingestion)

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/apache%20kafka-%23231F20.svg?style=for-the-badge&logo=apache-kafka&logoColor=white)

> 🚪 **Point d'entrée unique** pour tous les événements d'erreur entrants dans le système BugTracker. Il joue le rôle d'un collecteur haute disponibilité qui reçoit les données des différents agents (ex: agent-java), les valide, et les publie de manière asynchrone dans le pipeline de données via Apache Kafka.

Son design est volontairement simple et focalisé sur une seule responsabilité : **recevoir et publier**. Il ne contient aucune logique métier complexe et n'interagit pas directement avec la base de données principale, garantissant ainsi une haute performance et une forte résilience.

## 📋 Table des Matières

- [🏗️ Architecture et Rôle](#️-architecture-et-rôle)
- [🔌 API Endpoints](#-api-endpoints)
  - [📤 POST /api/errors](#-post-apierrors)
  - [💚 GET /api/errors/health](#-get-apierrorshealth)
- [🔄 Flux de Données](#-flux-de-données)
- [⚙️ Configuration](#️-configuration)
- [💻 Développement](#-développement)
  - [📋 Prérequis](#-prérequis)
  - [🔨 Compilation](#-compilation)
  - [🚀 Lancement Local](#-lancement-local)
  - [🐋 Lancement avec Docker](#-lancement-avec-docker)
  - [🧪 Tests](#-tests)

## 🏗️ Architecture et Rôle

Le service-ingestion est un service **Spring Boot** qui expose une API REST. Son rôle principal dans l'architecture événementielle est de découpler les producteurs d'événements (agents) des consommateurs (services de traitement).

### 🔄 Processus de traitement :

1. **📨 Réception HTTP** : Il écoute les requêtes HTTP POST provenant des agents
2. **✅ Validation (légère)** : Il s'assure que le corps de la requête est un JSON valide et contient les champs minimaux requis (comme `projectKey`)
3. **📊 Enrichissement** : Il ajoute un timestamp côté serveur (`receivedAt`) pour tracer le temps de transit dans le système
4. **🚀 Publication Kafka** : Il sérialise l'événement en JSON et le publie dans un topic Kafka spécifique. La clé du message Kafka est la `projectKey`, ce qui permet un partitionnement intelligent

> 💡 Ce découplage signifie que même si les services en aval (comme le service-traitement) sont en panne ou surchargés, l'ingestion peut continuer à accepter des erreurs, **Kafka agissant comme un tampon (buffer) durable**.

## 🔌 API Endpoints

### 📤 POST /api/errors

C'est l'endpoint principal pour soumettre un nouvel événement d'erreur.

- **Méthode** : `POST`
- **Chemin** : `/api/errors`
- **Corps de la requête (Body)** : Un objet JSON correspondant au `ErrorEventDTO`

```json
{
  "projectKey": "VOTRE_CLÉ_DE_PROJET",
  "level": "ERROR",
  "message": "Message d'erreur...",
  "exception": { "...détails de l'exception..." },
  "contexts": { "...contexte d'exécution..." },
  "tags": { "...tags personnalisés..." }
}
```

**Réponses :**
- **✅ Succès** : `202 Accepted` - Ce code signifie "J'ai bien reçu votre requête et je vais la traiter, mais je ne peux pas vous garantir qu'elle est déjà traitée." C'est le comportement parfait pour un système asynchrone
- **❌ Erreur** : `400 Bad Request` si le JSON est mal formé ou si un champ obligatoire manque

### 💚 GET /api/errors/health

Un endpoint de santé standard pour les systèmes de monitoring et les healthchecks de Docker.

- **Méthode** : `GET`
- **Chemin** : `/api/errors/health`
- **Réponse** : Un objet JSON indiquant le statut du service

```json
{
  "status": "UP",
  "service": "BugTracker Ingestion Service",
  "..."
}
```

## 🔄 Flux de Données

```
Agent/SDK  →  HTTP POST /api/errors  →  [ service-ingestion ]  →  Publication dans Topic Kafka  →  [ service-traitement ]
```

## ⚙️ Configuration

La configuration du service se fait via le fichier `src/main/resources/application.properties`. Les paramètres clés peuvent être surchargés par des variables d'environnement Docker.

| Propriété | Variable d'Environnement Docker | Description |
|-----------|--------------------------------|-------------|
| `server.port` | (via ports dans Docker Compose) | Le port sur lequel le service écoute. **Par défaut : 8081** |
| `spring.kafka.bootstrap-servers` | `KAFKA_BOOTSTRAP_SERVERS` | L'adresse des brokers Kafka |
| `bugtracker.kafka-topic` | (configurable via env var) | Le nom du topic où les erreurs sont publiées |

## 💻 Développement

### 📋 Prérequis

- **☕ JDK 17+**
- **📦 Maven 3.8+**
- **🐋 Docker & Docker Compose**

### 🔨 Compilation

Pour compiler le service et créer le fichier `.jar`, exécutez la commande suivante depuis le dossier `service-ingestion` :

```bash
# Compile et crée le package sans lancer les tests
mvn clean package -DskipTests
```

Ou, si le projet est configuré en multi-modules, depuis la racine `bugtracker-system` :

```bash
mvn clean install -DskipTests
```

Le JAR se trouvera dans `service-ingestion/target/`.

### 🚀 Lancement Local

Pour lancer le service localement (en dehors de Docker), vous aurez besoin d'une instance Kafka accessible.

```bash
java -jar target/service-ingestion-0.0.1-SNAPSHOT.jar
```

> ⚠️ Assurez-vous d'avoir configuré les serveurs Kafka dans `application.properties` ou via les variables d'environnement.

### 🐋 Lancement avec Docker

Le service est conçu pour être lancé avec Docker Compose. La configuration est gérée dans le fichier `docker-compose.yml` à la racine du projet.

```bash
# Depuis la racine du projet, pour lancer tous les services
docker compose up --build

# Pour voir les logs spécifiques à ce service
docker compose logs -f ingestion
```

### 🧪 Tests

Pour tester l'endpoint d'ingestion manuellement, vous pouvez utiliser `curl` :

```bash
curl -X POST http://localhost:8080/api/errors \
-H "Content-Type: application/json" \
-d '{
      "projectKey": "MANUAL-TEST",
      "level": "warn",
      "message": "Ceci est un test manuel",
      "exception": { "type": "ManualTestException", "value": "Test depuis cURL" }
    }'
```

> 📝 **Note** : L'URL utilise le port `8080` si vous passez par une Gateway, ou `8081` si vous appelez le service directement.

---

<div align="center">
  <p>📥 <strong>Ingestion rapide, traitement intelligent - L'entrée parfaite pour vos erreurs !</strong> 🚀</p>
</div>
# 🔄 Service de Traitement (service-traitement)

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/apache%20kafka-%23231F20.svg?style=for-the-badge&logo=apache-kafka&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

> 🧠 **Cœur métier du système BugTracker** - Responsable du traitement, de la persistance et de l'exposition des données de bugs. Il implémente un modèle à double responsabilité, agissant à la fois comme un **consommateur d'événements** et comme un **fournisseur d'API REST**.

## 📋 Table des Matières

- [🏗️ Architecture et Rôles](#️-architecture-et-rôles)
  - [📨 Rôle n°1 : Consommateur d'Événements](#-rôle-n1--consommateur-dévénements)
  - [🔌 Rôle n°2 : Fournisseur d'API REST](#-rôle-n2--fournisseur-dapi-rest)
- [🗄️ Interaction avec la Base de Données](#️-interaction-avec-la-base-de-données)
- [📊 Modèle de Données](#-modèle-de-données)
- [🔌 API Endpoints](#-api-endpoints)
  - [📋 GET /api/bugs](#-get-apibugs)
  - [🔍 GET /api/bugs/{id}](#-get-apibugsid)
- [⚙️ Configuration](#️-configuration)
- [💻 Développement](#-développement)
  - [📋 Prérequis](#-prérequis)
  - [🔨 Compilation](#-compilation)
  - [🚀 Lancement et Tests](#-lancement-et-tests)

## 🏗️ Architecture et Rôles

Ce service est un **composant central** qui relie le pipeline de données asynchrone à l'accès synchrone requis par les applications clientes (comme le frontend).

### 📨 Rôle n°1 : Consommateur d'Événements

1. **🎯 Abonnement à Kafka** : Le service s'abonne au topic Kafka `bugs.reported` en utilisant un `groupId` spécifique (`bug-processors`). Cela permet, à l'avenir, de lancer plusieurs instances de ce service pour traiter les messages en parallèle et assurer la scalabilité

2. **⚙️ Traitement des Messages** : Lorsqu'un message est reçu de Kafka, le `BugConsumerService` le désérialise depuis son format JSON

3. **💾 Persistance** : Il mappe ensuite les données de l'événement à l'entité JPA `BugReportEntity` et la sauvegarde dans la base de données PostgreSQL. C'est à cette étape que l'événement volatile devient un enregistrement de bug concret et permanent

### 🔌 Rôle n°2 : Fournisseur d'API REST

1. **🌐 Exposition d'Endpoints** : Le `BugReportController` expose une API REST CRUD (Create, Read, Update, Delete) pour la gestion des bugs. Dans ce prototype, les fonctions de lecture sont implémentées

2. **🖥️ Service pour le Frontend** : Ces endpoints sont la source de vérité pour toute interface utilisateur. Le frontend interrogera cette API (via la Gateway) pour afficher la liste des bugs, les détails d'un bug spécifique, etc.

## 🗄️ Interaction avec la Base de Données

Ce service est le **seul composant** de l'architecture autorisé à écrire et lire dans la table principale des bugs de la base de données PostgreSQL.

## 📊 Modèle de Données

L'entité principale est `BugReportEntity`, qui est mappée à la table `bugs`. Pour stocker des données complexes et non structurées (comme les stack traces ou les contextes), ce service utilise des colonnes de type **JSONB** de PostgreSQL, grâce à la bibliothèque `hypersistence-utils`. 

> 💡 Cela offre un excellent compromis entre la structure d'une base de données relationnelle et la flexibilité du NoSQL.

## 🔌 API Endpoints

### 📋 GET /api/bugs

Récupère une liste de tous les rapports de bugs stockés en base de données.

- **Méthode** : `GET`
- **Chemin** : `/api/bugs`
- **Réponse** : Un tableau JSON d'objets `BugReportEntity`

```json
[
  {
    "id": 1,
    "projectKey": "PROJ-A",
    "level": "ERROR",
    "message": "Erreur de connexion à la base",
    "..."
  },
  {
    "id": 2,
    "..."
  }
]
```

### 🔍 GET /api/bugs/{id}

Récupère les détails d'un seul rapport de bug par son identifiant unique.

- **Méthode** : `GET`
- **Chemin** : `/api/bugs/123` (où 123 est l'ID du bug)
- **Réponse en cas de succès** : `200 OK` avec l'objet JSON `BugReportEntity` correspondant
- **Réponse si non trouvé** : `404 Not Found`

## ⚙️ Configuration

La configuration du service se fait via `src/main/resources/application.properties` et peut être surchargée par des variables d'environnement dans `docker-compose.yml`.

| Propriété | Variable d'Environnement Docker | Description |
|-----------|--------------------------------|-------------|
| `server.port` | (via ports dans Docker Compose) | Le port sur lequel le service écoute. **Défaut : 8082** |
| `spring.datasource.url` | `SPRING_DATASOURCE_URL` | L'URL de connexion JDBC à la base PostgreSQL |
| `spring.datasource.username` | `SPRING_DATASOURCE_USERNAME` | L'utilisateur pour la connexion à la base de données |
| `spring.datasource.password` | `SPRING_DATASOURCE_PASSWORD` | Le mot de passe pour la connexion |
| `spring.kafka.bootstrap-servers` | `SPRING_KAFKA_BOOTSTRAP_SERVERS` | L'adresse des brokers Kafka |
| `bugtracker.kafka-topic` | (configurable via env var) | Le nom du topic Kafka à écouter |

## 💻 Développement

### 📋 Prérequis

- **☕ JDK 17+**
- **📦 Maven 3.8+**
- **🐋 Docker & Docker Compose**

### 🔨 Compilation

Pour compiler le service, exécutez la commande suivante depuis le dossier `service-traitement` :

```bash
# Compile et crée le package en ignorant les tests (plus rapide en dev)
mvn clean package -DskipTests
```

Ou, si le projet est configuré en multi-modules, depuis la racine `bugtracker-system` :

```bash
mvn clean install -DskipTests
```

### 🚀 Lancement et Tests

Ce service dépend fortement de **PostgreSQL** et **Kafka**. Il doit donc être lancé dans son environnement Docker Compose.

#### 1. **🐋 Lancer l'environnement complet :**

```bash
# Depuis la racine du projet
docker compose up --build
```

#### 2. **📋 Voir les logs du service :**
Pour voir en temps réel les messages consommés depuis Kafka et les requêtes SQL.

```bash
docker compose logs -f traitement
```

#### 3. **🧪 Tester l'API directement :**
Pour vérifier que l'API REST fonctionne, vous pouvez l'appeler directement sur son port exposé.

```bash
# Récupérer tous les bugs
curl http://localhost:8082/api/bugs | jq

# Récupérer le bug avec l'ID 1
curl http://localhost:8082/api/bugs/1 | jq
```

---

<div align="center">
  <p>🔄 <strong>Du chaos des erreurs à l'ordre des données - Le traitement intelligent !</strong> 🧠</p>
</div>
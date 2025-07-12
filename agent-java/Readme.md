# 🐛 BugTracker Java Agent (agent-java)

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Maven](https://img.shields.io/badge/maven-%23C71A36.svg?style=for-the-badge&logo=apache-maven&logoColor=white)

> 🚀 **Agent Java hybride** conçu pour capturer automatiquement les exceptions non gérées dans n'importe quelle application Java et les rapporter au système BugTracker.

Son approche **"hybride"** consiste à utiliser le robuste SDK de capture de Sentry pour intercepter les erreurs avec un maximum de contexte, tout en court-circuitant l'envoi vers les serveurs de Sentry pour rediriger un payload JSON personnalisé vers notre propre service-ingestion.

## 📋 Table des Matières

- [🔧 Principes de Fonctionnement](#-principes-de-fonctionnement)
- [✨ Fonctionnalités Clés](#-fonctionnalités-clés)
- [🚀 Utilisation](#-utilisation)
  - [📋 Prérequis](#-prérequis)
  - [🔨 Compilation](#-compilation)
  - [🔗 Attachement à une Application](#-attachement-à-une-application)
- [⚙️ Configuration](#️-configuration)
- [📤 Structure du Payload](#-structure-du-payload)
- [💻 Développement](#-développement)

## 🔧 Principes de Fonctionnement

1. **🔌 Initialisation** : L'agent s'attache à la JVM au démarrage et initialise le SDK Sentry en mode "proxy"
2. **💥 Exception** : Une exception se produit dans l'application cible
3. **🎯 Capture** : Le SDK Sentry la capture automatiquement grâce à son `UncaughtExceptionHandler`
4. **🪝 Interception** : Juste avant d'envoyer l'événement à Sentry, le hook `beforeSend` est déclenché
5. **🛑 Redirection** : Notre agent intercepte cet événement, l'annule (en retournant `null`), et l'empêche de partir vers Sentry
6. **🔄 Conversion** : Il convertit l'événement Sentry en notre propre format JSON standardisé
7. **📡 Envoi** : Il envoie ce payload via une requête HTTP POST à l'endpoint du service-ingestion configuré

> 💡 Cette approche nous permet de bénéficier de la puissance et de la maturité de la capture d'erreurs de Sentry sans dépendre de leur infrastructure.

## ✨ Fonctionnalités Clés

- **🔍 Capture Automatique** : Pas de try-catch nécessaire pour les erreurs non gérées
- **📊 Enrichissement de Données** : Collecte automatiquement le contexte de l'OS, du runtime Java, des threads et la stack trace complète
- **⚙️ Configuration Flexible** : L'endpoint et la clé de projet peuvent être configurés via des propriétés système ou des variables d'environnement
- **⚡ Léger et Performant** : L'envoi des rapports d'erreur se fait de manière asynchrone pour ne pas impacter les performances de l'application cible

## 🚀 Utilisation

### 📋 Prérequis

- **☕ JDK 17** ou supérieur
- **📦 Apache Maven 3.8+**

### 🔨 Compilation

L'agent fait partie d'un projet multi-modules. Pour le compiler et l'installer dans votre dépôt Maven local, exécutez la commande suivante depuis la racine du projet `bugtracker-system` :

```bash
mvn clean install
```

Cette commande produira le JAR de l'agent dans le répertoire `agent-java/target/`. Le fichier à utiliser est celui qui se termine par `-agent.jar`, par exemple : `bugtracker-agent-1.0.0-SNAPSHOT-agent.jar`.

### 🔗 Attachement à une Application

Pour utiliser l'agent, attachez-le à votre application Java au démarrage en utilisant l'argument `-javaagent`.

**Syntaxe de la commande :**

```bash
java -javaagent:/chemin/vers/bugtracker-agent-1.0.0-SNAPSHOT-agent.jar \
     -Dbugtracker.projectKey="VOTRE_CLÉ_DE_PROJET" \
     -Dbugtracker.endpoint="http://localhost:8080/api/errors" \
     -jar /chemin/vers/votre-application.jar
```

- **`-javaagent`** : Spécifie le chemin vers le JAR de l'agent
- **`-D...`** : Permet de configurer l'agent via les propriétés système (voir section Configuration)

## ⚙️ Configuration

L'agent est configurable via les propriétés système Java (`-Dkey=value`) ou les variables d'environnement. Les propriétés système ont la priorité.

| Paramètre | Propriété Système (`-D`) | Variable d'Environnement | Valeur par Défaut | Description |
|-----------|--------------------------|--------------------------|-------------------|-------------|
| **🎯 Endpoint** | `bugtracker.endpoint` | `BUGTRACKER_ENDPOINT` | `http://localhost:8081/api/errors` | L'URL complète du service-ingestion (ou de la Gateway) où les erreurs doivent être envoyées |
| **🔑 Clé de Projet** | `bugtracker.projectKey` | `BUGTRACKER_PROJECT_KEY` | `dev-project-key-01` | La clé unique qui identifie le projet auquel cette erreur appartient. **Obligatoire en production** |
| **🐛 Debug** | `bugtracker.debug` | `BUGTRACKER_DEBUG` | `false` | Si mis à `true`, active les logs verbeux de l'agent et du SDK Sentry pour le débogage |

## 📤 Structure du Payload

L'agent envoie un objet JSON au service d'ingestion. La structure est conçue pour être compatible avec le `ErrorEventDTO`.

**Exemple de payload :**

```json
{
  "projectKey": "VOTRE_CLÉ_DE_PROJET",
  "timestamp": "2025-07-01T12:00:00.000Z",
  "level": "ERROR",
  "message": "Cannot invoke \"String.length()\" because \"s\" is null",
  "platform": "java",
  "exception": {
    "type": "java.lang.NullPointerException",
    "value": "Cannot invoke \"String.length()\" because \"s\" is null",
    "stacktrace": [
      {
        "filename": "MyClass.java",
        "function": "doSomething",
        "lineno": 42,
        "module": "com.mycompany.myapp.MyClass"
      }
    ]
  },
  "contexts": {
    "os": {
      "name": "Linux",
      "version": "5.15.0-76-generic"
    },
    "runtime": {
      "name": "Eclipse Adoptium",
      "version": "17.0.15"
    }
  },
  "tags": {
    "agent": "bugtracker-hybrid",
    "version": "1.0.0"
  }
}
```

## 💻 Développement

Pour travailler sur l'agent, vous pouvez ouvrir son dossier dans votre IDE. Les tests unitaires peuvent être lancés via la commande Maven standard depuis la racine du projet ou le dossier de l'agent :

```bash
mvn test
```

---

<div align="center">
  <p>🚀 <strong>Fait avec ❤️ pour une meilleure gestion des erreurs</strong> 🚀</p>
</div>
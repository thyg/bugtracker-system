# 🧪 Exemples d'Utilisation et Applications de Test

> 📋 **Collection d'applications Java** et de configurations conçues pour tester et démontrer les fonctionnalités du système BugTracker, en particulier l'intégration de l'**agent-java**.

Ces exemples ne font pas partie de l'application de production, mais servent d'**outils de développement**, de **tests d'intégration** et de **validation de bout en bout**.

## 📋 Table des Matières

- [🎯 Objectif des Exemples](#-objectif-des-exemples)
- [💥 test-app](#-test-app)
  - [📖 Description](#-description)
  - [🔨 Comment le construire ?](#-comment-le-construire-)
  - [🚀 Comment l'utiliser ?](#-comment-lutiliser-)
- [📂 Autres Exemples](#-autres-exemples)

## 🎯 Objectif des Exemples

Le but principal de ces exemples est de :

- **✅ Valider le agent-java** : S'assurer qu'il s'attache correctement à une application et qu'il capture bien les différents types d'exceptions
- **🔄 Tester la chaîne d'ingestion** : Vérifier que les erreurs capturées sont correctement envoyées au service-ingestion et propagées jusqu'à Kafka
- **💡 Fournir un cas d'usage concret** : Montrer à un utilisateur comment il pourrait intégrer l'agent à sa propre application
- **🤖 Servir de base** pour les tests d'intégration automatisés à l'avenir

## 💥 test-app : Application de Stress d'Erreurs

> 🎯 **L'exemple le plus important** - Une application Java minimale dont le seul but est de générer une série d'erreurs variées pour tester la résilience et la capacité de capture de notre agent.

### 📖 Description

Le fichier `test-app/src/main/java/com/bugtracker/test/AgentErrorStressTest.java` est un programme simple qui, lorsqu'il est exécuté, génère volontairement plusieurs types d'exceptions courantes :

- ❌ **IllegalArgumentException**
- ❌ **NullPointerException**
- ❌ **ArithmeticException** (division par zéro)
- ❌ **ArrayIndexOutOfBoundsException**
- ❌ **RuntimeException personnalisée**

> 💡 Cela nous permet de vérifier que l'agent capture bien chaque type d'erreur et que le payload envoyé est correctement formaté.

### 🔨 Comment le construire ?

L'application `test-app` est un module Maven qui dépend du module `agent-java`. Pour la construire, il faut lancer la commande Maven depuis la racine du projet `bugtracker-system` :

```bash
# Cette commande va d'abord compiler 'agent-java', puis 'test-app'
mvn clean install
```

Cette commande générera un **"fat JAR"** exécutable nommé `test-app.jar` dans le répertoire `examples/test-app/target/`.

Pour que docker-compose puisse l'utiliser, une étape manuelle de copie est nécessaire après la compilation :

```bash
# Copie le JAR final dans le dossier 'examples'
cp examples/test-app/target/test-app.jar examples/
```

### 🚀 Comment l'utiliser ?

L'utilisation principale de `test-app.jar` se fait via **docker-compose** pour un test d'intégration complet.

Un service dédié, `test-app-with-agent`, est défini dans le fichier `docker-compose.yml`. Ce service est conçu pour lancer `test-app.jar` avec l'agent déjà attaché.

**Pour lancer le test :**

1. **🐋 Prérequis** : Assurez-vous que l'environnement Docker principal est en cours d'exécution ou lancez-le en même temps

2. **▶️ Exécution** : Exécutez la commande suivante depuis la racine du projet :

```bash
# Utiliser --profile pour ne lancer que le test
docker compose up --profile agent-test
```

ou si votre version de docker-compose ne supporte pas les profils :

```bash
docker compose up test-app-with-agent
```

**🎬 Résultat attendu :**
Le conteneur `test-app-with-agent` va démarrer, exécuter le programme, générer les erreurs, puis s'arrêter. Vous pourrez observer toute la chaîne de traitement dans les logs des autres services (ingestion, traitement).

## 📂 Autres Exemples

Ce dossier contient également d'autres fichiers de test Java (`ComplexErrorTest.java`, etc.) qui ne sont pas intégrés dans des modules Maven pour le moment. 

> 🔄 Ils ont servi lors des premières phases de développement et peuvent être réutilisés ou transformés en applications de test plus spécifiques si le besoin s'en fait sentir.

---

<div align="center">
  <p>🧪 <strong>Testez, cassez, réparez - Le cycle de développement parfait !</strong> 🚀</p>
</div>
# 🐛 BugTracker SDK Java

Un SDK Java puissant et facile à utiliser pour capturer et transmettre automatiquement les erreurs de vos applications vers votre service BugTracker.

## 📋 Table des Matières

- [Fonctionnalités](#-fonctionnalités)
- [Installation](#-installation)
- [Configuration Rapide](#-configuration-rapide)
- [Utilisation](#-utilisation)
- [Exemples](#-exemples)
- [API Reference](#-api-reference)
- [Architecture](#-architecture)
- [Tests](#-tests)
- [Contribution](#-contribution)

## ✨ Fonctionnalités

- 🔥 **Capture automatique** de toutes les exceptions
- 📤 **Transmission HTTP** vers votre service d'ingestion
- 🏷️ **Tags personnalisés** pour catégoriser vos erreurs
- 📊 **Différents niveaux** de logging (DEBUG, INFO, WARNING, ERROR, FATAL)
- 🔄 **Gestion des retry** en cas d'échec réseau
- 🛡️ **Thread-safe** et optimisé pour la production
- 📝 **Logs détaillés** avec stack traces complètes
- ⚡ **Performance optimisée** - n'impacte pas votre application

## 🚀 Installation

### Prérequis

- Java 8 ou supérieur
- Maven 3.6+

### Dépendances Maven

Ajoutez ces dépendances à votre `pom.xml` :

```xml
<dependencies>
    <!-- Sentry pour la capture d'événements -->
    <dependency>
        <groupId>io.sentry</groupId>
        <artifactId>sentry</artifactId>
        <version>7.8.0</version>
    </dependency>
    
    <!-- HTTP Client pour l'envoi -->
    <dependency>
        <groupId>org.apache.httpcomponents.client5</groupId>
        <artifactId>httpclient5</artifactId>
        <version>5.3.1</version>
    </dependency>
    
    <!-- JSON Processing -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.17.0</version>
    </dependency>
</dependencies>
```

### Compilation

```bash
mvn clean compile
```

## ⚡ Configuration Rapide

### 1. Initialisation Basique

```java
import com.bugtracker.sdk.BugTrackerSDK;

public class MonApplication {
    public static void main(String[] args) {
        // Initialiser le SDK avec l'URL de votre service
        BugTrackerSDK.init("http://localhost:8081/api/errors");
        
        // Votre code application...
        
        // Fermer le SDK proprement
        BugTrackerSDK.close();
    }
}
```

### 2. Configuration Avancée

```java
import com.bugtracker.sdk.BugTrackerSDK;
import java.util.Map;

public class ConfigurationAvancee {
    public static void main(String[] args) {
        // Configuration avec options
        BugTrackerSDK.init(
            "http://votre-service.com/api/errors",
            Map.of(
                "environment", "production",
                "version", "1.2.3",
                "server", "web-01"
            )
        );
        
        // Votre application...
    }
}
```

## 🎯 Utilisation

### Capture Automatique d'Exceptions

Le SDK capture **automatiquement** toutes les exceptions non gérées :

```java
public void methodeQuiPeutEchouer() {
    String data = null;
    data.length(); // ← Exception automatiquement capturée et envoyée !
}
```

### Capture Manuelle de Messages

```java
import com.bugtracker.sdk.BugTrackerSDK;

// Message simple
BugTrackerSDK.captureMessage("Utilisateur connecté avec succès");

// Message avec niveau spécifique
BugTrackerSDK.captureMessage("Erreur de connexion à la base", SentryLevel.ERROR);

// Message avec tags
BugTrackerSDK.captureMessage("Transaction échouée", Map.of(
    "user_id", "12345",
    "transaction_type", "payment",
    "amount", "99.99"
));
```

### Capture Manuelle d'Exceptions

```java
try {
    // Code risqué
    processPayment();
} catch (PaymentException e) {
    // Capturer l'exception avec contexte
    BugTrackerSDK.captureException(e, Map.of(
        "payment_method", "credit_card",
        "user_type", "premium"
    ));
}
```

## 📚 Exemples

### Exemple 1 : Application Web

```java
@RestController
public class UserController {
    
    static {
        // Initialiser au démarrage de l'application
        BugTrackerSDK.init("http://monitoring.company.com/api/errors");
    }
    
    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody CreateUserRequest request) {
        try {
            User user = userService.createUser(request);
            
            // Log de succès
            BugTrackerSDK.captureMessage("Nouvel utilisateur créé", Map.of(
                "user_id", user.getId(),
                "email", user.getEmail()
            ));
            
            return ResponseEntity.ok(user);
            
        } catch (ValidationException e) {
            // Les erreurs sont automatiquement capturées
            // Mais on peut ajouter du contexte
            BugTrackerSDK.captureException(e, Map.of(
                "request_email", request.getEmail(),
                "validation_errors", e.getErrors().toString()
            ));
            throw e;
        }
    }
}
```

### Exemple 2 : Application Batch

```java
public class DataProcessingJob {
    
    public static void main(String[] args) {
        BugTrackerSDK.init("http://monitoring.company.com/api/errors");
        
        try {
            BugTrackerSDK.captureMessage("Début du traitement batch", Map.of(
                "job_name", "data_processing",
                "start_time", Instant.now().toString()
            ));
            
            processData();
            
            BugTrackerSDK.captureMessage("Fin du traitement batch");
            
        } catch (Exception e) {
            BugTrackerSDK.captureMessage("Échec du traitement batch", SentryLevel.FATAL);
            // Exception automatiquement capturée
        } finally {
            BugTrackerSDK.close();
        }
    }
}
```

### Exemple 3 : Gestion des Niveaux

```java
public class ExempleNiveaux {
    public static void main(String[] args) {
        BugTrackerSDK.init("http://localhost:8081/api/errors");
        
        // Debug - Informations de développement
        BugTrackerSDK.captureMessage("Cache invalidé", SentryLevel.DEBUG);
        
        // Info - Informations générales
        BugTrackerSDK.captureMessage("Utilisateur connecté", SentryLevel.INFO);
        
        // Warning - Attention requise
        BugTrackerSDK.captureMessage("Limite de taux atteinte", SentryLevel.WARNING);
        
        // Error - Erreur récupérable
        BugTrackerSDK.captureMessage("Échec de connexion DB", SentryLevel.ERROR);
        
        // Fatal - Erreur critique
        BugTrackerSDK.captureMessage("Service indisponible", SentryLevel.FATAL);
    }
}
```

## 📖 API Reference

### Classe `BugTrackerSDK`

#### Méthodes Statiques

| Méthode | Description | Paramètres |
|---------|-------------|------------|
| `init(String endpoint)` | Initialise le SDK avec l'endpoint de base | `endpoint` : URL du service d'ingestion |
| `init(String endpoint, Map<String, String> tags)` | Initialise avec tags par défaut | `endpoint` + `tags` : Tags appliqués à tous les événements |
| `captureMessage(String message)` | Capture un message simple | `message` : Texte du message |
| `captureMessage(String message, SentryLevel level)` | Capture avec niveau spécifique | `message` + `level` : Niveau de gravité |
| `captureMessage(String message, Map<String, String> tags)` | Capture avec tags | `message` + `tags` : Métadonnées personnalisées |
| `captureException(Throwable exception)` | Capture une exception | `exception` : Exception à capturer |
| `captureException(Throwable exception, Map<String, String> tags)` | Capture exception avec tags | `exception` + `tags` |
| `close()` | Ferme le SDK proprement | - |

#### Niveaux de Gravité (`SentryLevel`)

- `DEBUG` : Informations de débogage
- `INFO` : Informations générales
- `WARNING` : Avertissements
- `ERROR` : Erreurs
- `FATAL` : Erreurs critiques

## 🏗️ Architecture

### Composants Internes

```
Application Java
        ↓
BugTrackerSDK (Point d'entrée)
        ↓
BugTrackerClient (Gestion HTTP)
        ↓
Sentry SDK (Capture d'événements)
        ↓
Interception BeforeSend
        ↓
Transformation JSON
        ↓
Envoi HTTP POST
        ↓
Service d'Ingestion BugTracker
```

### Flux d'une Erreur

1. **Exception survient** dans votre application
2. **Sentry SDK** intercepte automatiquement
3. **BeforeSend callback** transforme l'événement
4. **BugTrackerClient** envoie via HTTP POST
5. **Service d'ingestion** reçoit et traite
6. **Confirmation** retournée à l'application

### Format des Données Envoyées

```json
{
  "message": "NullPointerException: Cannot invoke \"String.length()\"",
  "level": "ERROR",
  "hasException": true,
  "stackTrace": "java.lang.NullPointerException: Cannot invoke...",
  "timestamp": "2025-06-03T21:02:03.963164606Z",
  "tags": {
    "environment": "production",
    "version": "1.2.3",
    "custom_tag": "custom_value"
  }
}
```

## 🧪 Tests

### Exécuter les Tests

```bash
# Test complet avec le service local
mvn compile exec:java -Dexec.mainClass="com.bugtracker.sdk.FinalTest"

# Test simple
mvn compile exec:java -Dexec.mainClass="com.bugtracker.sdk.SimpleTest"

# Test avec service externe (httpbin.org)
mvn compile exec:java -Dexec.mainClass="com.bugtracker.sdk.TestWithHttpBin"
```

### Tests Disponibles

| Classe | Description | Usage |
|--------|-------------|-------|
| `FinalTest` | Test complet avec service local | Teste tous les scénarios avec votre service |
| `SimpleTest` | Test basique | Validation rapide du SDK |
| `TestWithHttpBin` | Test avec service externe | Validation sans dépendances locales |
| `SentryApiDebug` | Debug des événements Sentry | Diagnostics avancés |

### Exemple de Sortie de Test

```
🚀 Test Final du BugTracker SDK
=====================================
📋 Initialisation du SDK...
🔧 BugTrackerClient configuré pour: http://localhost:8081/api/errors
🚀 BugTracker SDK initialisé

📤 Test 1: Message simple
✅ Événement envoyé: Hello from BugTracker SDK!

📤 Test 2: Exception
✅ Événement envoyé: NullPointerException: Cannot invoke "String.length()"

🎉 Tests terminés avec succès!
```

## ⚙️ Configuration du Service d'Ingestion

Votre SDK nécessite un service d'ingestion compatible. Voici la configuration minimale :

### Endpoint Requis

- **URL** : `POST /api/errors`
- **Content-Type** : `application/json`
- **Réponse attendue** : JSON avec `status: "received"`

### Exemple de Réponse du Service

```json
{
  "status": "received",
  "eventId": "25a81aec-18f4-4d23-8dcd-0f400626d9df",
  "message": "Event processed successfully",
  "timestamp": "2025-06-03T21:02:03.963164606Z"
}
```

## 🔧 Dépannage

### Problèmes Courants

#### 1. HTTP 404 Not Found
```
❌ Erreur: HTTP 404 - Not Found
```
**Solution** : Vérifiez que votre service d'ingestion tourne et que l'endpoint `/api/errors` existe.

#### 2. Connection Refused
```
❌ Erreur: java.net.ConnectException: Connection refused
```
**Solution** : Vérifiez l'URL et que le service est accessible sur le port spécifié.

#### 3. Événements non reçus
**Vérifications** :
- Le service d'ingestion tourne : `docker ps | grep ingestion`
- Les logs du service : `docker logs bugtracker-system-ingestion-1`
- L'endpoint répond : `curl http://localhost:8081/api/health`

### Mode Debug

Pour activer les logs détaillés :

```java
// Activer les logs Sentry
System.setProperty("sentry.debug", "true");
BugTrackerSDK.init("http://localhost:8081/api/errors");
```

## 🤝 Contribution

### Structure du Projet

```
sdk-java/
├── src/main/java/com/bugtracker/sdk/
│   ├── BugTrackerSDK.java          # API publique
│   ├── BugTrackerClient.java       # Client HTTP
│   ├── FinalTest.java              # Tests complets
│   ├── SimpleTest.java             # Tests basiques
│   └── TestWithHttpBin.java        # Tests externes
├── pom.xml                         # Configuration Maven
└── README.md                       # Cette documentation
```

### Workflow de Développement

1. **Fork** le projet
2. **Créer** une branche feature
3. **Développer** avec tests
4. **Tester** avec `mvn compile exec:java`
5. **Soumettre** une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🎯 Roadmap

- [ ] Support de la configuration via fichier `bugtracker.properties`
- [ ] Retry automatique avec backoff exponentiel
- [ ] Compression des données pour réduire la bande passante
- [ ] Support des environments multiples
- [ ] Métriques de performance intégrées
- [ ] Support des frameworks Spring Boot, Quarkus
- [ ] Client Android/Kotlin

## 📞 Support

- **Documentation** : Ce README
- **Issues** : Utilisez les GitHub Issues
- **Tests** : Exécutez `FinalTest.java` pour diagnostics

---

**Développé avec ❤️ pour simplifier le monitoring d'erreurs Java**
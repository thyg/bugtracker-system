package com.bugtracker.sdk;

import io.sentry.Sentry;
import io.sentry.SentryLevel;

/**
 * SDK BugTracker utilisant l'approche BeforeSend
 * Cette version évite tous les problèmes de transport et factory
 */
public class BugTrackerSDK {

    private static boolean initialized = false;
    private static BugTrackerClient client = null;

    /**
     * Initialise le SDK avec l'endpoint par défaut
     */
    public static void init() {
        init("http://localhost:8081/api/errors");
    }

    /**
     * Initialise le SDK avec un endpoint personnalisé
     */
    public static void init(String endpoint) {
        if (initialized) {
            System.out.println("⚠️ BugTracker SDK déjà initialisé");
            return;
        }

        try {
            // Créer notre client HTTP
            client = new BugTrackerClient(endpoint);

            // Initialiser Sentry avec interception
            Sentry.init(options -> {
                // DSN factice pour que Sentry fonctionne
                options.setDsn("https://example@example.ingest.sentry.io/example");
                
                // Configuration
                options.setEnvironment(System.getenv().getOrDefault("ENVIRONMENT", "development"));
                options.setRelease(System.getenv().getOrDefault("RELEASE", "1.0.0"));
                options.setDebug(Boolean.parseBoolean(System.getenv().getOrDefault("DEBUG", "true")));
                
                // ✅ SOLUTION : Intercepter avec BeforeSend
                options.setBeforeSend((event, hint) -> {
                    // Envoyer vers notre API
                    if (client != null) {
                        client.sendEvent(event);
                        System.out.println("📤 Événement intercepté et envoyé vers BugTracker");
                    }
                    // Retourner null pour empêcher l'envoi vers Sentry
                    return null;
                });
                
                System.out.println("🔧 Interception BeforeSend configurée");
            });

            initialized = true;
            System.out.println("🚀 BugTracker SDK initialisé avec l'endpoint: " + endpoint);
            
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de l'initialisation: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Impossible d'initialiser le BugTracker SDK", e);
        }
    }

    /**
     * Vérifie si le SDK est initialisé
     */
    public static boolean isInitialized() {
        return initialized;
    }

    /**
     * Ferme proprement le SDK
     */
    public static void close() {
        if (initialized) {
            try {
                if (client != null) {
                    client.close();
                }
                Sentry.close();
                initialized = false;
                System.out.println("🔚 BugTracker SDK fermé");
            } catch (Exception e) {
                System.err.println("⚠️ Erreur lors de la fermeture: " + e.getMessage());
            }
        }
    }

    /**
     * Capture une exception
     */
    public static void captureException(Throwable throwable) {
        if (!initialized) {
            System.err.println("⚠️ SDK non initialisé. Appelez BugTrackerSDK.init() d'abord.");
            return;
        }
        Sentry.captureException(throwable);
    }

    /**
     * Capture un message
     */
    public static void captureMessage(String message) {
        captureMessage(message, SentryLevel.INFO);
    }

    /**
     * Capture un message avec niveau
     */
    public static void captureMessage(String message, SentryLevel level) {
        if (!initialized) {
            System.err.println("⚠️ SDK non initialisé. Appelez BugTrackerSDK.init() d'abord.");
            return;
        }
        
        Sentry.withScope(scope -> {
            scope.setLevel(level);
            Sentry.captureMessage(message);
        });
    }
}
package com.bugtracker.agent;

import io.sentry.*;
import io.sentry.protocol.SentryException;
import io.sentry.protocol.SentryTransaction;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.lang.instrument.Instrumentation;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.CompletableFuture;

/**
 * BugTracker Hybrid Agent - Version corrigée pour capturer automatiquement
 */
public class BugTrackerHybridAgent {
    
    private static final String DEFAULT_ENDPOINT = "http://localhost:8081/api/errors";
    private static String bugTrackerEndpoint;
    private static boolean debugMode = false;
    private static CloseableHttpClient httpClient;
    private static ObjectMapper objectMapper;
    
    /**
     * Point d'entrée pour java -javaagent
     */
    public static void premain(String agentArgs, Instrumentation inst) {
        System.out.println("🚀 BugTracker Agent v1.0.0 - Démarrage...");
        
        // Parse des arguments
        parseAgentArguments(agentArgs);
        
        // Initialisation
        initializeComponents();
        
        // Configuration Sentry CORRIGÉE
        configureSentry();
        
        // Hook pour capturer les exceptions non gérées
        setupUncaughtExceptionHandler();
        
        System.out.println("✅ BugTracker Agent initialisé avec succès!");
        System.out.println("📡 Endpoint: " + bugTrackerEndpoint);
        System.out.println("🔍 Debug: " + debugMode);
    }
    
    /**
     * Parse les arguments de l'agent
     */
    private static void parseAgentArguments(String agentArgs) {
        bugTrackerEndpoint = System.getProperty("bugtracker.endpoint", 
                            System.getenv("BUGTRACKER_ENDPOINT"));
        
        if (bugTrackerEndpoint == null && agentArgs != null && !agentArgs.trim().isEmpty()) {
            bugTrackerEndpoint = agentArgs.trim();
        }
        
        if (bugTrackerEndpoint == null) {
            bugTrackerEndpoint = DEFAULT_ENDPOINT;
        }
        
        debugMode = "true".equalsIgnoreCase(
                    System.getProperty("bugtracker.debug", 
                    System.getenv("BUGTRACKER_DEBUG")));
    }
    
    /**
     * Initialise les composants de base
     */
    private static void initializeComponents() {
        httpClient = HttpClients.createDefault();
        
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        
        // Ajouter shutdown hook
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            try {
                if (httpClient != null) {
                    httpClient.close();
                }
                Sentry.close();
                System.out.println("🛑 BugTracker Agent arrêté proprement");
            } catch (Exception e) {
                System.err.println("❌ Erreur lors de l'arrêt de l'agent: " + e.getMessage());
            }
        }));
    }
    
    /**
     * CORRECTION: Configure Sentry avec un DSN valide pour capturer les erreurs
     */
    private static void configureSentry() {
        try {
            Sentry.init(options -> {
                // CORRECTION: Utiliser un DSN bidon mais valide pour activer Sentry
                options.setDsn("https://public@localhost/1");
                
                // Configurer l'environnement
                options.setEnvironment("bugtracker-agent");
                options.setRelease("1.0.0");
                
                // Activer la capture automatique
                options.setAttachThreads(true);
                options.setAttachStacktrace(true);
                options.setEnableUncaughtExceptionHandler(true);
                
                // IMPORTANT: Désactiver l'envoi réel vers Sentry
                options.setBeforeSend((event, hint) -> {
                    // Traiter l'événement de façon asynchrone
                    CompletableFuture.runAsync(() -> sendToBugTracker(event));
                    
                    // Retourner null pour empêcher l'envoi vers Sentry
                    return null;
                });
                
                if (debugMode) {
                    options.setDebug(true);
                    System.out.println("🔍 Sentry debug activé");
                }
            });
            
            // Configurer le scope global
            Sentry.configureScope(scope -> {
                scope.setTag("agent", "bugtracker-hybrid");
                scope.setTag("version", "1.0.0");
                scope.setExtra("endpoint", bugTrackerEndpoint);
            });
            
        } catch (Exception e) {
            System.err.println("❌ Erreur configuration Sentry: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    /**
     * NOUVEAU: Hook pour capturer les exceptions non gérées du thread principal
     */
    private static void setupUncaughtExceptionHandler() {
        Thread.setDefaultUncaughtExceptionHandler((thread, exception) -> {
            if (debugMode) {
                System.out.println("🔥 Exception non gérée capturée: " + exception.getMessage());
            }
            
            // Envoyer via Sentry (qui sera redirigé vers BugTracker)
            Sentry.captureException(exception);
            
            // Attendre un peu pour que l'envoi se fasse
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
    }
    
    /**
     * NOUVEAU: Méthode publique pour capturer manuellement les exceptions
     */
    public static void captureException(Throwable throwable) {
        if (debugMode) {
            System.out.println("🎯 Capture manuelle d'exception: " + throwable.getMessage());
        }
        Sentry.captureException(throwable);
    }
    
    /**
     * Envoie l'événement vers BugTracker
     */
    private static void sendToBugTracker(SentryEvent event) {
        try {
            // Convertir l'événement Sentry en format BugTracker
            Map<String, Object> bugTrackerEvent = convertSentryEvent(event);
            
            // Sérialiser en JSON
            String jsonPayload = objectMapper.writeValueAsString(bugTrackerEvent);
            
            if (debugMode) {
                System.out.println("📤 Envoi vers BugTracker: " + jsonPayload);
            }
            
            // Envoyer via HTTP
            HttpPost post = new HttpPost(bugTrackerEndpoint);
            post.setEntity(new StringEntity(jsonPayload, "UTF-8"));
            post.setHeader("Content-Type", "application/json");
            post.setHeader("User-Agent", "BugTracker-Agent/1.0.0");
            
            try (CloseableHttpResponse response = httpClient.execute(post)) {
                int statusCode = response.getStatusLine().getStatusCode();
                
                if (statusCode >= 200 && statusCode < 300) {
                    if (debugMode) {
                        System.out.println("✅ Erreur envoyée avec succès à BugTracker (HTTP " + statusCode + ")");
                    }
                } else {
                    System.err.println("❌ Erreur HTTP " + statusCode + " lors de l'envoi vers BugTracker");
                }
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de l'envoi vers BugTracker: " + e.getMessage());
            if (debugMode) {
                e.printStackTrace();
            }
        }
    }
    
    /**
     * Convertit un événement Sentry en format BugTracker
     */
    private static Map<String, Object> convertSentryEvent(SentryEvent event) {
        Map<String, Object> bugTrackerEvent = new HashMap<>();
        
        // Informations de base
        bugTrackerEvent.put("timestamp", Instant.now().toString());
        bugTrackerEvent.put("level", event.getLevel() != null ? event.getLevel().toString() : "ERROR");
        bugTrackerEvent.put("message", event.getMessage() != null ? event.getMessage().getFormatted() : "Unknown error");
        bugTrackerEvent.put("platform", "java");
        bugTrackerEvent.put("agent", "bugtracker-hybrid/1.0.0");
        
        // Exception principale
        if (event.getThrowable() != null) {
            bugTrackerEvent.put("exception", formatException(event.getThrowable()));
        } else if (event.getExceptions() != null && !event.getExceptions().isEmpty()) {
            SentryException sentryException = event.getExceptions().get(0);
            Map<String, Object> exception = new HashMap<>();
            exception.put("type", sentryException.getType());
            exception.put("value", sentryException.getValue());
            
            if (sentryException.getStacktrace() != null && 
                sentryException.getStacktrace().getFrames() != null) {
                exception.put("stacktrace", formatStacktrace(sentryException.getStacktrace().getFrames()));
            }
            
            bugTrackerEvent.put("exception", exception);
        }
        
        // Contexte
        Map<String, Object> extraData = new HashMap<>();
        if (event.getEnvironment() != null) {
            extraData.put("environment", event.getEnvironment());
        }
        if (event.getRelease() != null) {
            extraData.put("release", event.getRelease());
        }
        if (!extraData.isEmpty()) {
            bugTrackerEvent.put("extra", extraData);
        }
        
        return bugTrackerEvent;
    }
    
    /**
     * Formate une exception Java
     */
    private static Map<String, Object> formatException(Throwable throwable) {
        Map<String, Object> exception = new HashMap<>();
        exception.put("type", throwable.getClass().getSimpleName());
        exception.put("value", throwable.getMessage());
        
        // Stack trace
        StackTraceElement[] stackTrace = throwable.getStackTrace();
        if (stackTrace != null) {
            List<Map<String, Object>> frames = new ArrayList<>();
            for (StackTraceElement element : stackTrace) {
                Map<String, Object> frame = new HashMap<>();
                frame.put("filename", element.getFileName());
                frame.put("function", element.getMethodName());
                frame.put("lineno", element.getLineNumber());
                frame.put("module", element.getClassName());
                frames.add(frame);
            }
            exception.put("stacktrace", frames);
        }
        
        return exception;
    }
    
    /**
     * Formate une stack trace Sentry
     */
    private static List<Map<String, Object>> formatStacktrace(List<io.sentry.protocol.SentryStackFrame> frames) {
        List<Map<String, Object>> stackTrace = new ArrayList<>();
        
        for (io.sentry.protocol.SentryStackFrame frame : frames) {
            Map<String, Object> stackFrame = new HashMap<>();
            if (frame.getFilename() != null) stackFrame.put("filename", frame.getFilename());
            if (frame.getFunction() != null) stackFrame.put("function", frame.getFunction());
            if (frame.getLineno() != null) stackFrame.put("lineno", frame.getLineno());
            if (frame.getModule() != null) stackFrame.put("module", frame.getModule());
            stackTrace.add(stackFrame);
        }
        
        return stackTrace;
    }
}
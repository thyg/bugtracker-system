package com.bugtracker.sdk;

import io.sentry.SentryEvent;
import io.sentry.SentryLevel;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.concurrent.CompletableFuture;

/**
 * Client HTTP pour envoyer les événements à l'API BugTracker
 */
public class BugTrackerClient {
    
    private static final ObjectMapper MAPPER = new ObjectMapper();
    private final HttpClient httpClient;
    private final URI endpoint;

    public BugTrackerClient(String endpointUrl) {
        this.endpoint = URI.create(endpointUrl);
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
                
        System.out.println("🔧 BugTrackerClient configuré pour: " + endpointUrl);
    }

    /**
     * Envoie un événement Sentry vers l'API BugTracker de façon asynchrone
     */
    public void sendEvent(SentryEvent event) {
        CompletableFuture.runAsync(() -> {
            try {
                // Convertir l'événement en JSON
                ObjectNode json = convertToJson(event);
                
                // Envoyer via HTTP
                sendHttpRequest(json);
                
                String message = extractMessage(event);
                System.out.println("✅ Événement envoyé: " + message);
                
            } catch (Exception e) {
                System.err.println("❌ Erreur lors de l'envoi: " + e.getMessage());
                if (Boolean.parseBoolean(System.getenv().getOrDefault("DEBUG", "true"))) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Convertit un SentryEvent en JSON pour l'API BugTracker
     */
    private ObjectNode convertToJson(SentryEvent event) {
        ObjectNode node = MAPPER.createObjectNode();
        
        // Message principal
        String message = extractMessage(event);
        node.put("message", message);
        
        // Timestamp
        if (event.getTimestamp() != null) {
            node.put("timestamp", event.getTimestamp().toString());
        } else {
            node.put("timestamp", java.time.Instant.now().toString());
        }
        
        // Niveau de sévérité
        SentryLevel level = event.getLevel();
        node.put("level", level != null ? level.name() : "INFO");

        // Stack trace (si disponible)
        if (event.getThrowable() != null) {
            node.put("stackTrace", getStackTrace(event.getThrowable()));
            node.put("hasException", true);
        } else {
            node.put("hasException", false);
        }

        // Tags et métadonnées
        ObjectNode tags = node.putObject("tags");
        if (event.getTags() != null && !event.getTags().isEmpty()) {
            event.getTags().forEach(tags::put);
        }

        // Informations d'environnement
        if (event.getEnvironment() != null) {
            tags.put("environment", event.getEnvironment());
        }

        // Version/Release
        if (event.getRelease() != null) {
            tags.put("release", event.getRelease());
        }
        
        // Métadonnées du SDK
        tags.put("source", "bugtracker-sdk-java");
        tags.put("sdk_version", "1.0.0");
        tags.put("timestamp_received", java.time.Instant.now().toString());

        return node;
    }

    /**
     * Extrait le message principal de l'événement
     */
    private String extractMessage(SentryEvent event) {
        // Priorité 1: Message formatté
        if (event.getMessage() != null && event.getMessage().getFormatted() != null) {
            return event.getMessage().getFormatted();
        }
        
        // Priorité 2: Exception avec message
        if (event.getThrowable() != null) {
            Throwable throwable = event.getThrowable();
            String exceptionName = throwable.getClass().getSimpleName();
            String exceptionMessage = throwable.getMessage();
            
            if (exceptionMessage != null && !exceptionMessage.trim().isEmpty()) {
                return exceptionName + ": " + exceptionMessage;
            } else {
                return exceptionName;
            }
        }
        
        // Priorité 3: Message simple
        if (event.getMessage() != null && event.getMessage().getMessage() != null) {
            return event.getMessage().getMessage();
        }
        
        // Fallback
        return "Unknown error";
    }

    /**
     * Convertit une exception en stack trace string complète
     */
    private String getStackTrace(Throwable throwable) {
        StringBuilder sb = new StringBuilder();
        
        // Nom et message de l'exception principale
        sb.append(throwable.getClass().getName());
        if (throwable.getMessage() != null) {
            sb.append(": ").append(throwable.getMessage());
        }
        
        // Stack trace de l'exception principale
        for (StackTraceElement element : throwable.getStackTrace()) {
            sb.append("\n\tat ").append(element.toString());
        }
        
        // Exceptions causées (chaîne des causes)
        Throwable cause = throwable.getCause();
        while (cause != null) {
            sb.append("\nCaused by: ").append(cause.getClass().getName());
            if (cause.getMessage() != null) {
                sb.append(": ").append(cause.getMessage());
            }
            
            for (StackTraceElement element : cause.getStackTrace()) {
                sb.append("\n\tat ").append(element.toString());
            }
            
            cause = cause.getCause();
        }
        
        return sb.toString();
    }

    /**
     * Envoie la requête HTTP vers l'API BugTracker
     */
    private void sendHttpRequest(ObjectNode json) throws IOException, InterruptedException {
        byte[] body = MAPPER.writeValueAsBytes(json);

        HttpRequest request = HttpRequest.newBuilder(endpoint)
                .header("Content-Type", "application/json")
                .header("User-Agent", "BugTracker-SDK-Java/1.0.0")
                .timeout(Duration.ofSeconds(30))
                .POST(HttpRequest.BodyPublishers.ofByteArray(body))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            String errorMsg = String.format("HTTP %d: %s", response.statusCode(), response.body());
            throw new IOException(errorMsg);
        }
        
        // Debug: afficher la réponse si mode debug
        if (Boolean.parseBoolean(System.getenv().getOrDefault("DEBUG", "true"))) {
            System.out.println("📡 Réponse HTTP " + response.statusCode() + ": " + response.body());
        }
    }

    /**
     * Ferme le client proprement
     */
    public void close() {
        System.out.println("🔚 BugTrackerClient fermé");
        // Le HttpClient se ferme automatiquement
    }
}
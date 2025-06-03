package com.bugtracker.service_ingestion.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.fasterxml.jackson.databind.JsonNode;
import java.time.Instant;
import java.util.Map;
import java.util.HashMap;

/**
 * Controller pour recevoir les erreurs du SDK BugTracker
 */
@RestController
@RequestMapping("/api")
public class IngestionController {

    /**
     * Endpoint pour recevoir les erreurs/événements
     */
    @PostMapping("/errors")
    public ResponseEntity<Map<String, Object>> receiveError(@RequestBody JsonNode event) {
        try {
            // Log de l'événement reçu
            System.out.println("🔥 ERREUR REÇUE:");
            System.out.println("Timestamp: " + Instant.now());
            System.out.println("Event: " + event.toPrettyString());
            System.out.println("========================================");
            
            // Extraire les informations principales
            String message = event.has("message") ? event.get("message").asText() : "No message";
            String level = event.has("level") ? event.get("level").asText() : "INFO";
            boolean hasException = event.has("hasException") && event.get("hasException").asBoolean();
            
            // Log formaté
            System.out.printf("📋 Message: %s%n", message);
            System.out.printf("📊 Level: %s%n", level);
            System.out.printf("💥 Has Exception: %s%n", hasException);
            
            if (event.has("stackTrace")) {
                System.out.println("📚 Stack Trace:");
                System.out.println(event.get("stackTrace").asText());
            }
            
            if (event.has("tags")) {
                System.out.println("🏷️ Tags:");
                System.out.println(event.get("tags").toPrettyString());
            }
            
            // TODO: Ici vous pourrez ajouter la logique pour:
            // - Sauvegarder en base de données
            // - Envoyer vers un système de monitoring
            // - Déclencher des alertes
            // - Etc.
            
            // Réponse de succès
            Map<String, Object> response = new HashMap<>();
            response.put("status", "received");
            response.put("timestamp", Instant.now().toString());
            response.put("eventId", java.util.UUID.randomUUID().toString());
            response.put("message", "Event processed successfully");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("❌ Erreur lors du traitement de l'événement: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("timestamp", Instant.now().toString());
            errorResponse.put("error", e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    /**
     * Endpoint de santé pour vérifier que le service fonctionne
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", Instant.now().toString());
        response.put("service", "BugTracker Ingestion Service");
        response.put("version", "1.0.0");
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Endpoint pour lister les événements reçus (pour debug)
     */
    @GetMapping("/events/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("service", "BugTracker Ingestion");
        stats.put("endpoints", Map.of(
            "POST /api/errors", "Receive error events",
            "GET /api/health", "Service health check",
            "GET /api/events/stats", "Get service statistics"
        ));
        stats.put("timestamp", Instant.now().toString());
        
        return ResponseEntity.ok(stats);
    }
}
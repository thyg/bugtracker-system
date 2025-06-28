package com.bugtracker.service_ingestion.controller;

import com.bugtracker.service_ingestion.service.ErrorPublishService;
//import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
//import com.fasterxml.jackson.databind.node.ObjectNode;
import com.bugtracker.service_ingestion.model.ErrorEventDTO; 

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;


import com.fasterxml.jackson.core.JsonProcessingException; // <-- AJOUTER CET IMPORT
import com.fasterxml.jackson.databind.ObjectMapper;       // <-- AJOUTER CET IMPORT
import org.slf4j.Logger;                                  // <-- AJOUTER CET IMPORT
import org.slf4j.LoggerFactory; 






/**
 * Controller pour recevoir les erreurs du SDK BugTracker
 * et publier sur Kafka pour le traitement en aval
 */
@RestController
@RequestMapping("/api/errors")
public class ErrorIngestionController {
    //private final ErrorPublishService publisher;
/* 
    public ErrorIngestionController(ErrorPublishService publisher) {
        this.publisher = publisher;
    }
*/

    // AJOUTER CES 3 LIGNES
    private static final Logger logger = LoggerFactory.getLogger(ErrorIngestionController.class);
    private final ObjectMapper objectMapper; // Pour le logging
    private final ErrorPublishService publisher;

    // MODIFIER LE CONSTRUCTEUR
    public ErrorIngestionController(ErrorPublishService publisher, ObjectMapper objectMapper) {
        this.publisher = publisher;
        this.objectMapper = objectMapper;
    }


    /**
     * Endpoint pour recevoir les événements d'erreur
     */
    @PostMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void receiveError(@Validated @RequestBody ErrorEventDTO event) {
        // Horodatage serveur
        try {
            // AJOUTER CETTE LIGNE DE LOG CRUCIALE
            logger.info("DTO reçu et mappé : {}", objectMapper.writeValueAsString(event));
        } catch (JsonProcessingException e) {
            logger.error("Erreur de sérialisation du DTO pour le log", e);
        }

         event.setReceivedAt(Instant.now().toString());
        // Publication dans Kafka
        publisher.publish(event);
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
     * Endpoint pour lister les routes exposées (debug)
     */
   /*  @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> stats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("service", "BugTracker Ingestion");
        stats.put("endpoints", Map.of(
            "POST /api/errors", "Publie l'événement dans Kafka",
            "GET  /api/errors/health", "Health check",
            "GET  /api/errors/stats",  "Liste des endpoints"
        ));
        stats.put("timestamp", Instant.now().toString());
        return ResponseEntity.ok(stats);
    }*/

 @GetMapping("/ping")
    public String ping() {
        return "pong";
    }

}

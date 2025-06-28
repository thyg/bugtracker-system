// src/main/java/com/bugtracker/service_traitement/service/BugConsumerService.java
package com.bugtracker.service_traitement.service;

import com.bugtracker.service_traitement.model.BugReportEntity;
import com.bugtracker.service_traitement.repository.BugReportRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;

@Service
public class BugConsumerService {

    private static final Logger logger = LoggerFactory.getLogger(BugConsumerService.class);
    private final BugReportRepository bugReportRepository;
    private final ObjectMapper objectMapper;

    public BugConsumerService(BugReportRepository bugReportRepository, ObjectMapper objectMapper) {
        this.bugReportRepository = bugReportRepository;
        this.objectMapper = objectMapper;
    }

    @KafkaListener(topics = "${bugtracker.kafka-topic}", groupId = "bug-processors")
    public void consumeBugEvent(String message) {
        logger.info("Message reçu de Kafka -> {}", message);
        try {
            // Désérialiser le JSON en une Map générique
            Map<String, Object> eventData = objectMapper.readValue(message, new TypeReference<>() {});

            // 1. On crée l'objet bug d'abord
            BugReportEntity bug = new BugReportEntity();

            // 2. On mappe les champs simples
            bug.setProjectKey((String) eventData.get("projectKey"));
            bug.setLevel((String) eventData.get("level"));
            
            // 3. On gère la logique pour le champ 'message'
            Map<String, Object> exceptionData = (Map<String, Object>) eventData.get("exception");
            if (exceptionData != null && exceptionData.get("value") != null) {
                // On prend la 'value' de l'exception comme message principal
                bug.setMessage(exceptionData.get("value").toString());
            } else {
                // Si pas de message d'exception, on prend le message de l'événement Sentry (qui peut être null)
                bug.setMessage((String) eventData.get("message"));
            }

            // 4. On mappe le reste des champs
            bug.setException(exceptionData); // On peut réutiliser la variable
            bug.setContexts((Map<String, Object>) eventData.get("contexts"));
            bug.setTags((Map<String, Object>) eventData.get("tags"));
            
            // Gérer les timestamps
            bug.setEventTimestamp(Instant.parse((String) eventData.get("timestamp")));
            bug.setReceivedAt(Instant.parse((String) eventData.get("receivedAt")));

            // 5. Sauvegarder en base
            bugReportRepository.save(bug);
            logger.info("Bug du projet {} sauvegardé en base de données avec l'ID: {}", bug.getProjectKey(), bug.getId());

        } catch (Exception e) {
            logger.error("Erreur lors du traitement du message Kafka", e);
        }
    }
}
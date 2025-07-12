package com.bugtracker.service_traitement.service;

import com.bugtracker.service_traitement.model.BugReportEntity;
import com.bugtracker.service_traitement.repository.BugReportRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

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

        Mono.fromCallable(() -> {
            Map<String, Object> eventData = objectMapper.readValue(message, new TypeReference<>() {});
            return convertToEntity(eventData);
        })
        .flatMap(bugReportRepository::save)
        .subscribe(
            savedBug -> logger.info("Bug du projet {} sauvegardé en BDD avec l'ID: {}", savedBug.getProjectKey(), savedBug.getId()),
            error -> logger.error("Échec du traitement du message Kafka", error)
        );
    }

    private BugReportEntity convertToEntity(Map<String, Object> eventData) throws JsonProcessingException {
        BugReportEntity bug = new BugReportEntity();

        bug.setProjectKey((String) eventData.get("projectKey"));
        bug.setLevel((String) eventData.get("level"));
        bug.setEventTimestamp(Instant.parse((String) eventData.get("timestamp")));
        bug.setReceivedAt(Instant.parse((String) eventData.get("receivedAt")));

        Map<String, Object> exceptionData = (Map<String, Object>) eventData.get("exception");
        if (exceptionData != null && exceptionData.get("value") != null) {
            bug.setMessage(exceptionData.get("value").toString());
        } else if (eventData.get("message") != null) {
            bug.setMessage(eventData.get("message").toString());
        }

        // On convertit les Map en chaînes de caractères JSON
        bug.setException(convertObjectToJsonString(eventData.get("exception")));
        bug.setContexts(convertObjectToJsonString(eventData.get("contexts")));
        bug.setTags(convertObjectToJsonString(eventData.get("tags")));

        return bug;
    }

    private String convertObjectToJsonString(Object data) throws JsonProcessingException {
        if (data == null) {
            return null;
        }
        return objectMapper.writeValueAsString(data);
    }
}
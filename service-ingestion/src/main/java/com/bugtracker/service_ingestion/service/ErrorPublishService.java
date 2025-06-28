package com.bugtracker.service_ingestion.service;

// N'oubliez pas l'import pour le DTO !
import com.bugtracker.service_ingestion.model.ErrorEventDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class ErrorPublishService {

    private static final Logger logger = LoggerFactory.getLogger(ErrorPublishService.class);
    
    // Le type du KafkaTemplate doit correspondre exactement à celui du Bean dans KafkaProducerConfig
    private final KafkaTemplate<String, Object> kafkaTemplate; 
    private final String topic;

    public ErrorPublishService(KafkaTemplate<String, Object> kafkaTemplate,
                           @Value("${bugtracker.kafka-topic}") String topic) {
        this.kafkaTemplate = kafkaTemplate;
        this.topic = topic;
    }

    // La méthode de publication attend maintenant un DTO spécifique, pas un Object générique
    public void publish(ErrorEventDTO event) {
        if (event == null || event.getProjectKey() == null) {
            logger.warn("Tentative de publication d'un événement nul ou sans clé de projet. Message ignoré.");
            return;
        }

        String key = event.getProjectKey();
        logger.info("Publication de l'événement pour le projet {} vers le topic {}", key, topic);
        
        try {
            // -- LA CORRECTION EST ICI --
            // On fournit explicitement la clé du message Kafka.
            kafkaTemplate.send(topic, key, event);
        } catch (Exception e) {
            logger.error("Erreur lors de l'envoi du message à Kafka pour le projet " + key, e);
        }
    }
}
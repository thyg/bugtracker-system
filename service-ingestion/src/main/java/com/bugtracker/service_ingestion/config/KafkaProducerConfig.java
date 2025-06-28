package com.bugtracker.service_ingestion.config;

import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaProducerConfig {

    // On injecte l'adresse des serveurs Kafka depuis application.properties
    @Value(value = "${spring.kafka.bootstrap-servers}")
    private String bootstrapAddress;

    @Bean
    public ProducerFactory<String, Object> producerFactory() {
        // 1. On définit toutes les propriétés de configuration du producteur
        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        
        // C'est la configuration la plus importante : on s'assure que les objets Java (comme votre DTO)
        // sont bien convertis en JSON avant d'être envoyés.
        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        
        // 2. On crée la "factory" avec ces propriétés
        return new DefaultKafkaProducerFactory<>(configProps);
    }

    @Bean
    public KafkaTemplate<String, Object> kafkaTemplate() {
        // 3. On crée le KafkaTemplate en utilisant la factory qu'on vient de définir juste au-dessus.
        // Spring va automatiquement appeler la méthode producerFactory() pour obtenir la dépendance.
        return new KafkaTemplate<>(producerFactory());
    }
}
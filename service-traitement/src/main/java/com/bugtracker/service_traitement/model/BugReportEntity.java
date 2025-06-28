// src/main/java/com/bugtracker/service_traitement/model/BugReportEntity.java
package com.bugtracker.service_traitement.model;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import org.hibernate.annotations.Type;

import lombok.Getter;   // <-- Importez
import lombok.Setter;   // <-- Importez

import java.time.Instant;
import java.util.Map;


@Getter // <-- AJOUTEZ CETTE ANNOTATION
@Setter // <-- AJOUTEZ CETTE ANNOTATION
@Entity
@Table(name = "bugs") // Nom de la table dans PostgreSQL
public class BugReportEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String projectKey;

    @Column(nullable = false)
    private String level;

    private String message;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> exception;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> contexts;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> tags;
    
    private Instant eventTimestamp;

    @Column(nullable = false)
    private Instant receivedAt;

    // Getters et Setters (générez-les ou utilisez Lombok)
    // ...
}
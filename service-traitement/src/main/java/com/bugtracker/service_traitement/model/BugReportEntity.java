/*package com.bugtracker.service_traitement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
//import io.r2dbc.postgresql.codec.Json;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Table("bugs") // Annotation Spring Data R2DBC pour le nom de la table.
public class BugReportEntity {

    @Id // Annotation Spring Data pour la clé primaire.
    private Long id;

    // Il est recommandé de spécifier explicitement le nom de la colonne.
    @Column("project_key")
    private String projectKey;

    @Column("level")
    private String level;

    @Column("message")
    private String message;

    // --- CHANGEMENT MAJEUR ---
    // On utilise le type Json de R2DBC PostgreSQL pour les colonnes JSONB
    @Column("exception")
    private String exception; // Changé de String vers Json

    @Column("contexts")
    private String contexts; // Changé de String vers Json

    @Column("tags")
    private String tags; // Changé de String vers Json
    
    @Column("event_timestamp")
    private Instant eventTimestamp;

    @Column("received_at")
    private Instant receivedAt;

    // Plus besoin d'écrire les getters/setters manuellement grâce à Lombok.
}*/

package com.bugtracker.service_traitement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import lombok.Data; // Utilise @Data pour générer getters, setters, toString, etc.

import java.time.Instant;

@Data // Raccourci Lombok pour @Getter, @Setter, @ToString, @EqualsAndHashCode
@Table("bugs")
public class BugReportEntity {

    @Id
    private Long id;

    private String projectKey;
    private String level;
    private String message;

    // On mappe les colonnes JSONB en tant que simples String en Java
    private String exception;
    private String contexts;
    private String tags;
    
    private Instant eventTimestamp;
    private Instant receivedAt;
}
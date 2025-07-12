package com.bugtracker.service_traitement.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.reactive.config.WebFluxConfigurer;

@Configuration
@EnableWebFlux // Active la configuration personnalisée de WebFlux
public class WebConfig implements WebFluxConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        corsRegistry.addMapping("/api/**") // Autorise pour toutes les routes qui commencent par /api/
                .allowedOrigins("http://localhost:3000") // L'adresse de votre frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Méthodes autorisées
                .allowedHeaders("*") // Tous les en-têtes sont autorisés
                .allowCredentials(true) // Autorise les cookies et l'authentification
                .maxAge(3600); // Durée de mise en cache de la pré-vérification CORS
    }
}
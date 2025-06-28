package com.bugtracker.service_ingestion.model;

//import jakarta.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import java.util.Map;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ErrorEventDTO {

    @NotBlank(message = "La clé de projet (projectKey) est obligatoire.")
    private String projectKey;

    private String timestamp;
    private String level;
    private Map<String,Object> exception;
    private Map<String,Object> contexts;
    private Map<String,Object> tags;
    private Map<String,Object> extra;
    private Map<String,Object> user;

    // AJOUTEZ CE NOUVEAU CHAMP
    private String receivedAt;
    private java.util.List<Map<String, Object>> breadcrumbs;
    
    // Getters & Setters
    // (Générez les getters/setters pour tous les champs, y compris les nouveaux)

    public String getProjectKey() { return projectKey; }
    public void setProjectKey(String projectKey) { this.projectKey = projectKey; }

    // ... autres getters/setters ...
    
    public String getReceivedAt() { return receivedAt; }
    public void setReceivedAt(String receivedAt) { this.receivedAt = receivedAt; }


    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public Map<String, Object> getException() { return exception; }
    public void setException(Map<String, Object> exception) { this.exception = exception; }

    public Map<String, Object> getContexts() { return contexts; }
    public void setContexts(Map<String, Object> contexts) { this.contexts = contexts; }

    public Map<String, Object> getTags() { return tags; }
    public void setTags(Map<String, Object> tags) { this.tags = tags; }

    public Map<String, Object> getExtra() { return extra; }
    public void setExtra(Map<String, Object> extra) { this.extra = extra; }

    public Map<String, Object> getUser() { return user; }
    public void setUser(Map<String, Object> user) { this.user = user; }

    public List<Map<String, Object>> getBreadcrumbs() { return breadcrumbs; }
    public void setBreadcrumbs(List<Map<String, Object>> breadcrumbs) { this.breadcrumbs = breadcrumbs; }

    


}
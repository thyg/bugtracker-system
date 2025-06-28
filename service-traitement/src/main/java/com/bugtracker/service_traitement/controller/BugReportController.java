// src/main/java/com/bugtracker/service_traitement/controller/BugReportController.java
package com.bugtracker.service_traitement.controller;

import com.bugtracker.service_traitement.model.BugReportEntity;
import com.bugtracker.service_traitement.repository.BugReportRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bugs") // Toutes les routes de ce contrôleur commenceront par /api/bugs
public class BugReportController {

    private final BugReportRepository bugReportRepository;

    public BugReportController(BugReportRepository bugReportRepository) {
        this.bugReportRepository = bugReportRepository;
    }

    // Endpoint pour lister tous les bugs
    @GetMapping
    public List<BugReportEntity> getAllBugs() {
        return bugReportRepository.findAll();
    }

    // Endpoint pour obtenir un bug spécifique par son ID
    @GetMapping("/{id}")
    public ResponseEntity<BugReportEntity> getBugById(@PathVariable Long id) {
        return bugReportRepository.findById(id)
                .map(ResponseEntity::ok) // Si trouvé, retourne 200 OK avec le bug
                .orElse(ResponseEntity.notFound().build()); // Sinon, retourne 404 Not Found
    }
}
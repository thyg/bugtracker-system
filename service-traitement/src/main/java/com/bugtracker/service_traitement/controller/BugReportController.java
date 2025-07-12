package com.bugtracker.service_traitement.controller;

import com.bugtracker.service_traitement.model.BugReportEntity;
import com.bugtracker.service_traitement.repository.BugReportRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/bugs")
public class BugReportController {

    private final BugReportRepository bugReportRepository;

    public BugReportController(BugReportRepository bugReportRepository) {
        this.bugReportRepository = bugReportRepository;
    }

    /**
     * Endpoint réactif pour lister tous les bugs.
     * @return Un Flux<BugReportEntity> qui va "streamer" les bugs au client.
     */
    @GetMapping
    public Flux<BugReportEntity> getAllBugs() {
        // La méthode findAll() du repository réactif retourne un Flux.
        // On le retourne directement. WebFlux s'occupe du reste.
        return bugReportRepository.findAll();
    }

    /**
     * Endpoint réactif pour obtenir un bug spécifique par son ID.
     * @param id L'ID du bug à récupérer.
     * @return Un Mono<ResponseEntity<BugReportEntity>>. Le Mono représente une opération asynchrone
     *         qui résultera soit en une réponse 200 OK avec le bug, soit en une réponse 404 Not Found.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<BugReportEntity>> getBugById(@PathVariable Long id) {
        // findById retourne un Mono<BugReportEntity>.
        return bugReportRepository.findById(id)
                // On utilise .map() pour transformer le BugReportEntity (s'il existe) en une ResponseEntity 200 OK.
                .map(bug -> ResponseEntity.ok(bug))
                // S'il n'y a pas d'élément dans le Mono (bug non trouvé), on fournit une valeur par défaut.
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
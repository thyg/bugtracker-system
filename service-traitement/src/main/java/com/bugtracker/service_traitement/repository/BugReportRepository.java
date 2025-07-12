package com.bugtracker.service_traitement.repository;

import com.bugtracker.service_traitement.model.BugReportEntity;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BugReportRepository extends ReactiveCrudRepository<BugReportEntity, Long> {
    // Spring Data R2DBC va automatiquement nous fournir les méthodes réactives :
    // - save(entity) -> retourne Mono<BugReportEntity>
    // - findById(id) -> retourne Mono<BugReportEntity>
    // - findAll()    -> retourne Flux<BugReportEntity>
    // - etc.
}
// src/main/java/com/bugtracker/service_traitement/repository/BugReportRepository.java
package com.bugtracker.service_traitement.repository;

import com.bugtracker.service_traitement.model.BugReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BugReportRepository extends JpaRepository<BugReportEntity, Long> {
    // Spring Data JPA va automatiquement nous fournir les méthodes comme save(), findById(), findAll(), etc.
}
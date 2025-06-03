package com.bugtracker.service_traitement.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
       @GetMapping("/api/test")
    public String ping() {
        return "Traitement OK ✅";
    }
}

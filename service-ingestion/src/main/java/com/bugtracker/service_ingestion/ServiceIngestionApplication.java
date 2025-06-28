package com.bugtracker.service_ingestion;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.bugtracker.service_ingestion")

public class ServiceIngestionApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceIngestionApplication.class, args);
	}

}

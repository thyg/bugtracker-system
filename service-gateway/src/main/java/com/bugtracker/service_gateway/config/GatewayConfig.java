package com.bugtracker.service_gateway.config;

import org.springframework.cloud.gateway.config.HttpClientCustomizer;
import org.springframework.context.annotation.Configuration;
import reactor.netty.http.client.HttpClient;

@Configuration
public class GatewayConfig implements HttpClientCustomizer {
    @Override
    public HttpClient customize(HttpClient httpClient) {
        // On force l'utilisation du résolveur DNS de la JVM, qui est plus robuste.
        return httpClient.resolver(io.netty.resolver.DefaultAddressResolverGroup.INSTANCE);
    }
}
package com.bugtracker.agent;

import io.sentry.Breadcrumb;
import io.sentry.Sentry;
import io.sentry.SentryEvent;
import io.sentry.protocol.Device;
import io.sentry.protocol.OperatingSystem;
import io.sentry.protocol.SentryException;
import io.sentry.protocol.SentryRuntime;
import io.sentry.protocol.SentryStackFrame;
import io.sentry.protocol.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import java.io.IOException;
import java.lang.instrument.Instrumentation;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.CompletableFuture;

/**
 * BugTracker Hybrid Agent - Java Agent utilisant Sentry SDK v8.x
 * Capture automatiquement les erreurs et enrichit l'événement
 */
public class BugTrackerHybridAgent {
    private static final String DEFAULT_ENDPOINT = "http://localhost:8081/api/errors";
    private static String bugTrackerEndpoint;
    private static boolean debugMode = false;
    private static String projectKey;
    private static CloseableHttpClient httpClient;
    private static ObjectMapper objectMapper;

    public static void premain(String agentArgs, Instrumentation inst) {
        System.out.println("🚀 BugTracker Agent v1.0.0 - Démarrage...");
        parseAgentArguments(agentArgs);
        initializeComponents();
        configureSentry();
        setupUncaughtExceptionHandler();
        System.out.println("✅ Agent initialisé! Endpoint: " + bugTrackerEndpoint + " | Debug: " + debugMode);
    }

    private static void parseAgentArguments(String agentArgs) {
        bugTrackerEndpoint = System.getProperty("bugtracker.endpoint",
                System.getenv("BUGTRACKER_ENDPOINT"));
        if (bugTrackerEndpoint == null && agentArgs != null && !agentArgs.isEmpty()) {
            bugTrackerEndpoint = agentArgs.trim();
        }
        if (bugTrackerEndpoint == null) {
            bugTrackerEndpoint = DEFAULT_ENDPOINT;
        }

        // AJOUT : Lecture de la Clé de Projet avec une valeur par défaut
    projectKey = System.getProperty("bugtracker.projectKey", System.getenv("BUGTRACKER_PROJECT_KEY"));

    if (projectKey == null || projectKey.trim().isEmpty()) {
        // La clé n'a PAS été fournie par l'utilisateur. On utilise une clé de développement.
        projectKey = "dev-project-key-01"; // Votre clé de test constante
        System.out.println("⚠️ AVERTISSEMENT: Aucune clé de projet (bugtracker.projectKey) n'a été fournie.");
        System.out.println("   -> Utilisation de la clé de développement par défaut : '" + projectKey + "'");
        System.out.println("   -> Pour une utilisation en production, veuillez fournir une clé de projet valide.");
    } else {
        // La clé a été fournie, on l'affiche pour confirmation (utile en mode debug)
        System.out.println("✅ Clé de projet utilisée : '" + projectKey + "'");
    }





        debugMode = "true".equalsIgnoreCase(
                System.getProperty("bugtracker.debug", System.getenv("BUGTRACKER_DEBUG")));
    }

    private static void initializeComponents() {
        httpClient = HttpClients.createDefault();
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        java.lang.Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            try {
                if (httpClient != null) httpClient.close();
                Sentry.close();
                System.out.println("🛑 Agent arrêté proprement");
            } catch (Exception e) {
                System.err.println("❌ Erreur arrêt agent: " + e.getMessage());
            }
        }));
    }

    private static void configureSentry() {
        Sentry.init(options -> {
            options.setDsn("https://public@localhost/1");
            options.setEnvironment("bugtracker-agent");
            options.setRelease("1.0.0");
            options.setMaxBreadcrumbs(50);
            options.setTracesSampleRate(1.0);
            options.setAttachThreads(true);
            options.setAttachStacktrace(true);
            options.setEnableUncaughtExceptionHandler(true);
            options.setBeforeSend((event, hint) -> {
                CompletableFuture.runAsync(() -> sendToBugTracker(event));
                return null;
            });
            if (debugMode) {
                options.setDebug(true);
                System.out.println("🔍 Sentry debug activé");
            }
        });
        Sentry.configureScope(scope -> {
            scope.setTag("agent", "bugtracker-hybrid");
            scope.setTag("version", "1.0.0");
            scope.setExtra("endpoint", bugTrackerEndpoint);
        });
    }

    private static void setupUncaughtExceptionHandler() {
        Thread.setDefaultUncaughtExceptionHandler((thread, exception) -> {
            if (debugMode) System.out.println("🔥 Exception capturée: " + exception.getMessage());
            Sentry.captureException(exception);
            try { Thread.sleep(500); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        });
    }

    /** API pour capture manuelle */
    public static void captureException(Throwable throwable) {
        if (debugMode) System.out.println("🎯 Capture manuelle: " + throwable.getMessage());
        Sentry.captureException(throwable);
    }

    /**
     * Envoie vers BugTracker en gérant les cas d'indisponibilité
     */
    private static void sendToBugTracker(SentryEvent event) {
        try {
            Map<String, Object> payload = convertSentryEvent(event);
            String json = objectMapper.writeValueAsString(payload);
            if (debugMode) System.out.println("📤 BugTracker payload: " + json);
            HttpPost post = new HttpPost(bugTrackerEndpoint);
            post.setEntity(new StringEntity(json, "UTF-8"));
            post.setHeader("Content-Type", "application/json");
            post.setHeader("User-Agent", "BugTracker-Agent/1.0.0");
            try (CloseableHttpResponse resp = httpClient.execute(post)) {
                int code = resp.getStatusLine().getStatusCode();
                if (code < 200 || code >= 300) {
                    System.err.println("❌ HTTP " + code + " lors de l'envoi");
                }
            }
        } catch (IOException ioe) {
            if (debugMode) {
                System.err.println("⚠️ BugTracker inaccessible: " + ioe.getMessage());
            }
        } catch (Exception e) {
            System.err.println("❌ Erreur envoi BugTracker: " + e.getMessage());
            if (debugMode) e.printStackTrace();
        }
    }

    /** Conversion SentryEvent ➔ Map pour JSON */
    private static Map<String, Object> convertSentryEvent(SentryEvent event) {
        Map<String, Object> btEvent = new HashMap<>();
        // champs de base
        btEvent.put("projectKey", projectKey);
        btEvent.put("timestamp", Instant.now().toString());
        btEvent.put("level", event.getLevel() != null ? event.getLevel().toString() : "ERROR");
        btEvent.put("message", event.getMessage() != null ? event.getMessage().getFormatted() : "Unknown");
        btEvent.put("platform", "java");
        btEvent.put("agent", "bugtracker-hybrid/1.0.0");

        // contexts (OS, runtime, device)
        Map<String, Object> contextsMap = new HashMap<>();
        OperatingSystem os = event.getContexts().getOperatingSystem();
        if (os != null) {
            Map<String, Object> osMap = Map.of(
                "name", os.getName(),
                "version", os.getVersion()
            );
            contextsMap.put("os", osMap);
        }
        SentryRuntime runtimeCtx = event.getContexts().getRuntime();
        if (runtimeCtx != null) {
            Map<String, Object> rtMap = Map.of(
                "name", runtimeCtx.getName(),
                "version", runtimeCtx.getVersion()
            );
            contextsMap.put("runtime", rtMap);
        }
        Device device = event.getContexts().getDevice();
        if (device != null) {
            Map<String, Object> devMap = Map.of(
                "manufacturer", device.getManufacturer(),
                "model", device.getModel()
            );
            contextsMap.put("device", devMap);
        }
        btEvent.put("contexts", contextsMap);

        // extras & tags
        btEvent.put("extra", event.getExtras());
        btEvent.put("tags", event.getTags());

        // user
        User user = event.getUser();
        if (user != null) {
            Map<String, Object> um = new HashMap<>();
            um.put("id", user.getId());
            um.put("username", user.getUsername());
            um.put("email", user.getEmail());
            um.put("ip_address", user.getIpAddress());
            btEvent.put("user", um);
        }

        // breadcrumbs
        List<Breadcrumb> bcs = event.getBreadcrumbs();
        if (bcs != null && !bcs.isEmpty()) {
            List<Map<String, Object>> bcList = new ArrayList<>();
            for (Breadcrumb bc : bcs) {
                Map<String, Object> m = Map.of(
                    "timestamp", bc.getTimestamp(),
                    "type", bc.getType(),
                    "category", bc.getCategory(),
                    "message", bc.getMessage(),
                    "data", bc.getData()
                );
                bcList.add(m);
            }
            btEvent.put("breadcrumbs", bcList);
        }

        // exception
        if (event.getThrowable() != null) {
            btEvent.put("exception", formatException(event.getThrowable()));
        } else if (event.getExceptions() != null && !event.getExceptions().isEmpty()) {
            SentryException se = event.getExceptions().get(0);
            Map<String, Object> exMap = new HashMap<>();
            exMap.put("type", se.getType());
            exMap.put("value", se.getValue());
            if (se.getStacktrace() != null && se.getStacktrace().getFrames() != null) {
                exMap.put("stacktrace", formatStacktrace(se.getStacktrace().getFrames()));
            }
            btEvent.put("exception", exMap);
        }

        return btEvent;
    }

    /** Formate exception Java pour JSON */
    private static Map<String, Object> formatException(Throwable t) {
    Map<String, Object> ex = new HashMap<>();
    ex.put("type", t.getClass().getName()); // Utilisons le nom complet, c'est plus robuste
    
    // On vérifie si le message est null avant de le mettre
    if (t.getMessage() != null) {
        ex.put("value", t.getMessage());
    }

    StackTraceElement[] frames = t.getStackTrace();
    if (frames != null) {
        List<Map<String, Object>> list = new ArrayList<>();
        for (StackTraceElement f : frames) {
            // On utilise un HashMap qui accepte les valeurs null
            Map<String, Object> fm = new HashMap<>();
            fm.put("filename", f.getFileName()); // Peut être null
            fm.put("function", f.getMethodName());
            fm.put("lineno", f.getLineNumber());
            fm.put("module", f.getClassName());
            list.add(fm);
        }
        ex.put("stacktrace", list);
    }
    return ex;
}

    /** Formate stacktrace Sentry */
    private static List<Map<String, Object>> formatStacktrace(List<SentryStackFrame> frames) {
        List<Map<String, Object>> list = new ArrayList<>();
        for (SentryStackFrame f : frames) {
            Map<String, Object> m = new HashMap<>();
            if (f.getFilename() != null) m.put("filename", f.getFilename());
            if (f.getFunction() != null) m.put("function", f.getFunction());
            if (f.getLineno() != null) m.put("lineno", f.getLineno());
            if (f.getModule() != null) m.put("module", f.getModule());
            list.add(m);
        }
        return list;
    }
}

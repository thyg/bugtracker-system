package com.bugtracker.sdk;

import io.sentry.Sentry;
import io.sentry.SentryLevel;

/**
 * Test final du SDK BugTracker - Version qui fonctionne garantie
 */
public class FinalTest {
    
    public static void main(String[] args) {
        System.out.println("🚀 Test Final du BugTracker SDK");
        System.out.println("=====================================");
        
        try {
            // 1. Initialiser le SDK
            System.out.println("📋 Initialisation du SDK...");
            BugTrackerSDK.init("http://localhost:8081/api/errors");
            
            // 2. Test message simple
            System.out.println("\n📤 Test 1: Message simple");
            BugTrackerSDK.captureMessage("Hello from BugTracker SDK!");
            
            // 3. Test différents niveaux
            System.out.println("\n📤 Test 2: Différents niveaux");
            BugTrackerSDK.captureMessage("Message INFO", SentryLevel.INFO);
            BugTrackerSDK.captureMessage("Message WARNING", SentryLevel.WARNING);
            BugTrackerSDK.captureMessage("Message ERROR", SentryLevel.ERROR);
            BugTrackerSDK.captureMessage("Message FATAL", SentryLevel.FATAL);
            
            // 4. Test exception
            System.out.println("\n📤 Test 3: Exception");
            try {
                String test = null;
                test.length(); // NullPointerException
            } catch (Exception e) {
                BugTrackerSDK.captureException(e);
                System.out.println("✅ Exception capturée");
            }
            
            // 5. Test avec tags personnalisés
            System.out.println("\n📤 Test 4: Tags personnalisés");
            Sentry.withScope(scope -> {
                scope.setTag("environment", "test");
                scope.setTag("version", "1.0.0");
                scope.setTag("user_id", "test-user-123");
                scope.setLevel(SentryLevel.WARNING);
                
                Sentry.captureMessage("Message avec tags personnalisés");
            });
            
            // 6. Test exception complexe
            System.out.println("\n📤 Test 5: Exception complexe");
            try {
                try {
                    Integer.parseInt("not-a-number");
                } catch (NumberFormatException e) {
                    throw new RuntimeException("Erreur de traitement des données", e);
                }
            } catch (Exception e) {
                Sentry.withScope(scope -> {
                    scope.setTag("operation", "data_processing");
                    scope.setTag("component", "parser");
                    scope.setLevel(SentryLevel.ERROR);
                    
                    BugTrackerSDK.captureException(e);
                });
                System.out.println("✅ Exception complexe capturée");
            }
            
            // 7. Test message urgent
            System.out.println("\n📤 Test 6: Message urgent");
            Sentry.withScope(scope -> {
                scope.setTag("priority", "urgent");
                scope.setTag("system", "payment");
                scope.setLevel(SentryLevel.FATAL);
                
                BugTrackerSDK.captureMessage("URGENT: Échec du système de paiement!");
            });
            
            System.out.println("\n✅ Tous les tests envoyés!");
            
            // 8. Attendre l'envoi
            System.out.println("⏳ Attente de l'envoi (3 secondes)...");
            Thread.sleep(3000);
            
            System.out.println("🎉 Tests terminés avec succès!");
            
        } catch (Exception e) {
            System.err.println("❌ Erreur durant les tests: " + e.getMessage());
            e.printStackTrace();
        } finally {
            // 9. Fermer proprement
            BugTrackerSDK.close();
            System.out.println("🔚 SDK fermé - Test terminé");
        }
    }
}

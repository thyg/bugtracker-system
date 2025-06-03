package com.bugtracker.sdk;

import io.sentry.Sentry;

/**
 * Test simple du SDK BugTracker
 */
public class SimpleTest {
    
    public static void main(String[] args) {
        System.out.println("🚀 Test du SDK BugTracker");
        
        try {
            // 1. Initialiser le SDK
            BugTrackerSDK.init("http://localhost:8081/api/errors");
            
            // 2. Tester un message simple
            Sentry.captureMessage("Test message depuis le SDK BugTracker");
            System.out.println("✅ Message envoyé avec succès");
            
            // 3. Tester une exception
            try {
                String test = null;
                test.length(); // NullPointerException
            } catch (Exception e) {
                Sentry.captureException(e);
                System.out.println("✅ Exception capturée et envoyée");
            }
            
            // 4. Attendre un peu pour l'envoi
            Thread.sleep(2000);
            
        } catch (Exception e) {
            System.err.println("❌ Erreur lors du test : " + e.getMessage());
            e.printStackTrace();
        } finally {
            // 5. Fermer le SDK
            BugTrackerSDK.close();
            System.out.println("🔚 Test terminé");
        }
    }
}
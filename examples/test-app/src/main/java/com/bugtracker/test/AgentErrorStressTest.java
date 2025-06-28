package com.bugtracker.test;
import com.bugtracker.agent.BugTrackerHybridAgent;

/**
 * Test de stress d'erreurs pour valider l'agent BugTrackerHybridAgent
 * Produit divers types d'exceptions (manuelles et non gérées)
 */
public class AgentErrorStressTest {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("🚀 Démarrage du test de stress d'erreurs...");

        // 1) Capture manuelle d'une exception
        try {
            throw new IllegalArgumentException("Test IllegalArgumentException");
        } catch (Exception e) {
            BugTrackerHybridAgent.captureException(e);
        }

        // 2) NullPointerException non gérée dans un thread
        Thread t1 = new Thread(() -> {
            String s = null;
            s.length(); // NPE
        });
        t1.start(); t1.join();

        // 3) ArithmeticException non gérée dans un thread
        Thread t2 = new Thread(() -> {
            int x = 1 / 0; // division par zéro
        });
        t2.start(); t2.join();

        // 4) ArrayIndexOutOfBoundsException non gérée
        Thread t3 = new Thread(() -> {
            int[] arr = new int[2];
            int y = arr[5]; // hors bornes
        });
        t3.start(); t3.join();

        // 5) RuntimeException non gérée personnalisée
        Thread t4 = new Thread(() -> {
            throw new RuntimeException("Test RuntimeException personnalisée");
        });
        t4.start(); t4.join();

        System.out.println("✅ Test de stress terminé.");
    }
}

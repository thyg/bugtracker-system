public class BugTrackerAgentTestUnhandled {
    public static void main(String[] args) {
        System.out.println("🚀 Test EXCEPTION NON GÉRÉE - BugTracker Agent");
        System.out.println("⏰ Attente 3s pour l'agent...");
        
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        System.out.println("🔥 Lancement d'une exception NON GÉRÉE...");
        System.out.println("⚠️ Cette exception va terminer le programme et être capturée par l'agent");
        
        // Cette exception ne sera PAS capturée = exception non gérée
        throw new RuntimeException("EXCEPTION NON GÉRÉE - Test BugTracker Agent");
    }
}
public class BugTrackerAgentTest {
    
    public static void main(String[] args) {
        System.out.println("🚀 Test de l'agent BugTracker - Démarrage");
        
        try {
            // Test 1: Exception simple
            testSimpleException();
            
            Thread.sleep(2000);
            
            // Test 2: Exception avec cause
            testNestedException();
            
            Thread.sleep(2000);
            
            // Test 3: NullPointerException
            testNullPointerException();
            
            Thread.sleep(2000);
            
            // Test 4: ArrayIndexOutOfBounds
            testArrayException();
            
            System.out.println("✅ Tous les tests ont été exécutés");
            
        } catch (Exception e) {
            System.err.println("❌ Erreur pendant les tests: " + e.getMessage());
        }
        
        // Attendre un peu pour que l'agent traite les erreurs
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        System.out.println("🏁 Fin des tests");
    }
    
    private static void testSimpleException() {
        System.out.println("\n📋 Test 1: Exception simple");
        try {
            throw new RuntimeException("Erreur de test simple");
        } catch (Exception e) {
            System.err.println("Exception capturée: " + e.getMessage());
            // L'agent Sentry devrait capturer cette exception
        }
    }
    
    private static void testNestedException() {
        System.out.println("\n📋 Test 2: Exception imbriquée");
        try {
            try {
                throw new IllegalArgumentException("Cause racine");
            } catch (Exception cause) {
                throw new RuntimeException("Exception wrapper", cause);
            }
        } catch (Exception e) {
            System.err.println("Exception capturée: " + e.getMessage());
        }
    }
    
    private static void testNullPointerException() {
        System.out.println("\n📋 Test 3: NullPointerException");
        try {
            String nullString = null;
            int length = nullString.length(); // NPE volontaire
        } catch (Exception e) {
            System.err.println("Exception capturée: " + e.getMessage());
        }
    }
    
    private static void testArrayException() {
        System.out.println("\n📋 Test 4: ArrayIndexOutOfBoundsException");
        try {
            int[] array = {1, 2, 3};
            int value = array[10]; // Index invalide
        } catch (Exception e) {
            System.err.println("Exception capturée: " + e.getMessage());
        }
    }
}

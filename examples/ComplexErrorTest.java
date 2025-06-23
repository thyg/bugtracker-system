public class ComplexErrorTest {
    
    public static void main(String[] args) {
        System.out.println("🚀 Test d'erreur complexe avec stack trace profonde");
        
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        System.out.println("🔥 Déclenchement d'une erreur complexe...");
        
        // Stack trace avec plusieurs niveaux
        methodA();
    }
    
    public static void methodA() {
        System.out.println("📍 Dans methodA()");
        methodB("parametre1", 42);
    }
    
    public static void methodB(String param, int number) {
        System.out.println("📍 Dans methodB() avec param=" + param + ", number=" + number);
        methodC();
    }
    
    public static void methodC() {
        System.out.println("📍 Dans methodC()");
        
        // Plusieurs types d'erreurs possibles
        String[] array = {"a", "b", "c"};
        
        // Ceci va provoquer une ArrayIndexOutOfBoundsException
        // avec une stack trace de 4 niveaux
        String value = array[10]; // Index inexistant
        
        System.out.println("Cette ligne ne sera jamais atteinte: " + value);
    }
}
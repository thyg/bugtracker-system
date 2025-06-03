package com.bugtracker.sdk;

import io.sentry.SentryOptions;
import java.lang.reflect.Method;

/**
 * Classe pour débugger les méthodes disponibles dans SentryOptions
 */
public class SentryApiDebug {
    
    public static void main(String[] args) {
        System.out.println("=== DEBUG SENTRY OPTIONS ===");
        
        try {
            Class<?> optionsClass = SentryOptions.class;
            System.out.println("SentryOptions trouvé : " + optionsClass.getName());
            
            System.out.println("\nMéthodes contenant 'transport' :");
            Method[] methods = optionsClass.getMethods();
            for (Method method : methods) {
                String methodName = method.getName().toLowerCase();
                if (methodName.contains("transport")) {
                    System.out.println("- " + method.getName() + "(" + 
                        java.util.Arrays.toString(method.getParameterTypes()) + ") : " + 
                        method.getReturnType().getSimpleName());
                }
            }
            
            System.out.println("\nMéthodes contenant 'connection' :");
            for (Method method : methods) {
                String methodName = method.getName().toLowerCase();
                if (methodName.contains("connection")) {
                    System.out.println("- " + method.getName() + "(" + 
                        java.util.Arrays.toString(method.getParameterTypes()) + ") : " + 
                        method.getReturnType().getSimpleName());
                }
            }
            
            System.out.println("\nToutes les méthodes 'set...' :");
            for (Method method : methods) {
                String methodName = method.getName();
                if (methodName.startsWith("set") && method.getParameterCount() == 1) {
                    System.out.println("- " + methodName + "(" + 
                        method.getParameterTypes()[0].getSimpleName() + ")");
                }
            }
            
        } catch (Exception e) {
            System.err.println("Erreur lors du debug : " + e.getMessage());
            e.printStackTrace();
        }
    }
}
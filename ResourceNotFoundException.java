package com.shreegen.ecommerce.exceptions;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String resourceName, String field, Long fieldId) {
        super("%s not found with %s: %d".formatted(resourceName, field, fieldId));
    }

    public ResourceNotFoundException(String resourceName, String field, String fieldValue) {
        super("%s not found with %s: %s".formatted(resourceName, field, fieldValue));
    }

    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}

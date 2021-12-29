package pl.readyTask.exception;

public class ResourceAlreadyExistsException extends RuntimeException {
    public ResourceAlreadyExistsException(String resource, String field, Object value) {
        super(ExceptionsMessages.getResourceAlreadyExistsMessage(resource, field, value));
    }
}

package pl.readyTask.exception;

public class InvalidHeaderException extends RuntimeException {
    public InvalidHeaderException(String headerContent) {
        super(ExceptionsMessages.getInvalidHeaderMessage(headerContent));
    }
}

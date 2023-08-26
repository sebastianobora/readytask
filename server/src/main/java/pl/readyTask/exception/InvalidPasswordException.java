package pl.readyTask.exception;

public class InvalidPasswordException extends RuntimeException {
    public InvalidPasswordException() {
        super(ExceptionsMessages.INVALID_PASSWORD);
    }
}

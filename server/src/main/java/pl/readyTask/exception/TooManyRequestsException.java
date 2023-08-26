package pl.readyTask.exception;

public class TooManyRequestsException extends RuntimeException {
    public TooManyRequestsException() {
        super(ExceptionsMessages.TOO_MANY_REQUESTS);
    }
}

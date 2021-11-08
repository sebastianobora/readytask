package pl.readyTask.exception;

public class RegisterException extends RuntimeException {
    public RegisterException(String field) {
        super(ExceptionsMessages.getRegisterMessage(field));
    }
}

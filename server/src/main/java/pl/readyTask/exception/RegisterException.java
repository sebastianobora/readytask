package pl.readyTask.exception;

public class RegisterException extends RuntimeException{
    public RegisterException(String field){
        super(String.format("User with this %s already exists", field));
    }
}

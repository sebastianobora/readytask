package pl.readyTask.exception.handlers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import pl.readyTask.exception.ExceptionBody;
import pl.readyTask.exception.ExceptionUtils;

import java.util.Objects;

@RestControllerAdvice
public class MethodArgumentNotValidExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionBody> exceptionHandler(MethodArgumentNotValidException e) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        ExceptionBody body = ExceptionUtils.createExceptionBody(status, buildMessage(e));
        return new ResponseEntity<>(body, status);
    }

    private String buildMessage(MethodArgumentNotValidException e) {
        FieldError fieldError = e.getBindingResult().getFieldError();
        if(Objects.nonNull(fieldError) && isFieldErrorMessageEmpty(fieldError)) {
            return fieldError.getDefaultMessage();
        }
        return "Argument not valid.";
    }

    private boolean isFieldErrorMessageEmpty(FieldError fieldError) {
        String message = fieldError.getDefaultMessage();
        return Objects.nonNull(message) && !message.isEmpty();
    }
}

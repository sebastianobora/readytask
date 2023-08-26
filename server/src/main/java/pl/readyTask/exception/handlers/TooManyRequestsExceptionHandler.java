package pl.readyTask.exception.handlers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import pl.readyTask.exception.ExceptionBody;
import pl.readyTask.exception.ExceptionUtils;
import pl.readyTask.exception.TooManyRequestsException;

@RestControllerAdvice
public class TooManyRequestsExceptionHandler {
    @ExceptionHandler(TooManyRequestsException.class)
    public ResponseEntity<Object> validationExceptionHandler(TooManyRequestsException e) {
        HttpStatus status = HttpStatus.TOO_MANY_REQUESTS;
        ExceptionBody body = ExceptionUtils.createExceptionBody(status, e.getMessage());
        return new ResponseEntity<>(body, status);
    }
}

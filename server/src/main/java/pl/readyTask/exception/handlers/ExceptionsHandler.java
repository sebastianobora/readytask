package pl.readyTask.exception.handlers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import pl.readyTask.exception.*;

import static pl.readyTask.exception.ExceptionUtils.createExceptionBody;

@RestControllerAdvice
public class ExceptionsHandler {
    @ExceptionHandler(NoDataFoundException.class)
    public ResponseEntity<Object> noDataFoundExceptionHandler(NoDataFoundException e) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        ExceptionBody body = createExceptionBody(status, e.getMessage());
        return new ResponseEntity<>(body, status);
    }

    @ExceptionHandler(RegisterException.class)
    public ResponseEntity<Object> registerExceptionHandler(RegisterException e) {
        HttpStatus status = HttpStatus.CONFLICT;
        ExceptionBody body = createExceptionBody(status, e.getMessage());
        return new ResponseEntity<>(body, status);
    }

    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<Object> alreadyExistsHandler(ResourceAlreadyExistsException e){
        HttpStatus status = HttpStatus.CONFLICT;
        ExceptionBody body = createExceptionBody(status, e.getMessage());
        return new ResponseEntity<>(body, status);
    }

    @ExceptionHandler(AccessDeniedToActionException.class)
    public ResponseEntity<Object> AccessDeniedToActionExceptionHandler(AccessDeniedToActionException e) {
        HttpStatus status = HttpStatus.FORBIDDEN;
        ExceptionBody body = createExceptionBody(status, e.getMessage());
        return new ResponseEntity<>(body, status);
    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<Object> invalidPasswordExceptionHandler(InvalidPasswordException e) {
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        ExceptionBody body = createExceptionBody(status, e.getMessage());
        return new ResponseEntity<>(body, status);
    }
}

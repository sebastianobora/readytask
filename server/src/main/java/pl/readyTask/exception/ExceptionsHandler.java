package pl.readyTask.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.ZoneId;
import java.time.ZonedDateTime;

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

    @ExceptionHandler(InvalidHeaderException.class)
    public ResponseEntity<Object> invalidHeaderExceptionHandler(InvalidHeaderException e) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        ExceptionBody body = createExceptionBody(status, e.getMessage());
        return new ResponseEntity<>(body, status);
    }

    private ExceptionBody createExceptionBody(HttpStatus status, String message) {
        return new ExceptionBody(status, ZonedDateTime.now(ZoneId.of("Z")), message);
    }
}

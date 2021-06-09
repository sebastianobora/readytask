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
    public ResponseEntity<Object> noDataFoundExceptionHandler(NoDataFoundException e){
        ExceptionBody body = createExceptionBody(HttpStatus.NOT_FOUND, e.getMessage());
        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RegisterException.class)
    public ResponseEntity<Object> registerExceptionHandler(RegisterException e){
        ExceptionBody body = createExceptionBody(HttpStatus.CONFLICT, e.getMessage());
        return new ResponseEntity<>(body, HttpStatus.CONFLICT);
    }

    private ExceptionBody createExceptionBody(HttpStatus status, String message){
        return new ExceptionBody(
                status,
                ZonedDateTime.now(ZoneId.of("Z")),
                message
        );
    }
}

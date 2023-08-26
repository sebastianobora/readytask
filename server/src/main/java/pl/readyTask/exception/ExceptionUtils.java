package pl.readyTask.exception;

import org.springframework.http.HttpStatus;

import java.time.ZoneId;
import java.time.ZonedDateTime;

public class ExceptionUtils {
    public static ExceptionBody createExceptionBody(HttpStatus status, String message) {
        return new ExceptionBody(status, ZonedDateTime.now(ZoneId.of("Z")), message);
    }
}

package pl.readyTask.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

@Getter
public class ExceptionBody {
    private final HttpStatus httpStatus;
    private final ZonedDateTime time;
    private final String error;

    public ExceptionBody(HttpStatus httpStatus, ZonedDateTime time, String error) {
        this.httpStatus = httpStatus;
        this.time = time;
        this.error = error;
    }
}

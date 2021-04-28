package pl.readyTask.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

@Getter
@AllArgsConstructor
public class ExceptionBody {
    private final HttpStatus httpStatus;
    private final ZonedDateTime time;
    private final String error;
}

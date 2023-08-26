package pl.readyTask.exception.handlers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import pl.readyTask.exception.ExceptionBody;
import pl.readyTask.exception.ExceptionsMessages;
import pl.readyTask.security.bruteforcePrevention.accessToken.AccessTokenSecurityService;

import static pl.readyTask.exception.ExceptionUtils.createExceptionBody;

@RequiredArgsConstructor
@RestControllerAdvice
public class AuthenticationExceptionHandler {
    private final AccessTokenSecurityService accessTokenSecurityService;

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Object> authenticationExceptionHandler() {
        accessTokenSecurityService.reportAttempt();
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        ExceptionBody body = createExceptionBody(status, ExceptionsMessages.UNAUTHORIZED);
        return new ResponseEntity<>(body, status);
    }
}

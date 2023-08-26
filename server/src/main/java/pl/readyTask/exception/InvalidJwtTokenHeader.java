package pl.readyTask.exception;

import org.springframework.security.core.AuthenticationException;

public class InvalidJwtTokenHeader extends AuthenticationException {
    public InvalidJwtTokenHeader(String headerContent) {
        super(ExceptionsMessages.getInvalidHeaderMessage(headerContent));
    }
}

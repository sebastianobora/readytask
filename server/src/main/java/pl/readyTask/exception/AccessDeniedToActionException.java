package pl.readyTask.exception;

import pl.readyTask.entity.User;

public class AccessDeniedToActionException extends RuntimeException {
    public AccessDeniedToActionException(User user, String action) {
        super(ExceptionsMessages.getAccessDeniedToActionMessage(user, action));
    }
}

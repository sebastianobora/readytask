package pl.readyTask.exception;

import pl.readyTask.entity.User;

public class AccessDeniedToActionException extends RuntimeException {
    public AccessDeniedToActionException(User user, String action) {
        super(ExceptionsMessages.getAccessDeniedToActionMessage(user, action));
    }

    public AccessDeniedToActionException(String action) {
        super(ExceptionsMessages.getAccessDeniedToActionMessage(action));
    }

    public AccessDeniedToActionException(User user){
        super(ExceptionsMessages.getAccessDeniedToActionMessage(user));
    }
}

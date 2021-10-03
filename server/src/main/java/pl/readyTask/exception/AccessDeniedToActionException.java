package pl.readyTask.exception;

import pl.readyTask.entity.User;

public class AccessDeniedToActionException extends RuntimeException{
    public AccessDeniedToActionException(User user, String action){
        super(String.format("User %s is not allowed to %s", user.getEmail(),  action));
    }
}

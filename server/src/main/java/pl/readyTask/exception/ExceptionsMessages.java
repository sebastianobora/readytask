package pl.readyTask.exception;

import lombok.Getter;
import pl.readyTask.entity.User;

public final class ExceptionsMessages {
    @Getter
    private static final String invalidPasswordMessage = "Invalid password";

    public static String getInvalidHeaderMessage(String headerContent){
        return String.format("Header with %s is invalid!", headerContent);
    }
    public static String getAccessDeniedToActionMessage(User user, String action){
        return String.format("User %s is not allowed to %s", user.getEmail(), action);
    }

    public static String getAccessDeniedToActionMessage(String action){
        return String.format("Access denied to action: %s", action);
    }

    public static String getNoDataFoundMessage(String dataSource, Object value){
        return String.format("Can't find data in: '%s' with value '%s'", dataSource, value);
    }

    public static String getNoDataFoundMessage(String dataSource) {
        return String.format("Can't find data in: '%s'", dataSource);
    }
    public static String getRegisterMessage(String field) {
        return String.format("User with this %s already exists", field);
    }
}

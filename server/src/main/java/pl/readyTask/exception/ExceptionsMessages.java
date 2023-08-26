package pl.readyTask.exception;

import lombok.AccessLevel;
import lombok.Getter;
import pl.readyTask.entity.User;


public final class ExceptionsMessages {
    public static final String INVALID_PASSWORD = "Invalid password";
    public static final String CHANGE_TASK_STATE = "Change task state";
    public static final String NO_PERMISSION_TO_TASK = "User has no permission to task";
    public static final String UNAUTHORIZED = "Unauthorized.";
    public static final String TOO_MANY_REQUESTS = "Too many requests.";
    public static String getInvalidHeaderMessage(String headerContent) {
        return String.format("Header with %s is invalid!", headerContent);
    }

    public static String getAccessDeniedToActionMessage(User user, String action) {
        return String.format("User %s is not allowed to: %s", user.getEmail(), action);
    }

    public static String getAccessDeniedToActionMessage(User user){
        return String.format("User %s is not allowed to the action", user.getEmail());
    }

    public static String getAccessDeniedToActionMessage(String action) {
        return String.format("Access denied to action: %s", action);
    }

    public static String getNoDataFoundMessage(String dataSource, String property, Object value) {
        return String.format("Can't find data in '%s' with property '%s' value equals '%s'", dataSource, property, value);
    }

    public static String getNoDataFoundMessage(String dataSource, Object value) {
        return String.format("Can't find data in '%s' with value '%s'", dataSource, value);
    }

    public static String getNoDataFoundMessage(String dataSource) {
        return String.format("Can't find data in '%s'", dataSource);
    }

    public static String getRegisterMessage(String field) {
        return String.format("User with this %s already exists", field);
    }

    public static String getResourceAlreadyExistsMessage(String resource, String field, Object value){
        return String.format("Resource: %s with field: %s, equals: %s already exists", resource, field, value);
    }
}

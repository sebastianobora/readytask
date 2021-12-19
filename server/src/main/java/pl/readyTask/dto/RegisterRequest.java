package pl.readyTask.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RegisterRequest {
    private final String email;
    private final String username;
    private final String password;
    private final String firstName;
    private final String lastName;
}

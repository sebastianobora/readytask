package pl.readyTask.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class RegisterRequest {
    private final String email;
    private final String username;
    private final String password;
    private final String firstName;
    private final String lastName;
}

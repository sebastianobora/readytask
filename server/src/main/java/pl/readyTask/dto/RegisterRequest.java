package pl.readyTask.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.*;

@Getter
@AllArgsConstructor
public class RegisterRequest {
    @Email
    private final String email;
    @Size(min = 6, message = "Minimal length of 'username' field is 6)")
    @Size(max = 30, message = "Maximal length of 'username' field is 30")
    private final String username;
    @NotBlank(message = "Field 'password' is required.")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()]).{12,}$",
            message = "Password minimal length is 12 and require at least one: number, lowercase, uppercase, special character.")
    private final String password;
    @NotBlank
    private final String firstName;
    @NotBlank
    private final String lastName;
}

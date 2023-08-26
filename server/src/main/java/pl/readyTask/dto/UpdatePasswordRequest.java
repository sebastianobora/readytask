package pl.readyTask.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import pl.readyTask.security.passwordCheck.PasswordChecker;

@Getter
@RequiredArgsConstructor
public class UpdatePasswordRequest implements PasswordChecker {
    private final Long userId;
    private final String newPassword;
    private final String currentPassword;

    @Override
    public String getPasswordToCheck() {
        return currentPassword;
    }
}

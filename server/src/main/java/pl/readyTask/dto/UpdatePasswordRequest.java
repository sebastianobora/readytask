package pl.readyTask.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UpdatePasswordRequest {
    private final Long userId;
    private final String currentPassword;
    private final String newPassword;
}

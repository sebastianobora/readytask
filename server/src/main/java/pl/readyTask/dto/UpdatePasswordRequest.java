package pl.readyTask.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UpdatePasswordRequest {
    private final Long userId;
    private final String currentPassword;
    private final String newPassword;
}

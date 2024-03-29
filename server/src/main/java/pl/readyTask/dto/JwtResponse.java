package pl.readyTask.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class JwtResponse {
    private final String token;
    private final String tokenType;
    private final Long id;
    private final String username;
    private final String email;
    private final List<String> roles;
}

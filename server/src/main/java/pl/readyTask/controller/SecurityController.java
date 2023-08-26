package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.readyTask.dto.JwtResponse;
import pl.readyTask.dto.LoginRequest;
import pl.readyTask.dto.RegisterRequest;
import pl.readyTask.service.SecurityService;

import javax.validation.Valid;

@RestController
@AllArgsConstructor
@RequestMapping("authentication")
@CrossOrigin("http://localhost:4200")
public class SecurityController {
    private final SecurityService securityService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(securityService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<HttpStatus> register(@Valid @RequestBody RegisterRequest request) {
        securityService.register(request);
        return ResponseEntity.ok().build();
    }
}

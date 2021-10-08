package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.readyTask.entity.User;
import pl.readyTask.service.UserService;

import java.util.List;

@RestController
@RequestMapping("users")
@CrossOrigin("http://localhost:4200")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping()
    public ResponseEntity<User> getCurrentUser(Authentication authentication){
        return ResponseEntity.ok(userService.getCurrentUser(authentication));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable("id") Long id){
        return ResponseEntity.ok(userService.getById(id));
    }

    @GetMapping("/by-team-id/{id}")
    public ResponseEntity<List<User>> getByTeamId(@PathVariable("id") Long id){
        return ResponseEntity.ok(userService.getByTeamId(id));
    }

    @GetMapping("/by-username/{username}")
    public ResponseEntity<User> getByUsername(@PathVariable String username){
        return ResponseEntity.ok(userService.getByUsername(username));
    }
}

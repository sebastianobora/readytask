package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.readyTask.entity.User;
import pl.readyTask.service.UserService;

@RestController
@RequestMapping("users")
@CrossOrigin("http://localhost:4200")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable("id") Long id){
        return ResponseEntity.ok(userService.getById(id));
    }
}

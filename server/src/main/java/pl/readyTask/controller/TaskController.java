package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.readyTask.entity.Task;
import pl.readyTask.service.TaskService;

@RestController
@AllArgsConstructor
@RequestMapping("tasks")
@CrossOrigin("http://localhost:4200")
public class TaskController {
    private final TaskService taskService;

    @GetMapping("/{id}")
    public ResponseEntity<Task> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(taskService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Task> add(@RequestBody Task task, Authentication authentication) {
        return ResponseEntity.ok(taskService.add(task, authentication));
    }
}

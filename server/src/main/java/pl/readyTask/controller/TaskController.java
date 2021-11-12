package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.readyTask.entity.Task;
import pl.readyTask.entity.extended.TaskExtended;
import pl.readyTask.service.TaskService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("tasks")
@CrossOrigin("http://localhost:4200")
public class TaskController {
    private final TaskService taskService;

    @GetMapping("/{id}")
    public ResponseEntity<Task> getById(@PathVariable("id") Long id,
                                        @RequestParam(required = false, defaultValue = "false") Boolean extended) {
        Task task = taskService.getById(id);
        return ResponseEntity.ok(extended ? TaskExtended.get(task) : task);
    }

    @GetMapping("/user-assigned-to/{userId}")
    public ResponseEntity<List<Task>> getByUserAssignedToId(@PathVariable Long userId,
                                                            @RequestParam(required = false, defaultValue = "false") Boolean extended) {
        List<Task> tasks = taskService.getByUserAssignedToId(userId);
        return ResponseEntity.ok(extended ? TaskExtended.get(tasks) : tasks);
    }

    @PostMapping
    public ResponseEntity<Task> add(@RequestBody Task task, Authentication authentication) {
        return ResponseEntity.ok(taskService.add(task, authentication));
    }
}

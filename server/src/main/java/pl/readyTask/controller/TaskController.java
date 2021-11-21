package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.readyTask.entity.Task;
import pl.readyTask.entity.extended.TaskExtended;
import pl.readyTask.service.TaskService;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("tasks")
@CrossOrigin("http://localhost:4200")
public class TaskController {
    private final TaskService taskService;

    @GetMapping("/{id}")
    public ResponseEntity<Task> getById(@PathVariable("id") UUID id,
                                        @RequestParam(required = false, defaultValue = "false") Boolean extended) {
        Task task = taskService.getById(id);
        return ResponseEntity.ok(extended ? TaskExtended.get(task) : task);
    }

    @GetMapping("/user-assigned-to/current-logged")
    public ResponseEntity<List<Task>> getByLoggedUserAssignedToTask(
            @RequestParam(required = false, defaultValue = "false") Boolean extended,
            Authentication authentication) {
        List<Task> tasks = taskService.getByUserAssignedToId(authentication);
        return ResponseEntity.ok(extended ? TaskExtended.get(tasks) : tasks);
    }

    @PostMapping
    public ResponseEntity<Task> add(@RequestBody Task task, Authentication authentication) {
        return ResponseEntity.ok(taskService.add(task, authentication));
    }

    @PatchMapping("/state/{taskId}")
    public ResponseEntity<Object> changeTaskState(@PathVariable UUID taskId,
                                                  @RequestBody Task task,
                                                  Authentication authentication){
        this.taskService.changeTaskState(taskId, task.getState(), authentication);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/task/{taskId}")
    public ResponseEntity<Object> delete(@PathVariable UUID taskId, Authentication authentication){
        this.taskService.deleteById(taskId, authentication);
        return ResponseEntity.ok().build();
    }
}

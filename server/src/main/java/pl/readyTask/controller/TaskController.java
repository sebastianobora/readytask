package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.readyTask.entity.Task;
import pl.readyTask.service.TaskService;

@RestController
@AllArgsConstructor
@RequestMapping("tasks")
public class TaskController {
    private final TaskService taskService;

    @GetMapping("/{id}")
    public ResponseEntity<Task> getById(@PathVariable("id") Long id){
        return ResponseEntity.ok(taskService.getById(id));
    }
}

package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.readyTask.entity.TaskComment;
import pl.readyTask.service.TaskCommentService;

@RestController
@AllArgsConstructor
@RequestMapping("task-comments")
public class TaskCommentController {
    private final TaskCommentService taskCommentService;

    @GetMapping("/{id}")
    public ResponseEntity<TaskComment> getById(@PathVariable("id") Long id){
        return ResponseEntity.ok(taskCommentService.getById(id));
    }
}

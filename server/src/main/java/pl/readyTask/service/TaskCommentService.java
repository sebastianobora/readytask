package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.TaskComment;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.TaskCommentRepository;

@Service
@AllArgsConstructor
public class TaskCommentService {
    private final TaskCommentRepository taskCommentRepository;

    public TaskComment getById(Long id){
        return taskCommentRepository.findById(id).orElseThrow(() -> new NoDataFoundException("taskComment", id));
    }
}

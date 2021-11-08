package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.Task;
import pl.readyTask.entity.User;
import pl.readyTask.entity.enumeration.TaskState;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.TaskRepository;

@Service
@AllArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final SecurityService securityService;

    public Task getById(Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new NoDataFoundException("task", id));
    }

    public Task add(Task task, Authentication authentication) {
        User user = this.securityService.getUserByEmailFromAuthentication(authentication);
        task.setAuthorOfTaskById(user.getId());
        task.setState(TaskState.NEW);
        return taskRepository.save(task);
    }
}

package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.Task;
import pl.readyTask.entity.User;
import pl.readyTask.entity.enumeration.TaskState;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.TaskRepository;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final SecurityService securityService;
    private static final Logger logger = LoggerFactory.getLogger(TaskService.class);

    public Task getById(UUID id) {
        return taskRepository.findById(id).orElseThrow(() -> new NoDataFoundException("task", id));
    }

    public Task add(Task task, Authentication authentication) {
        User user = this.securityService.getUserByEmailFromAuthentication(authentication);
        task.setAuthorOfTaskById(user.getId());
        task.setState(TaskState.NEW);
        return taskRepository.save(task);
    }

    public List<Task> getByUserAssignedToId(Long userId) {
        //TODO: implement
        return taskRepository.findAll();
    }
}

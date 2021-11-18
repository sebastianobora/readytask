package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.Task;
import pl.readyTask.entity.User;
import pl.readyTask.entity.enumeration.TaskState;
import pl.readyTask.exception.AccessDeniedToActionException;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.TaskRepository;

import java.util.*;

@Service
@AllArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final SecurityService securityService;
    private static final Logger logger = LoggerFactory.getLogger(TaskService.class);
    private final List<TaskState> statesAllowedToSetForUserAssignedToTask = List.of(TaskState.IN_PROGRESS, TaskState.TO_REVIEW);
    private final List<TaskState> statesAllowedToSetForAuthorOfTask = List.of(TaskState.TO_FIX, TaskState.FINISHED);

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

    public void changeTaskState(UUID taskId, TaskState state, Authentication authentication) {
        User user = this.securityService.getUserByEmailFromAuthentication(authentication);
        Task task = this.taskRepository.findById(taskId)
                .orElseThrow(() -> new NoDataFoundException(Task.class.getName(), taskId));

        boolean isAuthorOfTaskAllowedToChangeState =
                isUserAuthorOfTask(user, task) && statesAllowedToSetForAuthorOfTask.contains(state);
        boolean isUserAssignedToTaskAllowedToChangeState =
                isUserAssignedToTask(user, task) && statesAllowedToSetForUserAssignedToTask.contains(state);

        if(isAuthorOfTaskAllowedToChangeState || isUserAssignedToTaskAllowedToChangeState){
            task.setState(state);
            taskRepository.save(task);
        }else{
            throw new AccessDeniedToActionException(AccessDeniedToActionException.changeTaskStateMessage);
        }
    }

    private boolean isUserAuthorOfTask(User user, Task task){
        return Objects.equals(user.getId(), task.getAuthorOfTask().getId());
    }

    private boolean isUserAssignedToTask(User user, Task task){
        return Objects.equals(user.getId(), task.getUserAssignedToTask().getId());
    }
}

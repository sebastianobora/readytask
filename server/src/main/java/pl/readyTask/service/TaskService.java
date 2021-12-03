package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.Task;
import pl.readyTask.entity.Team;
import pl.readyTask.entity.User;
import pl.readyTask.entity.enumeration.MemberRole;
import pl.readyTask.entity.enumeration.TaskState;
import pl.readyTask.exception.AccessDeniedToActionException;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.TaskRepository;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final SecurityService securityService;
    private final MembershipService membershipService;
    private final List<TaskState> statesAllowedToSetForUserAssignedToTask = List.of(TaskState.IN_PROGRESS, TaskState.TO_REVIEW);
    private final List<TaskState> statesAllowedToSetForAuthorOfTask = List.of(TaskState.TO_FIX, TaskState.FINISHED, TaskState.ARCHIVED);

    public Task getById(UUID id) {
        return taskRepository.findById(id).orElseThrow(() -> new NoDataFoundException("task", id));
    }

    public Page<Task> getPagedByUserIdAndTeamAdminRole(Long userId, int page) {
        Pageable pageable = getPageable(page);
        return taskRepository.findAllTasksManagedByUser(userId, MemberRole.ADMIN, pageable);
    }

    public Page<Task> getPagedByTeamId(Long teamId, int page) {
        Pageable pageable = getPageable(page);
        return taskRepository.findAllByTeamId(teamId, pageable);
    }

    public Page<Task> getPagedByUserAssignedToAndTeamId(Long userId, Long teamId, int page) {
        Pageable pageable = getPageable(page);
        return taskRepository.findByUserAssignedToTaskIdAndTeamId(userId, teamId, pageable);
    }

    public Page<Task> getPagedByUserAssignedToId(Authentication authentication, int page) {
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        Pageable pageable = getPageable(page);
        return taskRepository.findByUserAssignedToTaskIdOrderByState(user.getId(), pageable);
    }

    private Pageable getPageable(int page) {
        int pageSize = 6;
        return PageRequest.of(page, pageSize, Sort.by("state").and(Sort.by("deadline")));
    }

    public Task add(Task task, Authentication authentication) {
        User user = this.securityService.getUserByEmailFromAuthentication(authentication);
        task.setAuthorOfTaskById(user.getId());
        task.setState(TaskState.NEW);
        return taskRepository.save(task);
    }

    public void changeTaskState(UUID taskId, TaskState state, Authentication authentication) {
        User user = this.securityService.getUserByEmailFromAuthentication(authentication);
        Task task = this.taskRepository.findById(taskId)
                .orElseThrow(() -> new NoDataFoundException(Task.class.getName(), taskId));
        checkIsUserAllowedToChangeTaskState(user, task, state);
        task.setState(state);
        taskRepository.save(task);
    }

    private void checkIsUserAllowedToChangeTaskState(User user, Task task, TaskState state) {
        boolean isAuthorOfTaskAllowedToChangeState =
                isUserAuthorOfTask(user, task) && statesAllowedToSetForAuthorOfTask.contains(state);
        boolean isUserAssignedToTaskAllowedToChangeState =
                isUserAssignedToTask(user, task) && statesAllowedToSetForUserAssignedToTask.contains(state);
        if (!(isAuthorOfTaskAllowedToChangeState || isUserAssignedToTaskAllowedToChangeState)) {
            throw new AccessDeniedToActionException(AccessDeniedToActionException.changeTaskStateMessage);
        }
    }

    public void deleteById(UUID taskId, Authentication authentication) {
        User user = this.securityService.getUserByEmailFromAuthentication(authentication);
        Task task = this.taskRepository.findById(taskId)
                .orElseThrow(() -> new NoDataFoundException(Task.class.getName(), taskId));
        checkIsUserAdminOfTeamRelatedToTask(user, task.getTeam());
        taskRepository.deleteById(taskId);
    }

    private boolean isUserAuthorOfTask(User user, Task task) {
        return Objects.equals(user.getId(), task.getAuthorOfTask().getId());
    }

    private boolean isUserAssignedToTask(User user, Task task) {
        return Objects.equals(user.getId(), task.getUserAssignedToTask().getId());
    }

    private void checkIsUserRelatedToTask(boolean isRelated) {
        if (!isRelated) {
            throw new AccessDeniedToActionException(AccessDeniedToActionException.noPermissionToTask);
        }
    }

    public void checkIsUserAllowedToGetTask(User user, Task task) {
        boolean isUserMemberOfTeam = membershipService.isUserMemberOfTeam(user, task.getTeam());
        boolean isUserAdminOfTeamRelatedToTask = membershipService.isUserAdminOfTeam(user, task.getTeam());
        checkIsUserRelatedToTask(isUserMemberOfTeam || isUserAdminOfTeamRelatedToTask);
    }

    public void checkIsUserAdminOfTeamRelatedToTask(User user, Team team) {
        membershipService.isUserAdminOfTeam(user, team);
    }
}

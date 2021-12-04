package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.readyTask.entity.Task;
import pl.readyTask.entity.Team;
import pl.readyTask.entity.User;
import pl.readyTask.entity.extended.TaskExtended;
import pl.readyTask.service.MembershipService;
import pl.readyTask.service.SecurityService;
import pl.readyTask.service.TaskService;

import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("tasks")
@CrossOrigin("http://localhost:4200")
public class TaskController {
    private final TaskService taskService;
    private final MembershipService membershipService;
    private final SecurityService securityService;

    @GetMapping("/{id}")
    public ResponseEntity<Task> getById(@PathVariable("id") UUID id,
                                        @RequestParam(required = false, defaultValue = "false") Boolean extended,
                                        Authentication authentication) {
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        Task task = taskService.getById(id);
        taskService.checkIsUserAllowedToGetTask(user, task);
        return ResponseEntity.ok(extended ? TaskExtended.get(task) : task);
    }

    @GetMapping("/paged/managed-by-user/current-logged")
    public ResponseEntity<Page<Task>> getTasksManagedByUser(
            @RequestParam(required = false, defaultValue = "false") Boolean extended,
            @RequestParam int page,
            Authentication authentication) {
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        Page<Task> tasks = taskService.getPagedByUserIdAndTeamAdminRole(user.getId(), page);
        return ResponseEntity.ok(extended ? tasks.map(TaskExtended::get) : tasks);
    }

    @GetMapping("/paged/managed-by-user/current-logged/team/{teamId}")
    public ResponseEntity<Page<Task>> getByTeamId(@PathVariable Long teamId,
                                                  @RequestParam(required = false, defaultValue = "false") Boolean extended,
                                                  @RequestParam int page,
                                                  Authentication authentication) {
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        membershipService.checkIsUserAdminOfTeam(user, Team.getNewTeamFromId(teamId));
        Page<Task> tasks = taskService.getPagedByTeamId(teamId, page);
        return ResponseEntity.ok(extended ? tasks.map(TaskExtended::get) : tasks);
    }

    @GetMapping("/paged/user-assigned-to/current-logged/team/{teamId}")
    public ResponseEntity<Page<Task>> getByTeamIdAndLoggedUserAssignedToTask(
            @PathVariable Long teamId,
            @RequestParam(required = false, defaultValue = "false") Boolean extended,
            @RequestParam int page,
            Authentication authentication) {
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        Page<Task> tasks = taskService.getPagedByUserAssignedToAndTeamId(user.getId(), teamId, page);
        return ResponseEntity.ok(extended ? tasks.map(TaskExtended::get) : tasks);
    }

    @GetMapping("/paged/user-assigned-to/current-logged")
    public ResponseEntity<Page<Task>> getByLoggedUserAssignedToTask(
            @RequestParam(required = false, defaultValue = "false") Boolean extended,
            @RequestParam int page,
            Authentication authentication) {
        Page<Task> tasks = taskService.getPagedByUserAssignedToId(authentication, page);
        return ResponseEntity.ok(extended ? tasks.map(TaskExtended::get) : tasks);
    }

    @PostMapping
    public ResponseEntity<Task> add(@RequestBody Task task, Authentication authentication) {
        return ResponseEntity.ok(taskService.add(task, authentication));
    }

    @PatchMapping("/state/{taskId}")
    public ResponseEntity<Object> changeTaskState(@PathVariable UUID taskId,
                                                  @RequestBody Task task,
                                                  Authentication authentication) {
        this.taskService.changeTaskState(taskId, task.getState(), authentication);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/task/{taskId}")
    public ResponseEntity<Object> delete(@PathVariable UUID taskId, Authentication authentication) {
        this.taskService.deleteById(taskId, authentication);
        return ResponseEntity.ok().build();
    }
}

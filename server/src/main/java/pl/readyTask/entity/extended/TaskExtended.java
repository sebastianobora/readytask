package pl.readyTask.entity.extended;

import lombok.Getter;
import pl.readyTask.entity.Task;
import pl.readyTask.entity.Team;
import pl.readyTask.entity.User;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class TaskExtended extends Task{
    private final User userAssignedToTask;
    private final User authorOfTask;
    private final Team team;

    private TaskExtended(Task task) {
        this.id = task.getId();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.deadline = task.getDeadline();
        this.createdAt = task.getCreatedAt();
        this.state = task.getState();
        this.userAssignedToTask = task.getUserAssignedToTask();
        this.authorOfTask = task.getAuthorOfTask();
        this.team = task.getTeam();
    }

    public static Task get(Task task){
        return new TaskExtended(task);
    }

    public static List<Task> get(List<Task> tasks){
        return tasks.stream()
                .map(TaskExtended::new)
                .collect(Collectors.toList());
    }
}

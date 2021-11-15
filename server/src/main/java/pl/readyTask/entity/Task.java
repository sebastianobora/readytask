package pl.readyTask.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;
import pl.readyTask.entity.enumeration.TaskState;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Entity(name = "Task")
@Table(name = "task")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    @Id
    @Type(type="uuid-char")
    @Column(name = "id")
    protected UUID id = UUID.randomUUID();

    @Column(name = "title", nullable = false)
    protected String title;

    @Lob
    @Column(name = "description", nullable = false)
    protected String description;

    @Column(name = "deadline", nullable = false)
    protected Date deadline;

    @CreationTimestamp
    @Column(name = "created_at")
    protected Date createdAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false)
    protected TaskState state;

    @ManyToOne
    @JoinColumn(name = "user_assigned_to_id", nullable = false)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("userAssignedToTaskId")
    @Setter(AccessLevel.NONE)
    @OnDelete(action = OnDeleteAction.CASCADE)
    protected User userAssignedToTask;

    @ManyToOne
    @JoinColumn(name = "user_assigned_by_id", nullable = false)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("authorOfTaskId")
    @Setter(AccessLevel.NONE)
    @OnDelete(action = OnDeleteAction.CASCADE)
    protected User authorOfTask;

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("teamId")
    @Setter(AccessLevel.NONE)
    protected Team team;

    @JsonIgnore
    @OneToMany(mappedBy = "task")
    private Set<TaskComment> taskComments;

    @JsonProperty("teamId")
    public void setTeamById(Long teamId) {
        team = Team.getNewTeamFromId(teamId);
    }

    @JsonProperty("userAssignedToTaskId")
    public void setUserAssignedToTaskById(Long userId) {
        userAssignedToTask = User.getNewUserFromId(userId);
    }

    @JsonProperty("authorOfTaskId")
    public void setAuthorOfTaskById(Long userId) {
        authorOfTask = User.getNewUserFromId(userId);
    }

    public static Task getNewTaskFromId(UUID taskId) {
        Task task = new Task();
        task.setId(taskId);
        return task;
    }
}

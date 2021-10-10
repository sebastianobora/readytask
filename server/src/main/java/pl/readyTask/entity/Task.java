package pl.readyTask.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import pl.readyTask.entity.enumeration.TaskState;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity(name = "Task")
@Table(name = "task")
@Getter
@Setter
public class Task {
    public Task() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Lob
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "deadline", nullable = false)
    private Date deadline;

    @CreationTimestamp
    @Column(name = "created_at")
    private Date createdAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false)
    private TaskState state;

    @ManyToOne
    @JoinColumn(name = "user_assigned_to_id", nullable = false)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("userAssignedToTaskId")
    @Setter(AccessLevel.NONE)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User userAssignedToTask;

    @ManyToOne
    @JoinColumn(name = "user_assigned_by_id", nullable = false)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("authorOfTaskId")
    @Setter(AccessLevel.NONE)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User authorOfTask;

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("teamId")
    @Setter(AccessLevel.NONE)
    private Team team;

    @JsonIgnore
    @OneToMany(mappedBy = "task")
    private Set<TaskComment> taskComments;

    @JsonProperty("teamId")
    public void setTeamById(Long teamId){
        team = Team.getNewTeamFromId(teamId);
    }

    @JsonProperty("userAssignedToTaskId")
    public void setUserAssignedToTaskById(Long userId){
        userAssignedToTask = User.getNewUserFromId(userId);
    }

    @JsonProperty("authorOfTaskId")
    public void setAuthorOfTaskById(Long userId){
        authorOfTask = User.getNewUserFromId(userId);
    }

    public static Task getNewTaskFromId(Long taskId){
        Task task = new Task();
        task.setId(taskId);
        return task;
    }
}

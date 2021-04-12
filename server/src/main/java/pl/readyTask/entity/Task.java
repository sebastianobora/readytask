package pl.readyTask.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
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
    private User userAssignedToTask;

    @ManyToOne
    @JoinColumn(name = "user_assigned_by_id", nullable = false)
    private User authorOfTask;

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    @OneToMany(mappedBy = "task")
    private Set<TaskComment> taskComments;
}

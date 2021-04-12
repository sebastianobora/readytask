package pl.readyTask.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import pl.readyTask.entity.enumeration.TaskState;

import javax.persistence.*;
import java.util.Date;

@Entity(name="Task")
@Table(name="task")
@Getter
@Setter
public class Task {
    public Task() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;

    @Column(name="description", nullable = false)
    private String description;

    @Column(name="deadline", nullable = false)
    private Date deadline;

    @CreationTimestamp
    @Column(name="created_at")
    private Date createdAt;

    @Enumerated(EnumType.STRING)
    @Column(name="state", nullable = false)
    private TaskState state;

    @Column(name="id_user_assigned_to", nullable = false)
    private Long idUserAssignedTo;

    @Column(name="id_user_assigned_by", nullable = false)
    private Long idUserAssignedBy;

    @Column(name="id_team", nullable = false)
    private Long idTeam;
}

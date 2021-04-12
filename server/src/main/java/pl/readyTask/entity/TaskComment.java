package pl.readyTask.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity(name="TaskComment")
@Table(name="task_comment")
@Getter
@Setter
public class TaskComment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;

    @Column(name="message", nullable = false)
    private String message;

    @Column(name="created_at")
    @CreationTimestamp
    private Date createdAt;

    @Column(name="edited_at")
    @UpdateTimestamp
    private Date editedAt;

    @Column(name="id_user", nullable = false)
    private Long idUser;

    @Column(name="id_task", nullable = false)
    private Long idTask;
}

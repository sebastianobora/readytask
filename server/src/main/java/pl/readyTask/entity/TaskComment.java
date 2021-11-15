package pl.readyTask.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity(name = "TaskComment")
@Table(name = "task_comment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskComment extends SocialResource {
    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "created_at")
    @CreationTimestamp
    private Date createdAt;

    @Column(name = "edited_at")
    @UpdateTimestamp
    private Date editedAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("userId")
    @Setter(AccessLevel.NONE)
    private User user;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("taskId")
    @Setter(AccessLevel.NONE)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Task task;

    @JsonProperty("userId")
    public void setUserById(Long userId) {
        user = User.getNewUserFromId(userId);
    }

    @JsonProperty("taskId")
    public void setTaskById(UUID taskId) {
        task = Task.getNewTaskFromId(taskId);
    }
}

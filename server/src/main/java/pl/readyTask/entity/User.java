package pl.readyTask.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import pl.readyTask.entity.enumeration.UserRole;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.Set;

@Entity(name = "User")
@Table(name = "\"user\"")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @NotBlank
    @Size(max = 60)
    @Email
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotBlank
    @Size(max = 20)
    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @NotBlank
    @JsonIgnore
    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "img", nullable = false)
    private String img;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_role", nullable = false)
    private UserRole userRole;

    @CreationTimestamp
    @Column(name = "creation_time")
    private Date creationTime;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<Membership> memberships;

    @JsonIgnore
    @OneToMany(mappedBy="user", fetch = FetchType.LAZY)
    private Set<Todo> todos;

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<TeamForumPost> teamForumPosts;

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<TaskComment> taskComments;

    @JsonIgnore
    @OneToMany(mappedBy = "userAssignedToTask", fetch = FetchType.LAZY)
    private Set<Task> tasksAssignedToUser;

    @JsonIgnore
    @OneToMany(mappedBy = "authorOfTask", fetch = FetchType.LAZY)
    private Set<Task> tasksAssignedByUser;

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<SocialResourceReaction> socialReactions;

    public static User getNewUserFromId(Long userId){
        User user = new User();
        user.setId(userId);
        return user;
    }
}

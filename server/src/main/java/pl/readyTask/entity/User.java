package pl.readyTask.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import pl.readyTask.entity.enumeration.UserRole;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "User")
@Table(name = "\"user\"")
@Getter
@Setter
@AllArgsConstructor
public class User {
    public User() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

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

    @OneToMany(mappedBy = "user")
    private Set<Membership> memberships;

    @OneToMany(mappedBy="user")
    private Set<Todo> todos;

    @OneToMany(mappedBy="user")
    private Set<TaskComment> taskComments;

    @OneToMany(mappedBy = "userAssignedToTask")
    private Set<Task> tasksAssignedToUser;

    @OneToMany(mappedBy = "authorOfTask")
    private Set<Task> tasksAssignedByUser;
}

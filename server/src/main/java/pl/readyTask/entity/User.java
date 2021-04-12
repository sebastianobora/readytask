package pl.readyTask.entity;

import lombok.Getter;
import lombok.Setter;
import pl.readyTask.entity.enumeration.UserRole;

import javax.persistence.*;

@Entity(name="User")
@Table(name="\"user\"")
@Getter
@Setter
public class User {
    public User() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;

    @Column(name="email", nullable = false)
    private String email;
    @Column(name="username", nullable = false)
    private String username;
    @Column(name="password", nullable = false)
    private String password;
    @Column(name="first_name", nullable = false)
    private String firstName;
    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Column(name="img", nullable = false)
    private String img;

    @Enumerated(EnumType.STRING)
    @Column(name="user_role", nullable = false)
    private UserRole userRole;
}

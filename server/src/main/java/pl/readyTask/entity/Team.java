package pl.readyTask.entity;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity(name = "Team")
@Table(name = "team")
@Getter
@Setter
@AllArgsConstructor
public class Team {
    public Team() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "code", unique = true, nullable = false)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;

    @CreationTimestamp
    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "img", nullable = false)
    private String img;

    @OneToMany(mappedBy = "team")
    private Set<Membership> memberships;

    @OneToMany(mappedBy = "team")
    private Set<Task> tasks;
}

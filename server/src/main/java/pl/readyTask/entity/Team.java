package pl.readyTask.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity(name="Team")
@Table(name="team")
@Getter
@Setter
public class Team {
    public Team() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;

    @Column(name="code", nullable = false)
    private String code;

    @Column(name="name", nullable = false)
    private String name;

    @CreationTimestamp
    @Column(name="created_at")
    private Date createdAt;

    @Column(name="img", nullable = false)
    private String img;
}

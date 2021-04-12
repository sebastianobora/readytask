package pl.readyTask.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import pl.readyTask.entity.enumeration.MemberRole;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "Membership")
@Table(name = "membership",
        uniqueConstraints={
        @UniqueConstraint(columnNames = {"user_id", "team_id"})
})
@Getter
@Setter
@AllArgsConstructor
public class Membership {

    public Membership() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    @CreationTimestamp
    @Column(name = "member_from")
    private Date memberFrom;

    @Enumerated(EnumType.STRING)
    @Column(name = "member_role", nullable = false)
    private MemberRole memberRole;
}

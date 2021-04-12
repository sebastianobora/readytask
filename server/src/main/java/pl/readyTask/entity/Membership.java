package pl.readyTask.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import pl.readyTask.entity.enumeration.MemberRole;

import javax.persistence.*;
import java.util.Date;

@Entity(name="Membership")
@Table(name="membership")
@Getter
@Setter
public class Membership {

    public Membership() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;

    @Column(name="id_user", nullable = false)
    private Long idUser;

    @Column(name="id_team", nullable = false)
    private Long idTeam;

    @CreationTimestamp
    @Column(name="member_from")
    private Date memberFrom;

    @Enumerated(EnumType.STRING)
    @Column(name="member_role", nullable = false)
    private MemberRole memberRole;
}

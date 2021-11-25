package pl.readyTask.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import pl.readyTask.entity.enumeration.MemberRole;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "Membership")
@Table(name = "membership",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "team_id"})
        })
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Membership {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    protected Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("userId")
    @Setter(AccessLevel.NONE)
    protected User user;

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("teamId")
    @Setter(AccessLevel.NONE)
    protected Team team;

    @CreationTimestamp
    @Column(name = "member_from")
    protected Date memberFrom;

    @Enumerated(EnumType.STRING)
    @Column(name = "member_role", nullable = false)
    protected MemberRole memberRole;

    @JsonProperty("userId")
    public void setUserById(Long userId) {
        user = User.getNewUserFromId(userId);
    }

    @JsonProperty("teamId")
    public void setTeamById(Long teamId) {
        team = Team.getNewTeamFromId(teamId);
    }
}

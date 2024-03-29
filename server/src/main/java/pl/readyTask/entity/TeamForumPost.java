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

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "TeamForumPost")
@Table(name = "team_forum_post")
public class TeamForumPost extends SocialResource {
    @Column(name = "message", columnDefinition = "TEXT")
    protected String message;

    @Column(name = "creation_time")
    @CreationTimestamp
    protected Date creationTime;

    @Column(name = "update_time")
    @UpdateTimestamp
    protected Date updateTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
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

    @JsonProperty("userId")
    public void setUserById(Long userId) {
        user = User.getNewUserFromId(userId);
    }

    @JsonProperty("teamId")
    public void setTeamById(Long teamId) {
        team = Team.getNewTeamFromId(teamId);
    }
}

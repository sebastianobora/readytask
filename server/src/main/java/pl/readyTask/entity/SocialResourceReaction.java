package pl.readyTask.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "SocialResourceReaction")
@Table(name = "social_resource_reaction",
        uniqueConstraints={
        @UniqueConstraint(columnNames = {"user_id", "social_resource_id"})
        })
public class SocialResourceReaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "is_positive")
    private boolean positive;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("userId")
    @Setter(AccessLevel.NONE)
    private User user;

    @ManyToOne
    @JoinColumn(name = "social_resource_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("socialResourceId")
    @Setter(AccessLevel.NONE)
    private SocialResource socialResource;

    @JsonProperty("userId")
    public void setUserById(Long userId){
        user = User.getNewUserFromId(userId);
    }

    @JsonProperty("socialResourceId")
    public void setSocialResourceById(Long socialResourceId){
        socialResource = SocialResource.getSocialResourceFromId(socialResourceId);
    }
}

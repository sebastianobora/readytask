package pl.readyTask.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "SocialResource")
@Table(name = "social_resource")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class SocialResource {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonIgnore
    @OneToMany(mappedBy = "socialResource")
    private Set<SocialResourceReaction> socialReactions;

    public static SocialResource getSocialResourceFromId(Long socialResourceId) {
        SocialResource socialResource = new SocialResource();
        socialResource.setId(socialResourceId);
        return socialResource;
    }
}

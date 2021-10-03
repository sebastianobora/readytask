package pl.readyTask.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pl.readyTask.entity.SocialResourceReaction;

import java.util.Optional;

@Repository
public interface SocialResourceReactionRepository extends JpaRepository<SocialResourceReaction, Long> {
    Optional<SocialResourceReaction> findBySocialResourceIdAndUserId(Long socialResource_id, Long user_id);

    @Transactional
    void deleteBySocialResourceIdAndUserId(Long socialResource_id, Long user_id);

    Integer countAllBySocialResourceIdAndUserIdAndPositiveEquals(Long socialResource_id, Long user_id, boolean positive);

    @Query("SELECT srr.positive FROM SocialResourceReaction as srr WHERE srr.socialResource.id = ?1 and srr.user.id = ?2")
    Optional<Boolean> getIsLiked(Long social_resource_id, Long user_id);
}

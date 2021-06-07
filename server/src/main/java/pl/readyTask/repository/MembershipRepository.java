package pl.readyTask.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.readyTask.entity.Membership;
import pl.readyTask.entity.Team;

import java.util.Optional;

@Repository
public interface MembershipRepository extends JpaRepository<Membership, Long> {
    Optional<Membership> findMembershipByTeamIdAndUserId(Long team_id, Long user_id);
}

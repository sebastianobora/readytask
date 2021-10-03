package pl.readyTask.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.readyTask.entity.Membership;

import java.util.List;
import java.util.Optional;

@Repository
public interface MembershipRepository extends JpaRepository<Membership, Long> {
    Optional<Membership> findMembershipByTeamIdAndUserId(Long team_id, Long user_id);

    Optional<List<Membership>> findMembershipsByTeamIdOrderByMemberFrom(Long team_id);

    @Query("SELECT count(m.id) FROM Membership as m WHERE m.memberRole = 'ADMIN' AND m.team.id = ?1")
    Optional<Integer> getAmountOfAdminRoleMembersByTeamId(Long teamId);

    boolean existsByUserIdAndTeamId(Long user_id, Long team_id);
}

package pl.readyTask.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.readyTask.entity.Team;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    @Query("SELECT t FROM Team t JOIN t.memberships m WHERE m.user.id = ?1")
    Optional<List<Team>> findTeamsByUserId(Long id);

    Optional<Team> findByCode(String code);

    boolean existsTeamByCode(String code);
}

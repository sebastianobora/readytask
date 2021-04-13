package pl.readyTask.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.readyTask.entity.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
}

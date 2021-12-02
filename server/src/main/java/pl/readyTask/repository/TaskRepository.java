package pl.readyTask.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.readyTask.entity.Task;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {
    Optional<List<Task>> findByUserAssignedToTaskIdOrderByState(Long id);

    Optional<List<Task>> findByUserAssignedToTaskIdAndTeamId(Long userAssignedToTask_id, Long team_id);
}

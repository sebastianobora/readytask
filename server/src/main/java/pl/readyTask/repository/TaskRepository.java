package pl.readyTask.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import pl.readyTask.entity.Task;
import pl.readyTask.entity.enumeration.MemberRole;

import java.util.UUID;

@Repository
public interface TaskRepository extends PagingAndSortingRepository<Task, UUID> {
    Page<Task> findByUserAssignedToTaskIdOrderByState(Long id, Pageable pageable);

    Page<Task> findByUserAssignedToTaskIdAndTeamId(Long userAssignedToTask_id, Long team_id, Pageable pageable);

    Page<Task> findAllByTeamId(Long team_id, Pageable pageable);

    @Query("SELECT task " +
            "FROM Task task " +
            "JOIN task.team team " +
            "JOIN team.memberships m " +
            "WHERE m.user.id = ?1 AND m.memberRole = ?2")
    Page<Task> findAllTasksManagedByUser(Long userId, MemberRole role, Pageable pageable);
}

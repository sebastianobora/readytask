package pl.readyTask.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.readyTask.entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}

package pl.readyTask.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.readyTask.entity.Todo;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
}

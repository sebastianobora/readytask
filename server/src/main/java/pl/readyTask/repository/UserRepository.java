package pl.readyTask.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.readyTask.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u JOIN u.memberships m WHERE m.team.id = ?1")
    List<User> findUsersByTeamId(Long id);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}

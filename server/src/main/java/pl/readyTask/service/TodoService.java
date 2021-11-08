package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.Todo;
import pl.readyTask.entity.User;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.TodoRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;
    private final SecurityService securityService;

    public List<Todo> getAllByUserId(Authentication authentication) {
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        return todoRepository.findByUser_Id(user.getId(), Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public Todo getById(Long id) {
        return todoRepository.findById(id).orElseThrow(() -> new NoDataFoundException("todo", id));
    }

    public Todo add(Todo todo, Authentication authentication) {
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        todo.setUserById(user.getId());
        // TODO: 26.04.2021 validate
        return todoRepository.save(todo);
    }

    public Todo update(Long id, Todo todo) {
        getById(id);
        return todoRepository.save(todo);
    }

    public void delete(Long id) {
        todoRepository.delete(getById(id));
    }
}

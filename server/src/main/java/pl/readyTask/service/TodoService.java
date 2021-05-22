package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.Todo;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.TodoRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;

    public List<Todo> getAllByUserId(Long userId){
        return todoRepository.findByUser_Id(userId, Sort.by(Sort.Direction.DESC, "createdAt"));
    }
    public Todo getById(Long id){
        return todoRepository.findById(id).orElseThrow(() -> new NoDataFoundException("todo", id));
    }

    public Todo add(Todo todo){
        // TODO: 26.04.2021 validate
        return todoRepository.save(todo);
    }
    
    public Todo update(Long id, Todo todo){
        getById(id);
        return todoRepository.save(todo);
    }
    
    public void delete(Long id){
        todoRepository.delete(getById(id));
    }
}

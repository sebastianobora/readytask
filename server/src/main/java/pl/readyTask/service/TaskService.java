package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.Task;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.TaskRepository;

@Service
@AllArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    public Task getById(Long id){
        return taskRepository.findById(id).orElseThrow(() -> new NoDataFoundException("task", id));
    }
}

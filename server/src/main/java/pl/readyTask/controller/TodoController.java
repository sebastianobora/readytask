package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.readyTask.entity.Todo;
import pl.readyTask.service.TodoService;

import java.util.List;

@RestController
@RequestMapping("todos")
@CrossOrigin("http://localhost:4200")
@AllArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getById(@PathVariable("id") Long id){
        return ResponseEntity.ok(todoService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<Todo>> getUserTodoList(){
        return ResponseEntity.ok(todoService.getAllByUserId(0L));
    }

    @PostMapping
    public ResponseEntity<Todo> add(@RequestBody Todo todo){
        //TEMP
        todo.setUserById(0L);
        return ResponseEntity.ok(todoService.add(todo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        todoService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> edit(@PathVariable("id") Long id, @RequestBody Todo todo){
        Todo editedTodo = todoService.update(id, todo);
        return ResponseEntity.ok(editedTodo);
    }
}

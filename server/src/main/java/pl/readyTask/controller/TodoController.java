package pl.readyTask.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("todo")
public class TodoController {

    @GetMapping("/todo-list")
    public String getUserTodoList(){
        //po id/username zalogowanego użytkownika
        return "User's todo list";
    }
}

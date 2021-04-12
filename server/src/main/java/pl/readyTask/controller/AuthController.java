package pl.readyTask.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ResponseBody
public class AuthController {

    @PostMapping("/test")
    public String createTeam() {
        return "{ token: 'testToken123', error: 'testError123' }";
    }
}

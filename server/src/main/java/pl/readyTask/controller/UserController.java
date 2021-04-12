package pl.readyTask.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
public class UserController {

    @GetMapping("/profile/{userName}")
    public String getByUsername(@PathVariable("userName") String userName){
        return "User profile" + userName;
    }

//    @PutMapping("/edit-profile")
    @RequestMapping("/edit-profile")
    public String editProfile(){
        return "edit public profile:<br>First name<br>Last Name<br>Who are you (max 50 marks)<br>Description";
    }

//    @PutMapping("/edit-account")
    @RequestMapping("/edit-account")
    public String editAccount(){
        return "Edit account details:\npassword\nemail";
    }

    @DeleteMapping("close-account")
    public String closeAccount(){
        return "Close account form";
    }
}

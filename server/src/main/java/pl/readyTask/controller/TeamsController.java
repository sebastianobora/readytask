package pl.readyTask.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("teams")
public class TeamsController {

    @PostMapping("/new-team")
    public String createTeam() {
        return "Add new team";
    }

    @GetMapping("/my-teams")
    public String getUserTeams() {
        return "User's teams";
    }

    @GetMapping("/invitations")
    public String getUserInvitations() {
        return "User's invitations";
    }

    @PostMapping("/join-to-the-team")
    public String addUserToTeam(){
        return "join user to the team";
    }
}

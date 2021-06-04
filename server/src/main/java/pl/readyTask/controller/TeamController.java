package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.readyTask.entity.Team;
import pl.readyTask.service.TeamService;

@RestController
@AllArgsConstructor
@RequestMapping("teams")
public class TeamController {
    private final TeamService teamService;

    @GetMapping("/{id}")
    public ResponseEntity<Team> getById(@PathVariable("id") Long id){
        return ResponseEntity.ok(teamService.getById(id));
    }
}

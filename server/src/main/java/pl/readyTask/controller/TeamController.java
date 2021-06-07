package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.readyTask.entity.Team;
import pl.readyTask.service.TeamService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("teams")
@CrossOrigin("http://localhost:4200")
public class TeamController {
    private final TeamService teamService;

    @GetMapping("/{id}")
    public ResponseEntity<Team> getById(@PathVariable("id") Long id){
        return ResponseEntity.ok(teamService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<Team>> getUserTeamList(){
        return ResponseEntity.ok(teamService.getAllByUserId(0L));
    }

    @PostMapping
    public ResponseEntity<Team> add(@RequestBody Team team){
        return ResponseEntity.ok(teamService.add(team));
    }
}

package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.readyTask.entity.TeamForumPost;
import pl.readyTask.service.TeamForumPostService;

import java.util.List;

@RestController
@RequestMapping("team-forum-post")
@CrossOrigin("http://localhost:4200")
@AllArgsConstructor
public class TeamForumPostController {
    private final TeamForumPostService teamForumPostService;

    @GetMapping("/by-team-id/{id}")
    public ResponseEntity<List<TeamForumPost>> getPostsByTeamId(@PathVariable Long id){
        return ResponseEntity.ok(teamForumPostService.getPostsByTeamId(id));
    }
}

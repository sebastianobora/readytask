package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
    public ResponseEntity<List<TeamForumPost>> getPostsByTeamId(@PathVariable Long id) {
        return ResponseEntity.ok(teamForumPostService.getPostsByTeamId(id));
    }

    @PostMapping
    public ResponseEntity<TeamForumPost> addPost(@RequestBody TeamForumPost post, Authentication authentication) {
        return ResponseEntity.ok(teamForumPostService.add(post, authentication));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletePost(@PathVariable Long id) {
        teamForumPostService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<TeamForumPost> updatePost(@RequestBody TeamForumPost post) {
        return ResponseEntity.ok(teamForumPostService.update(post));
    }
}

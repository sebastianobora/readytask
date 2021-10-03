package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.readyTask.dto.ResourceStatisticsResponse;
import pl.readyTask.entity.TeamForumPost;
import pl.readyTask.service.SocialResourceReactionService;

@RestController
@AllArgsConstructor
@RequestMapping("social-resource-reaction")
@CrossOrigin("http://localhost:4200")
public class SocialResourceReactionController {
    private final SocialResourceReactionService socialResourceReactionService;

    @GetMapping("/post-statistics/{postId}")
    public ResponseEntity<ResourceStatisticsResponse> postStatistics(Authentication authentication, @PathVariable Long postId){
        return ResponseEntity.ok(socialResourceReactionService.getResourceStatistics(authentication, postId));
    }

    @PostMapping("/like-post")
    public ResponseEntity<HttpStatus> likePost(Authentication authentication, @RequestBody TeamForumPost post){
        socialResourceReactionService.addPostReaction(authentication, post, true);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/dislike-post")
    public ResponseEntity<HttpStatus> dislikePost(Authentication authentication, @RequestBody TeamForumPost post){
        socialResourceReactionService.addPostReaction(authentication, post, false);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/swap-post-reaction")
    public ResponseEntity<HttpStatus> swapPostReaction(Authentication authentication, @RequestBody TeamForumPost post){
        socialResourceReactionService.swapPostReaction(authentication, post);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> deleteReaction(Authentication authentication, @RequestBody TeamForumPost post){
        socialResourceReactionService.deletePostReaction(authentication, post);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.readyTask.dto.ResourceStatisticsResponse;
import pl.readyTask.service.SocialResourceReactionService;

@RestController
@AllArgsConstructor
@RequestMapping("social-resource-reaction")
@CrossOrigin("http://localhost:4200")
public class SocialResourceReactionController {
    private final SocialResourceReactionService socialResourceReactionService;

    @GetMapping("/post-statistics/{postId}")
    public ResponseEntity<ResourceStatisticsResponse> postStatistics(Authentication authentication,
                                                                     @PathVariable Long postId) {
        return ResponseEntity.ok(socialResourceReactionService.getResourceStatistics(authentication, postId));
    }

    @PostMapping("/like-post/{postId}")
    public ResponseEntity<ResourceStatisticsResponse> likePost(Authentication authentication,
                                                               @PathVariable Long postId) {
        return new ResponseEntity<>(socialResourceReactionService.addPostReaction(authentication, postId, true),
                HttpStatus.CREATED);
    }

    @PostMapping("/dislike-post/{postId}")
    public ResponseEntity<ResourceStatisticsResponse> dislikePost(Authentication authentication,
                                                                  @PathVariable Long postId) {
        return new ResponseEntity<>(socialResourceReactionService.addPostReaction(authentication, postId, false),
                HttpStatus.CREATED);
    }

    @PutMapping("/swap-post-reaction/{postId}")
    public ResponseEntity<ResourceStatisticsResponse> swapPostReaction(Authentication authentication,
                                                                       @PathVariable Long postId) {
        return ResponseEntity.ok(socialResourceReactionService.swapPostReaction(authentication, postId));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<ResourceStatisticsResponse> deleteReaction(Authentication authentication,
                                                                     @PathVariable Long postId) {
        return ResponseEntity.ok(socialResourceReactionService.deletePostReaction(authentication, postId));
    }
}

package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.readyTask.entity.SocialResourceReaction;
import pl.readyTask.service.SocialResourceReactionService;

@RestController
@AllArgsConstructor
@RequestMapping("social-resource-reaction")
@CrossOrigin("http://localhost:4200")
public class SocialResourceReactionController {
    private final SocialResourceReactionService socialResourceReactionService;
    @RequestMapping
    public ResponseEntity<SocialResourceReaction> like(Authentication authentication, Long socialResourceId){
        return ResponseEntity.ok(socialResourceReactionService.like(authentication, socialResourceId));
    }
}

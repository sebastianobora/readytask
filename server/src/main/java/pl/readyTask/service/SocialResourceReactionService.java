package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.SocialResourceReaction;
import pl.readyTask.entity.User;
import pl.readyTask.repository.SocialResourceReactionRepository;
import pl.readyTask.repository.TeamForumPostRepository;

@Service
@AllArgsConstructor
public class SocialResourceReactionService {
    private final SocialResourceReactionRepository socialResourceReactionRepository;
    private final TeamForumPostRepository teamForumPostRepository;
    private final SecurityService securityService;

    public SocialResourceReaction like(Authentication authentication, Long socialResourceId){
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        // if user is member of the team?
        return socialResourceReactionRepository.save(new SocialResourceReaction());
    }
}

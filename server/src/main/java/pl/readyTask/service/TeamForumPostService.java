package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.TeamForumPost;
import pl.readyTask.entity.User;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.TeamForumPostRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class TeamForumPostService {
    private final TeamForumPostRepository teamForumPostRepository;
    private final SecurityService securityService;

    public TeamForumPost getById(Long id){
        return teamForumPostRepository.findById(id)
                .orElseThrow(() -> new NoDataFoundException("TeamForumPost", id));
    }

    public List<TeamForumPost> getPostsByTeamId(Long id) {
        return teamForumPostRepository.findAllByTeamIdOrderByCreationTimeDesc(id)
                .orElseThrow(() -> new NoDataFoundException("TeamForumPost", id));
    }

    public TeamForumPost add(TeamForumPost post, Authentication authentication) {
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        post.setUserById(user.getId());
        return teamForumPostRepository.save(post);
    }

    public void delete(Long id) {
        teamForumPostRepository.deleteById(id);
    }

    public TeamForumPost update(TeamForumPost post) {
        return teamForumPostRepository.save(post);
    }
}

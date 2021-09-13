package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.TeamForumPost;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.TeamForumPostRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class TeamForumPostService {
    private final TeamForumPostRepository teamForumPostRepository;
    public List<TeamForumPost> getPostsByTeamId(Long id) {
        return teamForumPostRepository.findAllByTeamIdOrderByCreationTimeDesc(id)
                .orElseThrow(() -> new NoDataFoundException("TeamForumPost", id));
    }
}

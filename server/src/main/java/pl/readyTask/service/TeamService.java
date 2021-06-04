package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.Team;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.TeamRepository;

@Service
@AllArgsConstructor
public class TeamService {
    private final TeamRepository teamRepository;

    public Team getById(Long id){
        return teamRepository.findById(id).orElseThrow(() -> new NoDataFoundException("team", id));
    }
}

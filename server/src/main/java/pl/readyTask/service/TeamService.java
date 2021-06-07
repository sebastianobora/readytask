package pl.readyTask.service;

import lombok.AllArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.Membership;
import pl.readyTask.entity.Team;
import pl.readyTask.entity.enumeration.MemberRole;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.MembershipRepository;
import pl.readyTask.repository.TeamRepository;

import java.security.SecureRandom;
import java.util.*;

@Service
public class TeamService {
    private final TeamRepository teamRepository;
    private final MembershipService membershipService;

    @Autowired
    public TeamService(@Lazy MembershipService membershipService, TeamRepository teamRepository){
        this.teamRepository = teamRepository;
        this.membershipService = membershipService;
    }

    public Team getById(Long id){
        return teamRepository.findById(id).orElseThrow(() -> new NoDataFoundException("team", id));
    }

    public Team getByCode(String code){
        return teamRepository.findByCode(code).orElseThrow(() -> new NoDataFoundException("team", code));
    }

    public List<Team> getAllByUserId(Long userId){
        return teamRepository.findTeamsByUserId(userId).orElseThrow(() -> new NoDataFoundException("teams", userId));
    }

    public Team add(Team team){
        String code;
        do{
             code = generateTeamCode();
        }while(isCodeAlreadyExists(code));

        team.setCode(code);
        Team newTeam = teamRepository.save(team);

        Membership membership = new Membership();
        membership.setMemberRole(MemberRole.ADMIN);
        membership.setTeamById(newTeam.getId());
        membership.setUserById(0L);
        membershipService.add(membership);

        return newTeam;
    }

    public boolean isCodeAlreadyExists(String code){
        return teamRepository.existsTeamByCode(code);
    }

    public String generateTeamCode(){
        String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        SecureRandom rnd = new SecureRandom();
        StringBuilder sb = new StringBuilder(8);
        for(int i = 0; i < 8; i++)
            sb.append(AB.charAt(rnd.nextInt(AB.length())));
        return sb.toString();
    }
}

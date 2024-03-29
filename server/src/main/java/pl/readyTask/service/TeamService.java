package pl.readyTask.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.Membership;
import pl.readyTask.entity.Team;
import pl.readyTask.entity.User;
import pl.readyTask.entity.enumeration.MemberRole;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.TeamRepository;

import java.security.SecureRandom;
import java.util.List;

@Service
public class TeamService {
    private final TeamRepository teamRepository;
    private final MembershipService membershipService;
    private final SecurityService securityService;
    private final DefaultPlaceholderService defaultPlaceholderService;

    @Autowired
    public TeamService(TeamRepository teamRepository,
                       @Lazy MembershipService membershipService,
                       SecurityService securityService,
                       DefaultPlaceholderService defaultPlaceholderService) {
        this.teamRepository = teamRepository;
        this.membershipService = membershipService;
        this.securityService = securityService;
        this.defaultPlaceholderService = defaultPlaceholderService;
    }

    public Team getById(Long id){
        return teamRepository.findById(id).orElseThrow(() -> new NoDataFoundException("team", id));
    }

    public Team getByCode(String code){
        return teamRepository.findByCode(code).orElseThrow(() -> new NoDataFoundException("team", code));
    }

    public List<Team> getAllByAuthUser(Authentication authentication){
        User user = this.securityService.getUserByEmailFromAuthentication(authentication);
        return teamRepository.findTeamsByUserId(user.getId()).orElseThrow(() -> new NoDataFoundException("teams", user.getId()));
    }

    public void delete(Long id){
        teamRepository.delete(getById(id));
    }

    public Team add(Team team, Authentication authentication){
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        String code = getUniqueTeamCode();
        String imgUrl = defaultPlaceholderService.getTeamPlaceholder(team.getName());

        team.setCode(code);
        team.setImg(imgUrl);
        team = teamRepository.save(team);

        Membership membership = membershipService.getMembershipFromFields(
                MemberRole.ADMIN, team.getId(), user.getId());
        membershipService.add(membership);
        return team;
    }

    public String getUniqueTeamCode(){
        String code;
        do{
            code = generateTeamCode();
        }while(isCodeAlreadyExists(code));
        return code;
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

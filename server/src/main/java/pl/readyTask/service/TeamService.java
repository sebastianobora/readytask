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

    @Autowired
    public TeamService(TeamRepository teamRepository,
                       @Lazy MembershipService membershipService,
                       SecurityService securityService) {
        this.teamRepository = teamRepository;
        this.membershipService = membershipService;
        this.securityService = securityService;
    }

    public Team getById(Long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new NoDataFoundException("team", id));
    }

    public Team getByCode(String code) {
        return teamRepository.findByCode(code)
                .orElseThrow(() -> new NoDataFoundException("team", code));
    }

    public List<Team> getAllByAuthUser(Authentication authentication) {
        User user = this.securityService.getUserByEmailFromAuthentication(authentication);
        return teamRepository.findTeamsByUserId(user.getId())
                .orElseThrow(() -> new NoDataFoundException("teams", user.getId()));
    }

    public void delete(Long id) {
        teamRepository.deleteById(id);
    }

    public Team add(Team team, Authentication authentication) {
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        String code = getUniqueTeamCode();
        team.setCode(code);
        team = teamRepository.save(team);

        Membership membership = membershipService.getMembershipFromFields(
                MemberRole.ADMIN, team.getId(), user.getId());
        membershipService.add(membership);
        return team;
    }

    public String getUniqueTeamCode() {
        String code = generateTeamCode();
        return isCodeAlreadyExists(code) ? getUniqueTeamCode() : code;
    }

    private String generateTeamCode() {
        String codeCharPool = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        Integer codeLength = 8;
        return generateCode(codeCharPool, codeLength);
    }

    private String generateCode(String charPool, Integer codeLength){
        SecureRandom rand = new SecureRandom();
        StringBuilder sb = new StringBuilder(codeLength);

        for (int i = 0; i < codeLength; i++){
            var randomNumberFromPoolRange = rand.nextInt(charPool.length());
            var randCharFromPool = charPool.charAt(randomNumberFromPoolRange);
            sb.append(randCharFromPool);
        }
        return sb.toString();
    }

    public boolean isCodeAlreadyExists(String code) {
        return teamRepository.existsTeamByCode(code);
    }
}

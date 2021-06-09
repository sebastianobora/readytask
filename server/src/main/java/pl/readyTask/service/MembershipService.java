package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.Membership;
import pl.readyTask.entity.Team;
import pl.readyTask.entity.User;
import pl.readyTask.entity.enumeration.MemberRole;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.MembershipRepository;

@Service
@AllArgsConstructor
public class MembershipService {
    private final MembershipRepository membershipRepository;
    private final TeamService teamService;
    private final SecurityService securityService;

    public Membership getById(Long id){
        return membershipRepository.findById(id).orElseThrow(() -> new NoDataFoundException("membership", id));
    }

    public Membership add(Membership membership){
        return membershipRepository.save(membership);
    }

    public Membership addByCode(String code, Membership membershipToRemove, Authentication authentication) {
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        Team team = teamService.getByCode(code);
        Membership membership = getMembershipFromFields(MemberRole.PARTICIPANT, team.getId(), user.getId());
        return membershipRepository.save(membership);
    }

    public Membership getMembershipFromFields(MemberRole role, Long teamId, Long userId){
        Membership membership = new Membership();
        membership.setMemberRole(role);
        membership.setTeamById(teamId);
        membership.setUserById(userId);
        return membership;
    }

    public Membership getByTeamAndUserId(Long teamId, Authentication authentication){
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        return membershipRepository.findMembershipByTeamIdAndUserId(teamId, user.getId())
                .orElseThrow(() -> new NoDataFoundException("membership", teamId));
    }
}

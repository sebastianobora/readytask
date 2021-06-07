package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.Membership;
import pl.readyTask.entity.Team;
import pl.readyTask.entity.enumeration.MemberRole;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.MembershipRepository;

@Service
@AllArgsConstructor
public class MembershipService {
    private final MembershipRepository membershipRepository;
    private final TeamService teamService;

    public Membership getById(Long id){
        return membershipRepository.findById(id).orElseThrow(() -> new NoDataFoundException("membership", id));
    }

    public Membership add(Membership membership){
        return membershipRepository.save(membership);
    }

    public Membership addByCode(String code) {
        Team team = teamService.getByCode(code);
        Membership membership = new Membership();
        membership.setTeamById(team.getId());
        membership.setMemberRole(MemberRole.PARTICIPANT);
        membership.setUserById(0L);
        return membershipRepository.save(membership);
    }

    public Membership getByTeamId(Long teamId){
        return membershipRepository.findMembershipByTeamIdAndUserId(teamId, 0L).orElseThrow(() -> new NoDataFoundException("membership", teamId));
    }
}

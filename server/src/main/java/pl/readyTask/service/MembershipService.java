package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.Membership;
import pl.readyTask.entity.Team;
import pl.readyTask.entity.User;
import pl.readyTask.entity.enumeration.MemberRole;
import pl.readyTask.exception.AccessDeniedToActionException;
import pl.readyTask.exception.ExceptionsMessages;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.exception.ResourceAlreadyExistsException;
import pl.readyTask.repository.MembershipRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class MembershipService {
    private final MembershipRepository membershipRepository;
    private final TeamService teamService;
    private final SecurityService securityService;

    public Membership getById(Long id) {
        return membershipRepository.findById(id).orElseThrow(() -> new NoDataFoundException("membership", id));
    }

    public Membership add(Membership membership) {
        return membershipRepository.save(membership);
    }

    public Membership addByCode(String code, Authentication authentication) {
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        Team team = teamService.getByCode(code);
        if(membershipRepository.existsByUserIdAndTeamId(user.getId(), team.getId())){
            throw new ResourceAlreadyExistsException(Membership.class.getSimpleName(), "userId, teamId",user.getId() + ", " + team.getId());
        }
        Membership membership = getMembershipFromFields(MemberRole.PARTICIPANT, team.getId(), user.getId());
        return membershipRepository.save(membership);
    }

    public Membership getMembershipFromFields(MemberRole role, Long teamId, Long userId) {
        Membership membership = new Membership();
        membership.setMemberRole(role);
        membership.setTeamById(teamId);
        membership.setUserById(userId);
        return membership;
    }

    public Membership getByTeamIdAndUserId(Long teamId, Long userId) {
        return membershipRepository.findMembershipByTeamIdAndUserId(teamId, userId)
                .orElseThrow(() -> new NoDataFoundException("membership", teamId));
    }

    public List<Membership> getLoggedUserMemberships(Authentication authentication) {
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        return membershipRepository.findAllByUserId(user.getId())
                .orElseThrow(() -> new NoDataFoundException(Membership.class.getSimpleName(), "id", user.getId()));
    }

    public Page<Membership> getPagedMembershipsByUserId(Long userId, int page) {
        Pageable pageable = buildPageable(page);
        return membershipRepository.findAllByUserId(userId, pageable);
    }

    private Pageable buildPageable(int page){
        final int pageSize = 15;
        return PageRequest.of(page, pageSize, Sort.by("memberRole"));
    }

    public List<Membership> getMembershipsByTeamId(Long teamId) {
        return membershipRepository.findMembershipsByTeamIdOrderByMemberFrom(teamId)
                .orElseThrow(() -> new NoDataFoundException(Membership.class.getSimpleName(), teamId));
    }

    public Page<Membership> getPagedMembershipsByTeamId(Long teamId, int page){
        Pageable pageable = buildPageable(page);
        return membershipRepository.findAllByTeamId(teamId, pageable);
    }

    public Integer getAmountOfAdminRoleMembersByTeamId(Long teamId) {
        return membershipRepository.getAmountOfAdminRoleMembersByTeamId(teamId)
                .orElseThrow(() -> new NoDataFoundException(Membership.class.getSimpleName(), teamId));
    }

    public Membership updateRole(Long id, MemberRole role) {
        Membership membership = membershipRepository.findById(id)
                .orElseThrow(() -> new NoDataFoundException(Membership.class.getName(), id));
        membership.setMemberRole(role);
        return membershipRepository.save(membership);
    }

    public void delete(Long id) {
        membershipRepository.deleteById(id);
    }

    public boolean isUserMemberOfTeam(User user, Team team) {
        return membershipRepository.existsByUserIdAndTeamId(user.getId(), team.getId());
    }

    public void checkIsUserMemberOfTeam(User user, Team team){
        if(!isUserMemberOfTeam(user, team)){
            throw new AccessDeniedToActionException(ExceptionsMessages.getAccessDeniedToActionMessage(user));
        }
    }

    public boolean isUserAdminOfTeam(User user, Team team) {
        Membership membership = membershipRepository.findMembershipByTeamIdAndUserId(team.getId(), user.getId())
                .orElseThrow(() -> new NoDataFoundException(Membership.class.getSimpleName(), team.getId()));
        return membership.getMemberRole() == MemberRole.ADMIN;
    }

    public void checkIsUserAdminOfTeam(User user, Team team){
        if(!isUserAdminOfTeam(user, team)){
            throw new AccessDeniedToActionException(user);
        }
    }
}

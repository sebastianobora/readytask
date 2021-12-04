package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.readyTask.entity.Membership;
import pl.readyTask.entity.Task;
import pl.readyTask.entity.Team;
import pl.readyTask.entity.User;
import pl.readyTask.entity.extended.MembershipExtended;
import pl.readyTask.service.MembershipService;
import pl.readyTask.service.SecurityService;

import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping("memberships")
@CrossOrigin("http://localhost:4200")
public class MembershipController {
    private final MembershipService membershipService;
    private final SecurityService securityService;

    @GetMapping("/{id}")
    public ResponseEntity<Membership> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(membershipService.getById(id));
    }

    @GetMapping("/user/logged/team/{teamId}")
    public ResponseEntity<Membership> getLoggedUserMembershipByTeamId(
            @PathVariable Long teamId,
            Authentication authentication,
            @RequestParam(required = false, defaultValue = "false") Boolean extended) {
        Membership membership = membershipService.getByTeamIdAndLoggedUser(teamId, authentication);
        return ResponseEntity.ok(extended ? MembershipExtended.get(membership) : membership);
    }

    @GetMapping("/user/logged")
    public ResponseEntity<List<Membership>> getLoggedUserMemberships(
            Authentication authentication,
            @RequestParam(required = false, defaultValue = "false") Boolean extended) {
        List<Membership> memberships = membershipService.getLoggedUserMemberships(authentication);
        return ResponseEntity.ok(extended ? MembershipExtended.get(memberships) : memberships);
    }

    @GetMapping("/paged/user/logged")
    public ResponseEntity<Page<Membership>> getPagedLoggedUserMemberships(
            Authentication authentication,
            @RequestParam(required = false, defaultValue = "false") Boolean extended,
            @RequestParam int page) {
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        Page<Membership> membershipPage = membershipService.getPagedMembershipsByUserId(user.getId(), page);
        return ResponseEntity.ok(extended ? membershipPage.map(MembershipExtended::get) : membershipPage);
    }

    @GetMapping("/team-id/{id}")
    public ResponseEntity<List<Membership>> getMembershipsByTeamId(
            @PathVariable Long id,
            @RequestParam(required = false, defaultValue = "false") Boolean extended) {
        List<Membership> memberships = membershipService.getMembershipsByTeamId(id);
        return ResponseEntity.ok(extended ? MembershipExtended.get(memberships) : memberships);
    }

    @GetMapping("/paged/team/{teamId}")
    public ResponseEntity<Page<Membership>> getPagedMembershipsByTeamId(
            @PathVariable Long teamId,
            @RequestParam(required = false, defaultValue = "false") Boolean extended,
            @RequestParam int page,
            Authentication authentication){
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        membershipService.checkIsUserMemberOfTeam(user, Team.getNewTeamFromId(teamId));
        Page<Membership> membershipPage = membershipService.getPagedMembershipsByTeamId(teamId, page);
        return ResponseEntity.ok(extended ? membershipPage.map(MembershipExtended::get) : membershipPage);
    }

    @GetMapping("/get-amount-of-admin-role-members-by-team-id/{teamId}")
    public ResponseEntity<Integer> getAmountOfAdminRoleMembersByTeamId(@PathVariable Long teamId) {
        return ResponseEntity.ok(membershipService.getAmountOfAdminRoleMembersByTeamId(teamId));
    }

    @PostMapping
    public ResponseEntity<Membership> add(@RequestBody Membership membership) {
        return ResponseEntity.ok(membershipService.add(membership));
    }

    @PostMapping("/add-by-code/{code}")
    public ResponseEntity<Membership> addByCode(@PathVariable String code,
                                                Authentication authentication) {
        return ResponseEntity.ok(membershipService.addByCode(code, authentication));
    }

    @PatchMapping("/membership/{id}")
    public ResponseEntity<Membership> updateMembership(@PathVariable Long id, @RequestBody Membership membership) {
        return ResponseEntity.ok(membershipService.updateRole(id, membership.getMemberRole()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteByTeamId(@PathVariable Long id) {
        membershipService.delete(id);
        return ResponseEntity.ok().build();
    }
}

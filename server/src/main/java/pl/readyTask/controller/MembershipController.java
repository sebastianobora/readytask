package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.readyTask.entity.Membership;
import pl.readyTask.entity.extended.MembershipExtended;
import pl.readyTask.service.MembershipService;

import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping("memberships")
@CrossOrigin("http://localhost:4200")
public class MembershipController {
    private final MembershipService membershipService;

    @GetMapping("/{id}")
    public ResponseEntity<Membership> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(membershipService.getById(id));
    }

    @GetMapping("/user/logged/team/{teamId}")
    public ResponseEntity<Membership> getLoggedUserMembershipByTeamId(
            @PathVariable Long teamId,
            Authentication authentication,
            @RequestParam(required = false, defaultValue = "false") Boolean extended) {
        Membership membership = membershipService.getByAndTeamIdAndLoggedUser(teamId, authentication);
        return ResponseEntity.ok(extended ? MembershipExtended.get(membership) : membership);
    }

    @GetMapping("/team-id/{id}")
    public ResponseEntity<List<Membership>> getMembershipsByTeamId(
            @PathVariable Long id,
            @RequestParam(required = false, defaultValue = "false") Boolean extended) {
        List<Membership> memberships = membershipService.getMembershipsByTeamId(id);
        return ResponseEntity.ok(extended ? MembershipExtended.get(memberships) : memberships);
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

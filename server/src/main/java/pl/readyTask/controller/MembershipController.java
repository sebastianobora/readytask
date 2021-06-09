package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.readyTask.entity.Membership;
import pl.readyTask.service.MembershipService;


@RestController
@AllArgsConstructor
@RequestMapping("memberships")
@CrossOrigin("http://localhost:4200")
public class MembershipController {
    private final MembershipService membershipService;

    @GetMapping("/{id}")
    public ResponseEntity<Membership>getById(@PathVariable("id") Long id){
        return ResponseEntity.ok(membershipService.getById(id));
    }

    @GetMapping("/getByTeamId/{id}")
    public ResponseEntity<Membership>getByTeamId(@PathVariable Long id, Authentication authentication){
        return ResponseEntity.ok(membershipService.getByTeamAndUserId(id, authentication));
    }

    @PostMapping
    public ResponseEntity<Membership> add(@RequestBody Membership membership){
        return ResponseEntity.ok(membershipService.add(membership));
    }

    @PostMapping("/add-by-code/{code}")
    public ResponseEntity<Membership> addByCode(@PathVariable String code,
                                                @RequestBody Membership membership,
                                                Authentication authentication){
        return ResponseEntity.ok(membershipService.addByCode(code, membership, authentication));
    }
}

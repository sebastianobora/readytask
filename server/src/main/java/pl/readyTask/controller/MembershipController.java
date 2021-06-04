package pl.readyTask.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.readyTask.entity.Membership;
import pl.readyTask.service.MembershipService;


@RestController
@AllArgsConstructor
@RequestMapping("memberships")
public class MembershipController {
    private final MembershipService membershipService;

    @GetMapping("/{id}")
    public ResponseEntity<Membership>getById(@PathVariable("id") Long id){
        return ResponseEntity.ok(membershipService.getById(id));
    }
}

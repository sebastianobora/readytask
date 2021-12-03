package pl.readyTask.entity.extended;

import lombok.Getter;
import pl.readyTask.entity.Membership;
import pl.readyTask.entity.Team;
import pl.readyTask.entity.User;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class MembershipExtended extends Membership {
    private final User user;
    private final Team team;

    private MembershipExtended(Membership membership) {
        this.id = membership.getId();
        this.user = membership.getUser();
        this.team = membership.getTeam();
        this.memberFrom = membership.getMemberFrom();
        this.memberRole = membership.getMemberRole();
    }

    public static Membership get(Membership membership) {
        return new MembershipExtended(membership);
    }

    public static List<Membership> get(List<Membership> memberships) {
        return memberships.stream()
                .map(MembershipExtended::new)
                .collect(Collectors.toList());
    }
}

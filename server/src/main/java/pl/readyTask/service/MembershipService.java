package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.Membership;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.MembershipRepository;

@Service
@AllArgsConstructor
public class MembershipService {
    private final MembershipRepository membershipRepository;

    public Membership getById(Long id){
        return membershipRepository.findById(id).orElseThrow(() -> new NoDataFoundException("taskComment", id));
    }
}

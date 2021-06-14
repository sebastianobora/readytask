package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.User;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.UserRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private final SecurityService securityService;
    private final UserRepository userRepository;

    public User getById(Long id){
        return userRepository.findById(id).orElseThrow(() -> new NoDataFoundException("user", id));
    }

    public User getCurrentUser(Authentication authentication) {
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        return userRepository.findById(user.getId()).orElseThrow(() -> new NoDataFoundException("user", user.getId()));
    }

    public List<User> getByTeamId(Long id) {
        return userRepository.findUsersByTeamId(id);
    }
}

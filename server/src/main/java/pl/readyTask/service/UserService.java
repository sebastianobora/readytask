package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.User;
import pl.readyTask.exception.AccessDeniedToActionException;
import pl.readyTask.exception.InvalidPasswordException;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.UserRepository;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class UserService {
    private final SecurityService securityService;
    private final PasswordEncoder encoder;
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

    public User getByUsername(String username){
        return userRepository.findByUsername(username).orElseThrow(() -> new NoDataFoundException("user", username));
    }

    public void deleteCurrentLogged(String password, Authentication authentication) {
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        checkPasswords(encoder.encode(password), user.getPassword());
        userRepository.delete(user);
    }

    public void checkPasswords(String password, String expectedPassword){
        if (!Objects.equals(password, expectedPassword)){
            throw new InvalidPasswordException();
        }
    }
}

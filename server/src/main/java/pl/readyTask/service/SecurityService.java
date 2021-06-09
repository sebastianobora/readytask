package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.readyTask.dto.RegisterRequest;
import pl.readyTask.entity.User;
import pl.readyTask.entity.enumeration.UserRole;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.exception.RegisterException;
import pl.readyTask.repository.UserRepository;
import pl.readyTask.security.CustomUserDetails;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
public class SecurityService implements UserDetailsService {
    private final UserRepository userRepository;
    private final DefaultPlaceholderService defaultPlaceholderService;
    private final PasswordEncoder encoder;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("User with user %s not found", username)));
        return CustomUserDetails.build(user);
    }

    public User getUserByEmailFromAuthentication(Authentication authentication){
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        return userRepository.findUserByEmail(userDetails.getEmail())
                .orElseThrow(()-> new NoDataFoundException("user", userDetails.getEmail()));
    }

    public void register(RegisterRequest request){
        if(userRepository.existsByEmail(request.getEmail())){
            throw new RegisterException("e-mail");
        }
        if(userRepository.existsByUsername(request.getUsername())){
            throw new RegisterException("username");
        }
        User user = getNewUserFromRequest(request);
        userRepository.save(user);
    }

    public User getNewUserFromRequest(RegisterRequest request){
        User user = new User();
        String img = defaultPlaceholderService.getDefaultPlaceholder(request.getFirstName());

        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUserRole(UserRole.ROLE_USER);
        user.setImg(img);
        return user;
    }
}

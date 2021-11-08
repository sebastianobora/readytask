package pl.readyTask.service;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.readyTask.dto.JwtResponse;
import pl.readyTask.dto.LoginRequest;
import pl.readyTask.dto.RegisterRequest;
import pl.readyTask.entity.User;
import pl.readyTask.entity.enumeration.UserRole;
import pl.readyTask.exception.InvalidPasswordException;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.exception.RegisterException;
import pl.readyTask.repository.UserRepository;
import pl.readyTask.security.CustomUserDetails;
import pl.readyTask.security.JwtUtils;

import javax.transaction.Transactional;

@Service
public class SecurityService implements UserDetailsService {
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;

    public SecurityService(UserRepository userRepository,
                           JwtUtils jwtUtils,
                           @Lazy AuthenticationManager authenticationManager,
                           PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.encoder = encoder;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String failureMessage = String.format("User with user %s not found", username);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(failureMessage));
        return CustomUserDetails.build(user);
    }

    public User getUserByEmailFromAuthentication(Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        return userRepository.findByEmail(userDetails.getEmail())
                .orElseThrow(() -> new NoDataFoundException("user", userDetails.getEmail()));
    }

    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RegisterException("e-mail");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RegisterException("username");
        }
        User user = getNewUserFromRequest(request);
        userRepository.save(user);
    }

    public JwtResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwtToken = jwtUtils.generateJwtToken(authentication);
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        return getJwtResponseFromJwtAndUserDetails(jwtToken, userDetails);
    }

    public JwtResponse getJwtResponseFromJwtAndUserDetails(String jwt, CustomUserDetails userDetails) {
        return new JwtResponse(jwt,
                jwtUtils.getTokenPrefix(),
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getListOfAuthorities());
    }

    public User getNewUserFromRequest(RegisterRequest request) {
        User user = new User();

        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(encodePassword(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUserRole(UserRole.ROLE_USER);
        return user;
    }

    public void checkPasswords(String rawPassword, String expectedPassword) {
        if (!encoder.matches(rawPassword, expectedPassword)) {
            throw new InvalidPasswordException();
        }
    }

    public String encodePassword(String password) {
        return encoder.encode(password);
    }
}

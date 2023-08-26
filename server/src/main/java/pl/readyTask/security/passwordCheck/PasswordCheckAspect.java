package pl.readyTask.security.passwordCheck;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import pl.readyTask.entity.User;
import pl.readyTask.service.SecurityService;

@Slf4j
@RequiredArgsConstructor
@Aspect
@Component
public class PasswordCheckAspect {
    private final SecurityService securityService;

    @Before("@annotation(PasswordCheck) && args(passwordChecker, ..)")
    public void checkPasswords(PasswordChecker passwordChecker) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        log.info("Password to check: {}", passwordChecker.getPasswordToCheck());
        securityService.checkPasswords(passwordChecker.getPasswordToCheck(), user.getPassword());
    }
}

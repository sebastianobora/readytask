package pl.readyTask.security.passwordCheck;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface PasswordCheck {
}

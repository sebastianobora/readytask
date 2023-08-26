package pl.readyTask.security.bruteforcePrevention.accessToken;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@RequiredArgsConstructor
@Configuration
public class AccessTokenSecurityFilterConfiguration {
    private final AccessTokenSecurityFilter accessTokenSecurityFilter;

    @Bean
    public FilterRegistrationBean<AccessTokenSecurityFilter> accessTokenSecurityFilterFilterRegistration() {
        FilterRegistrationBean<AccessTokenSecurityFilter> registration = new FilterRegistrationBean<>();
        registration.setFilter(accessTokenSecurityFilter);
        registration.addUrlPatterns("/*");
        registration.setOrder(SecurityProperties.DEFAULT_FILTER_ORDER - 2);
        return registration;
    }
}

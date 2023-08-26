package pl.readyTask.security.bruteforcePrevention.publicEndpoint;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@RequiredArgsConstructor
@Configuration
public class PublicEndpointSecurityFilterConfiguration {
    private final PublicEndpointSecurityFilter publicEndpointSecurityFilter;

    @Bean
    public FilterRegistrationBean<PublicEndpointSecurityFilter> publicEndpointSecurityFilterRegistration() {
        FilterRegistrationBean<PublicEndpointSecurityFilter> registration = new FilterRegistrationBean<>();
        registration.setFilter(publicEndpointSecurityFilter);
        registration.addUrlPatterns("/authentication/*");
        registration.setOrder(SecurityProperties.DEFAULT_FILTER_ORDER - 1);
        return registration;
    }
}

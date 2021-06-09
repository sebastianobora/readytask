package pl.readyTask.security;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pl.readyTask.service.SecurityService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@AllArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private final SecurityService userDetailsService;
    private final AuthEntryPoint unauthorizedHandler;
    private final PasswordConfig passwordConfig;
    private final JwtUtils jwtUtils;

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        //TODO: change to provider
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordConfig.passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors().and().csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .addFilterBefore(new AuthenticationFilter(jwtUtils, userDetailsService), UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling().authenticationEntryPoint(unauthorizedHandler)
            .and()
            .authorizeRequests()
            .antMatchers("/authentication/register").permitAll()
            .antMatchers("/authentication/login").permitAll()
            .anyRequest().authenticated();
    }
}

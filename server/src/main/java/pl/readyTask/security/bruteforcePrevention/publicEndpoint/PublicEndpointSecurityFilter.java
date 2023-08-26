package pl.readyTask.security.bruteforcePrevention.publicEndpoint;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;
import pl.readyTask.exception.TooManyRequestsException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class PublicEndpointSecurityFilter extends OncePerRequestFilter {
    private final PublicEndpointSecurityService publicEndpointSecurityService;
    private final HandlerExceptionResolver handlerExceptionResolver;
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest httpServletRequest,
                                    @NonNull HttpServletResponse httpServletResponse,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        try {
            publicEndpointSecurityService.checkIfRemoteAddressIsBlocked();
            publicEndpointSecurityService.reportAttempt();
            filterChain.doFilter(httpServletRequest, httpServletResponse);
        } catch (TooManyRequestsException e) {
            handlerExceptionResolver.resolveException(httpServletRequest, httpServletResponse, null, e);
        }
    }
}

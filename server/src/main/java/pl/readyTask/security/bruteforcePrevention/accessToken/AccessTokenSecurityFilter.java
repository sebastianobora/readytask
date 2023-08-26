package pl.readyTask.security.bruteforcePrevention.accessToken;

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
public class AccessTokenSecurityFilter extends OncePerRequestFilter {
    private final AccessTokenSecurityService accessTokenSecurityService;
    private final HandlerExceptionResolver handlerExceptionResolver;
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest httpServletRequest,
                                    @NonNull HttpServletResponse httpServletResponse,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        try {
            accessTokenSecurityService.checkIfRemoteAddressIsBlocked();
            filterChain.doFilter(httpServletRequest, httpServletResponse);
        } catch (TooManyRequestsException e) {
            handlerExceptionResolver.resolveException(httpServletRequest, httpServletResponse, null, e);
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String urlToIgnore = "/authentication";
        return request.getRequestURI().startsWith(urlToIgnore);
    }
}

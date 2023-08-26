package pl.readyTask.security.bruteforcePrevention.publicEndpoint;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.LoadingCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.readyTask.security.bruteforcePrevention.BruteforcePreventionService;
import pl.readyTask.utils.CacheUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.concurrent.TimeUnit;

@Service
public class PublicEndpointSecurityService extends BruteforcePreventionService {
    @Autowired
    public PublicEndpointSecurityService(HttpServletRequest request) {
        super(request);
    }

    @Override
    protected int maxAttempts() {
        return 10;
    }

    @Override
    protected LoadingCache<String, Integer> loadingCache() {
        return CacheBuilder.newBuilder()
                .expireAfterAccess(10, TimeUnit.MINUTES)
                .build(CacheUtils.getCacheLoaderWithDefaultZero());
    }

    @Override
    protected String blockedRemoteAddressAttemptMessage(String remoteAddress) {
        String messageTemplate = "PublicEndpointSecurity - Remote address: %s blocked due to potential bruteforce";
        return String.format(messageTemplate, remoteAddress);
    }
}

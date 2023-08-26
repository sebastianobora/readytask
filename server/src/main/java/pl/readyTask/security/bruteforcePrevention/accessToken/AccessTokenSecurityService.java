package pl.readyTask.security.bruteforcePrevention.accessToken;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.LoadingCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.readyTask.security.bruteforcePrevention.BruteforcePreventionService;
import pl.readyTask.utils.CacheUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.concurrent.TimeUnit;

@Service
public class AccessTokenSecurityService extends BruteforcePreventionService {
    @Autowired
    public AccessTokenSecurityService(HttpServletRequest request) {
        super(request);
    }

    @Override
    protected int maxAttempts() {
        return 15;
    }

    @Override
    protected LoadingCache<String, Integer> loadingCache() {
        return CacheBuilder.newBuilder()
                .expireAfterAccess(5, TimeUnit.MINUTES)
                .build(CacheUtils.getCacheLoaderWithDefaultZero());
    }

    @Override
    protected String blockedRemoteAddressAttemptMessage(String remoteAddress) {
        String messageTemplate = "AccessTokenSecurity - Remote address: %s blocked due to potential bruteforce";
        return String.format(messageTemplate, remoteAddress);
    }
}

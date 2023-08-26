package pl.readyTask.security.bruteforcePrevention;

import com.google.common.cache.LoadingCache;
import lombok.extern.slf4j.Slf4j;
import pl.readyTask.exception.TooManyRequestsException;
import pl.readyTask.utils.HttpRequestUtils;

import javax.servlet.http.HttpServletRequest;

@Slf4j
public abstract class BruteforcePreventionService {
    private final HttpServletRequest request;
    private final int maxAttempt;
    private final LoadingCache<String, Integer> attemptsHolder;

    public BruteforcePreventionService(HttpServletRequest request) {
        this.request = request;
        this.maxAttempt = maxAttempts();
        this.attemptsHolder = loadingCache();
    }

    protected abstract int maxAttempts();

    protected abstract LoadingCache<String, Integer> loadingCache();

    final public void reportAttempt() {
        String remoteAddress = HttpRequestUtils.extractRemoteAddress(request);
        Integer attempts = attemptsHolder.getUnchecked(remoteAddress) + 1;
        attemptsHolder.put(remoteAddress, attempts);
    }

    final public void checkIfRemoteAddressIsBlocked() {
        String remoteAddress = HttpRequestUtils.extractRemoteAddress(request);
        if (attemptsHolder.getUnchecked(remoteAddress) >= maxAttempt) {
            log.warn(blockedRemoteAddressAttemptMessage(remoteAddress));
            throw new TooManyRequestsException();
        }
    }

    protected String blockedRemoteAddressAttemptMessage(String remoteAddress) {
        return String.format("Blocked remote address: %s trying make request", remoteAddress);
    }
}

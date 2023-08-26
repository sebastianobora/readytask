package pl.readyTask.security.bruteforcePrevention;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.LoadingCache;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import pl.readyTask.exception.TooManyRequestsException;
import pl.readyTask.utils.CacheUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class BruteforcePreventionServiceTest {
    private final int TEST_MAX_ATTEMPTS = 5;
    private final LoadingCache<String, Integer> TEST_CACHE_LOADER = CacheBuilder.newBuilder()
            .expireAfterAccess(5, TimeUnit.MINUTES)
            .build(CacheUtils.getCacheLoaderWithDefaultZero());

    private BruteforcePreventionService bruteforcePreventionService;

    @BeforeEach
    void setUp() {
        HttpServletRequest requestMock = mock(HttpServletRequest.class);
        when(requestMock.getRemoteAddr()).thenReturn("test_ip_address");
        bruteforcePreventionService = new BruteforcePreventionService(requestMock) {
            @Override
            protected int maxAttempts() {
                return TEST_MAX_ATTEMPTS;
            }

            @Override
            protected LoadingCache<String, Integer> loadingCache() {
                return TEST_CACHE_LOADER;
            }
        };
    }

    @Test
    void whenReportedLessThanMaxAttemptsThenCheckIfAddressIsBlockedShouldNotThrowException() {
        for (int i = 0; i < TEST_MAX_ATTEMPTS - 1; i++) {
            bruteforcePreventionService.reportAttempt();
        }
        assertDoesNotThrow(() -> bruteforcePreventionService.checkIfRemoteAddressIsBlocked());
    }

    @Test
    void whenReportedMoreOrEqualToMaxMaxAttemptsThenCheckIfAddressIsBlockedShouldThrowTooManyRequestsException() {
        for (int i = 0; i < TEST_MAX_ATTEMPTS; i++) {
            bruteforcePreventionService.reportAttempt();
        }
        assertThrows(TooManyRequestsException.class, () -> bruteforcePreventionService.checkIfRemoteAddressIsBlocked());
    }
}

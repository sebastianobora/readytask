package pl.readyTask.utils;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

public class HttpRequestUtils {
    private static final String XFF_HEADER_KEY = "X-Forwarder-For";

    public static String extractRemoteAddress(HttpServletRequest request) {
        final String xffHeader = request.getHeader(XFF_HEADER_KEY);
        if (Objects.isNull(xffHeader) || xffHeader.isEmpty() || !xffHeader.contains(request.getRemoteAddr())) {
            return request.getRemoteAddr();
        }
        return extractRemoteAddressFromXFF(xffHeader);
    }

    private static String extractRemoteAddressFromXFF(String xffHeader) {
        return xffHeader.split(",")[0];
    }
}

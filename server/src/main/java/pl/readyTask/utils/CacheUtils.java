package pl.readyTask.utils;

import com.google.common.cache.CacheLoader;
import org.springframework.lang.NonNull;

public class CacheUtils {
    public static <T> CacheLoader<T, Integer> getCacheLoaderWithDefaultZero() {
        return getCacheLoaderWithDefaultValue(0);
    }

    private static <T, K> CacheLoader<T, K> getCacheLoaderWithDefaultValue(K defaultValue) {
        return new CacheLoader<>() {
            @NonNull
            @Override
            public K load(@NonNull final T key) {
                return defaultValue;
            }
        };
    }
}

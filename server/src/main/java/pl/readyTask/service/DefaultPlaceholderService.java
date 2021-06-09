package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DefaultPlaceholderService {
    public String getDefaultPlaceholder(String text){
        String defaultImgUrlBase = "https://fakeimg.pl/180/75418d/ffffff?text=";
        String defaultImgSettings = "&font_size=65&font=bebas";
        return defaultImgUrlBase + text.substring(0, 1).toUpperCase() + defaultImgSettings;
    }
}

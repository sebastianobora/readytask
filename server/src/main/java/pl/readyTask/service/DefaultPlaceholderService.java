package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DefaultPlaceholderService {
    public String getPlaceholder(String text, String backgroundColor, String fontColor){
        String defaultImgUrlBase = String.format("https://fakeimg.pl/180/%s/%s?text=", backgroundColor, fontColor);
        String defaultImgSettings = "&font_size=75&font=bebas";
        return defaultImgUrlBase + text.substring(0, 1).toUpperCase() + defaultImgSettings;
    }

    public String getUserPlaceholder(String text){
        String backgroundColor = "333333";
        String fontColor = "75418D";
        return this.getPlaceholder(text, backgroundColor, fontColor);
    }

    public String getTeamPlaceholder(String text){
        String backgroundColor = "75419d";
        String fontColor = "FFFFFF";
        return this.getPlaceholder(text, backgroundColor, fontColor);
    }
}

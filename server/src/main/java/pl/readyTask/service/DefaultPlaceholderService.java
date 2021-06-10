package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DefaultPlaceholderService {
    public String getPlaceholder(String text, String backgroundColor, String fontColor, String fontSize){
        String defaultImgUrlBase = String.format("https://fakeimg.pl/180/%s/%s?text=", backgroundColor, fontColor);
        String defaultImgSettings = String.format("&font_size=%s&font=bebas", fontSize);
        return defaultImgUrlBase + text.substring(0, 1).toUpperCase() + defaultImgSettings;
    }

    public String getUserPlaceholder(String text){
        String backgroundColor = "333333";
        String fontColor = "FFFFFF";
        String fontSize = "95";
        return this.getPlaceholder(text, backgroundColor, fontColor, fontSize);
    }

    public String getTeamPlaceholder(String text){
        String backgroundColor = "75419d";
        String fontColor = "FFFFFF";
        String fontSize = "75";
        return this.getPlaceholder(text, backgroundColor, fontColor, fontSize);
    }
}

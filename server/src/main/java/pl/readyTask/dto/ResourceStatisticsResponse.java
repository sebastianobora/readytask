package pl.readyTask.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResourceStatisticsResponse {
    private Boolean isLiked;
    private int likes;
    private int dislikes;
}

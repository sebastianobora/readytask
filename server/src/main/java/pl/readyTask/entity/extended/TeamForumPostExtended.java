package pl.readyTask.entity.extended;

import pl.readyTask.entity.Task;
import pl.readyTask.entity.Team;
import pl.readyTask.entity.TeamForumPost;
import pl.readyTask.entity.User;

import java.util.List;
import java.util.stream.Collectors;

public class TeamForumPostExtended extends TeamForumPost {
    private final User user;
    private final Team team;

    public TeamForumPostExtended(TeamForumPost teamForumPost) {
        this.message = teamForumPost.getMessage();
        this.creationTime = teamForumPost.getCreationTime();
        this.updateTime = teamForumPost.getUpdateTime();
        this.user = teamForumPost.getUser();
        this.team = teamForumPost.getTeam();
    }

    public static TeamForumPost get(TeamForumPost teamForumPost) {
        return new TeamForumPostExtended(teamForumPost);
    }

    public static List<TeamForumPost> get(List<TeamForumPost> posts) {
        return posts.stream()
                .map(TeamForumPostExtended::new)
                .collect(Collectors.toList());
    }
}

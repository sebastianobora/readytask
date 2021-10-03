package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import pl.readyTask.dto.ResourceStatisticsResponse;
import pl.readyTask.entity.SocialResourceReaction;
import pl.readyTask.entity.Team;
import pl.readyTask.entity.TeamForumPost;
import pl.readyTask.entity.User;
import pl.readyTask.exception.AccessDeniedToActionException;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.SocialResourceReactionRepository;

@Service
@AllArgsConstructor
public class SocialResourceReactionService {
    private final SocialResourceReactionRepository socialResourceReactionRepository;
    private final SecurityService securityService;
    private final MembershipService membershipService;

    public void addPostReaction(Authentication authentication, TeamForumPost teamForumPost, boolean isPositive){
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        checkUserIsAllowedToActionOnPost(user, teamForumPost.getTeam());
        addReaction(teamForumPost.getId(), user.getId(), isPositive);
    }

    public void swapPostReaction(Authentication authentication, TeamForumPost teamForumPost){
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        checkUserIsAllowedToActionOnPost(user, teamForumPost.getTeam());
        swapReaction(teamForumPost.getId(), user.getId());
    }

    public void deletePostReaction(Authentication authentication, TeamForumPost teamForumPost){
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        checkUserIsAllowedToActionOnPost(user, teamForumPost.getTeam());
        deleteReaction(teamForumPost.getId(), user.getId());
    }

    private void addReaction(Long resourceId, Long userId, boolean isPositive){
        SocialResourceReaction reaction = getNewSocialResourceReaction(isPositive, userId, resourceId);
        socialResourceReactionRepository.save(reaction);
    }

    private void swapReaction(Long resourceId, Long userId){
        SocialResourceReaction reaction = getSafeReactionByResourceIdAndUserId(resourceId, userId);
        reaction.setPositive(!reaction.isPositive());
        socialResourceReactionRepository.save(reaction);
    }

    public void deleteReaction(Long resourceId, Long userId){
        socialResourceReactionRepository.deleteBySocialResourceIdAndUserId(resourceId, userId);
    }

    public ResourceStatisticsResponse getResourceStatistics(Authentication authentication, Long resourceId) {
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        return getNewResourceStatisticsResponse(resourceId, user.getId());
    }

    private ResourceStatisticsResponse getNewResourceStatisticsResponse(Long resourceId, Long userId){
        ResourceStatisticsResponse response = new ResourceStatisticsResponse();
        response.setLikes(socialResourceReactionRepository
                .countAllBySocialResourceIdAndUserIdAndPositiveEquals(resourceId, userId, true));
        response.setDislikes(socialResourceReactionRepository
                .countAllBySocialResourceIdAndUserIdAndPositiveEquals(resourceId, userId, false));
        socialResourceReactionRepository.getIsLiked(resourceId, userId).ifPresent(response::setIsLiked);
        return response;
    }

    private SocialResourceReaction getSafeReactionByResourceIdAndUserId(Long resourceId, Long userId){
        return socialResourceReactionRepository
                .findBySocialResourceIdAndUserId(resourceId, userId)
                .orElseThrow(() -> new NoDataFoundException("SocialResourceReaction"));
    }

    private SocialResourceReaction getNewSocialResourceReaction(boolean isPositive, Long userId, Long resourceId){
        SocialResourceReaction socialResourceReaction = new SocialResourceReaction();
        socialResourceReaction.setPositive(isPositive);
        socialResourceReaction.setUserById(userId);
        socialResourceReaction.setSocialResourceById(resourceId);
        return socialResourceReaction;
    }

    private void checkUserIsAllowedToActionOnPost(User user, Team team){
        String action = "add / update / delete reaction on post";
        if(!membershipService.isUserMemberOfTeam(user, team)) {
            throw new AccessDeniedToActionException(user, action);
        }
    }
}

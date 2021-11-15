package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import pl.readyTask.dto.ResourceStatisticsResponse;
import pl.readyTask.entity.*;
import pl.readyTask.exception.AccessDeniedToActionException;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.SocialResourceReactionRepository;

@Service
@AllArgsConstructor
public class SocialResourceReactionService {
    private final SocialResourceReactionRepository socialResourceReactionRepository;
    private final SecurityService securityService;
    private final MembershipService membershipService;
    private final TeamForumPostService teamForumPostService;

    public ResourceStatisticsResponse addPostReaction(Authentication authentication, Long postId, boolean isPositive) {
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        TeamForumPost post = teamForumPostService.getById(postId);
        checkUserIsAllowedToActionOnPost(user, post.getTeam());
        addReaction(post.getId(), user.getId(), isPositive);
        return getResourceStatistics(post.getId(), user.getId());
    }

    public ResourceStatisticsResponse swapPostReaction(Authentication authentication, Long postId) {
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        TeamForumPost post = teamForumPostService.getById(postId);
        checkUserIsAllowedToActionOnPost(user, post.getTeam());
        swapReaction(post.getId(), user.getId());
        return getResourceStatistics(post.getId(), user.getId());
    }

    public ResourceStatisticsResponse deletePostReaction(Authentication authentication, Long postId) {
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        TeamForumPost post = teamForumPostService.getById(postId);
        checkUserIsAllowedToActionOnPost(user, post.getTeam());
        deleteReaction(post.getId(), user.getId());
        return getResourceStatistics(post.getId(), user.getId());
    }

    private void addReaction(Long resourceId, Long userId, boolean isPositive) {
        SocialResourceReaction reaction = getNewSocialResourceReaction(isPositive, userId, resourceId);
        socialResourceReactionRepository.save(reaction);
    }

    private void swapReaction(Long resourceId, Long userId) {
        SocialResourceReaction reaction = getSafeReactionByResourceIdAndUserId(resourceId, userId);
        reaction.setPositive(!reaction.isPositive());
        socialResourceReactionRepository.save(reaction);
    }

    public void deleteReaction(Long resourceId, Long userId) {
        socialResourceReactionRepository.deleteBySocialResourceIdAndUserId(resourceId, userId);
    }

    public ResourceStatisticsResponse getResourceStatistics(Authentication authentication, Long resourceId) {
        User user = securityService.getUserByEmailFromAuthentication(authentication);
        return getResourceStatistics(resourceId, user.getId());
    }

    private ResourceStatisticsResponse getResourceStatistics(Long resourceId, Long userId) {
        ResourceStatisticsResponse response = new ResourceStatisticsResponse();
        response.setLikes(socialResourceReactionRepository
                .countAllBySocialResourceIdAndPositiveEquals(resourceId, true));
        response.setDislikes(socialResourceReactionRepository
                .countAllBySocialResourceIdAndPositiveEquals(resourceId, false));
        socialResourceReactionRepository.getIsLiked(resourceId, userId).ifPresent(response::setIsLiked);
        return response;
    }

    private SocialResourceReaction getSafeReactionByResourceIdAndUserId(Long resourceId, Long userId) {
        return socialResourceReactionRepository
                .findBySocialResourceIdAndUserId(resourceId, userId)
                .orElseThrow(() -> new NoDataFoundException("SocialResourceReaction"));
    }

    private SocialResourceReaction getNewSocialResourceReaction(boolean isPositive, Long userId, Long resourceId) {
        SocialResourceReaction socialResourceReaction = new SocialResourceReaction();
        socialResourceReaction.setPositive(isPositive);
        socialResourceReaction.setUserById(userId);
        socialResourceReaction.setSocialResourceById(resourceId);
        return socialResourceReaction;
    }

    private void checkUserIsAllowedToActionOnPost(User user, Team team) {
        String action = "add / update / delete reaction on post";
        if (!membershipService.isUserMemberOfTeam(user, team)) {
            throw new AccessDeniedToActionException(user, action);
        }
    }
}

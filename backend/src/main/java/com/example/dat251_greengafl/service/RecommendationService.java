package com.example.dat251_greengafl.service;

import com.example.dat251_greengafl.dto.RecommendationDto;
import com.example.dat251_greengafl.entities.UserEntity;
import com.example.dat251_greengafl.entities.UserProfile;
import com.example.dat251_greengafl.model.Difficulty;
import com.example.dat251_greengafl.model.FoodCategory;
import com.example.dat251_greengafl.model.Recipe;
import com.example.dat251_greengafl.repo.RecipeRepo;
import com.example.dat251_greengafl.repo.UserProfileRepo;
import com.example.dat251_greengafl.repo.UserRepo;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class RecommendationService {

    private final UserRepo userRepo;
    private final RecipeRepo recipeRepo;
    private final UserProfileRepo userProfileRepo;
    private final EntityManager entityManager;

    public RecommendationService(UserRepo userRepo, RecipeRepo recipeRepo, UserProfileRepo userProfileRepo, EntityManager entityManager) {
        this.userRepo = userRepo;
        this.recipeRepo = recipeRepo;
        this.userProfileRepo = userProfileRepo;
        this.entityManager = entityManager;
    }
    @Transactional
    public void recordSelection(Long userId, UUID recipeId) {
        if (userId == null || recipeId == null) {
            throw new IllegalArgumentException("need userid and recipeid");
        }

        UserEntity user = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Recipe recipe = recipeRepo.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("recipe not found"));

        UserProfile profile = userProfileRepo.findById(userId).orElse(null);
        boolean isNew = false;

        if (profile == null) {
            profile = new UserProfile();
            profile.setUser(user);
            isNew = true;
        }

        profile.registerSelection(
                recipe.getCookingTime(),
                recipe.getDifficulty(),
                recipe.getCategories() == null ? java.util.List.of() : recipe.getCategories()
        );

        if (isNew) {
            entityManager.persist(profile);
        } else {
            userProfileRepo.save(profile);
        }
    }


    @Transactional
    public List<RecommendationDto> recommend(Long userId, int limit) {
        if (userId == null) {
            throw new IllegalArgumentException("userId is required");
        }

        int safeLimit = limit <= 0 ? 10 : limit;
        List<Recipe> allRecipes = recipeRepo.findAll();

        if (allRecipes.isEmpty()) {
            return List.of();
        }

        UserProfile profile = userProfileRepo.findById(userId).orElse(null);

        if (profile == null || profile.getSelectionCount() == 0) {
            return allRecipes.stream()
                    .limit(safeLimit)
                    .map(r -> toDto(r, 0.0))
                    .toList();
        }

        Map<FoodCategory, Integer> categoryScores =
                profile.getCategoryScores() != null ? profile.getCategoryScores() : Map.of();

        Map<Difficulty, Integer> difficultyScores =
                profile.getDifficultyScores() != null ? profile.getDifficultyScores() : Map.of();

        double avgTime = profile.getAverageCookingTime();

        System.out.println("[recommend] userId=" + userId
                + " selectionCount=" + profile.getSelectionCount()
                + " avgTime=" + avgTime
                + " difficultyScores=" + difficultyScores
                + " categoryScores=" + categoryScores);

        return allRecipes.stream()
                .map(r -> {
                    double score = scoreRecipe(r, categoryScores, difficultyScores, avgTime);
                    System.out.println("[recommend] recipe=" + r.getName()
                            + " difficulty=" + r.getDifficulty()
                            + " cookingTime=" + r.getCookingTime()
                            + " categories=" + r.getCategories()
                            + " score=" + score);
                    return new ScoredRecipe(r, score);
                })
                .sorted(Comparator.comparingDouble(ScoredRecipe::score).reversed())
                .limit(safeLimit)
                .map(sr -> toDto(sr.recipe(), sr.score()))
                .toList();
    }

    private RecommendationDto toDto(Recipe recipe, double score) {
        return new RecommendationDto(
                recipe.getId(),
                recipe.getName(),
                recipe.getInstructions(),
                recipe.getCookingTime(),
                recipe.getDifficulty() != null ? recipe.getDifficulty().name() : null,
                null,
                null,
                score
        );
    }

    private record ScoredRecipe(Recipe recipe, double score) {}

    private double scoreRecipe(
            Recipe recipe,
            Map<FoodCategory, Integer> categoryScores,
            Map<Difficulty, Integer> difficultyScores,
            double averageCookingTime
    ) {
        double score = 0.0;

        if (recipe.getCategories() != null) {
            for (FoodCategory category : recipe.getCategories()) {
                score += categoryScores.getOrDefault(category, 0);
            }
        }

        if (recipe.getDifficulty() != null) {
            score += difficultyScores.getOrDefault(recipe.getDifficulty(), 0) * 1.5;
        }

        if (recipe.getCookingTime() != null && averageCookingTime > 0) {
            double diff = Math.abs(recipe.getCookingTime() - averageCookingTime);
            score += Math.max(0.0, 10.0 - (diff / 5.0));
        }

        return score;
    }
}

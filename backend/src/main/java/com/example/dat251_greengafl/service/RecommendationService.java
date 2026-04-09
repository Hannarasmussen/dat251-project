package com.example.dat251_greengafl.service;

import com.example.dat251_greengafl.entities.UserEntity;
import com.example.dat251_greengafl.entities.UserProfile;
import com.example.dat251_greengafl.model.FoodCategory;
import com.example.dat251_greengafl.model.Recipe;
import com.example.dat251_greengafl.repo.RecipeRepo;
import com.example.dat251_greengafl.repo.UserProfileRepo;
import com.example.dat251_greengafl.repo.UserRepo;
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

    public RecommendationService(UserRepo userRepo, RecipeRepo recipeRepo, UserProfileRepo userProfileRepo) {
        this.userRepo = userRepo;
        this.recipeRepo = recipeRepo;
        this.userProfileRepo = userProfileRepo;
    }

    @Transactional
    public void recordSelection(Long userId, UUID recipeId) {
        if (userId == null || recipeId == null) {
            throw new IllegalArgumentException("need userid and recipeid");
        }

        UserEntity u = userRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        Recipe r = recipeRepo.findById(recipeId).orElseThrow(() -> new IllegalArgumentException("recipe not found"));

        //find or create
        UserProfile profile = userProfileRepo.findById(userId).orElseGet(() -> {
            UserProfile p = new UserProfile();
            p.setUser(u);
            return p;
        });

        profile.registerSelection(
                r.getCookingTime(),
                r.getDifficulty(),
                r.getCategories()
        );

        userProfileRepo.save(profile);
    }

    @Transactional
    public List<Recipe> recommend(Long userId, int limit) {
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
                    .toList();
        }

        Map<FoodCategory, Integer> categoryScores = profile.getCategoryScores();
        var difficultyScores = profile.getDifficultyScores();
        double avgTime = profile.getAverageCookingTime();

        return allRecipes.stream()
                .sorted(Comparator.comparingDouble((Recipe r) ->
                        scoreRecipe(r, categoryScores, difficultyScores, avgTime)).reversed())
                .limit(safeLimit)
                .toList();
    }

    private double scoreRecipe(
            Recipe recipe,
            Map<FoodCategory, Integer> categoryScores,
            Map<?, Integer> difficultyScores,
            double averageCookingTime
    ) {
        double score = 0.0;

        for (FoodCategory category : recipe.getCategories()) {
            score += categoryScores.getOrDefault(category, 0);
        }

        if (recipe.getDifficulty() != null) {
            score += difficultyScores.getOrDefault(recipe.getDifficulty(), 0) * 1.5;
        }

        if (recipe.getCookingTime() != null) {
            double diff = Math.abs(recipe.getCookingTime() - averageCookingTime);
            score += Math.max(0.0, 10.0 - (diff / 5.0));
        }

        return score;
    }
}

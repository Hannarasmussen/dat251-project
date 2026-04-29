package com.example.dat251_greengafl.service;

import com.example.dat251_greengafl.dto.RecommendationDto;
import com.example.dat251_greengafl.entities.UserEntity;
import com.example.dat251_greengafl.entities.UserProfile;
import com.example.dat251_greengafl.repo.UserProfileRepo;
import com.example.dat251_greengafl.repo.UserRepo;
import com.example.dat251_greengafl.the_meal_db_client.Client.DetailedRecipe;
import com.example.dat251_greengafl.the_meal_db_client.Client.Recipe;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class RecommendationService {

    private final UserProfileRepo userProfileRepo;
    private final UserRepo userRepo;
    private final RecipeService recipeService;

    public RecommendationService(UserProfileRepo userProfileRepo, UserRepo userRepo, RecipeService recipeService) {
        this.userProfileRepo = userProfileRepo;
        this.userRepo = userRepo;
        this.recipeService = recipeService;
    }

    @Transactional
    public void recordSelection(Long userId, String recipeId) {
        UserProfile profile = getOrCreateProfile(userId);

        DetailedRecipe selected = recipeService.getRecipeDetails(recipeId);
        if (selected == null) return;

        profile.bumpRecipe(recipeId);
        profile.bumpCategory(selected.category());

        userProfileRepo.save(profile);
    }

    @Transactional(readOnly = true)
    public List<RecommendationDto> recommend(Long userId, int limit) {
        UserProfile profile = userProfileRepo.findById(userId).orElse(null);
        if (profile == null) return List.of();

        Map<String, Integer> categoryScores = profile.getCategoryScores();
        Map<String, Integer> recipeScores = profile.getRecipeScores();

        List<RecommendationDto> out = new ArrayList<>();

        for (String category : recipeService.getAllCategories()) {
            int categoryScore = categoryScores.getOrDefault(category, 0);

            for (Recipe r : recipeService.getRecipesByCategory(category)) {
                int seenRecipeBoost = recipeScores.getOrDefault(r.idMeal(), 0);
                double score = (categoryScore * 1.0) + (seenRecipeBoost * 0.5);

                out.add(new RecommendationDto(
                        r.idMeal(),
                        r.strMeal(),
                        r.strMealThumb(),
                        category,
                        score
                ));
            }
        }

        return out.stream()
                .sorted(Comparator.comparingDouble(RecommendationDto::score).reversed())
                .limit(Math.max(limit, 1))
                .toList();
    }

    private UserProfile getOrCreateProfile(Long userId) {
        return userProfileRepo.findById(userId).orElseGet(() -> {
            UserEntity user = userRepo.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));

            UserProfile p = new UserProfile();
            p.setUser(user); // MapsId sets userId
            return p;
        });
    }
}
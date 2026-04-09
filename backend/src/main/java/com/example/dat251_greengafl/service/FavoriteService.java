package com.example.dat251_greengafl.service;

import com.example.dat251_greengafl.dto.RecipeSummaryDto;
import com.example.dat251_greengafl.entities.UserEntity;
import com.example.dat251_greengafl.model.Recipe;
import com.example.dat251_greengafl.repo.RecipeRepo;
import com.example.dat251_greengafl.repo.UserRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FavoriteService {

    private final UserRepo userRepo;
    private final RecipeRepo recipeRepo;

    public FavoriteService(UserRepo userRepo, RecipeRepo recipeRepo) {
        this.userRepo = userRepo;
        this.recipeRepo = recipeRepo;
    }

    @Transactional(readOnly = true)
    public List<RecipeSummaryDto> getFavorites(String username) {
        return userRepo.findByUsername(username)
                .map(user -> user.getFavoriteRecipes().stream()
                        .map(r -> new RecipeSummaryDto(
                                r.getId(),
                                r.getName(),
                                r.getCookingTime(),
                                r.getDifficulty() != null ? r.getDifficulty().name() : null))
                        .toList())
                .orElse(List.of());
    }

    @Transactional(readOnly = true)
    public boolean isFavorited(String username, UUID recipeId) {
        return userRepo.findByUsername(username)
                .map(user -> user.getFavoriteRecipes().stream()
                        .anyMatch(r -> r.getId().equals(recipeId)))
                .orElse(false);
    }

    @Transactional
    public boolean addFavorite(String username, UUID recipeId) {
        Optional<UserEntity> userOpt = userRepo.findByUsername(username);
        Optional<Recipe> recipeOpt = recipeRepo.findById(recipeId);

        if (userOpt.isEmpty() || recipeOpt.isEmpty()) {
            return false;
        }

        UserEntity user = userOpt.get();
        boolean alreadyFavorited = user.getFavoriteRecipes().stream()
                .anyMatch(r -> r.getId().equals(recipeId));
        if (alreadyFavorited) {
            return true;
        }
        user.getFavoriteRecipes().add(recipeOpt.get());
        userRepo.save(user);
        return true;
    }

    @Transactional
    public boolean removeFavorite(String username, UUID recipeId) {
        Optional<UserEntity> userOpt = userRepo.findByUsername(username);
        if (userOpt.isEmpty()) {
            return false;
        }

        UserEntity user = userOpt.get();
        boolean removed = user.getFavoriteRecipes().removeIf(r -> r.getId().equals(recipeId));
        if (removed) {
            userRepo.save(user);
        }
        return removed;
    }
}

package com.example.dat251_greengafl.controller;

import com.example.dat251_greengafl.dto.RecipeSummaryDto;
import com.example.dat251_greengafl.service.FavoriteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping
    public List<RecipeSummaryDto> getFavorites(Authentication authentication) {
        return favoriteService.getFavorites(authentication.getName());
    }

    @GetMapping("/{recipeId}")
    public ResponseEntity<Boolean> isFavorited(
            @PathVariable UUID recipeId,
            Authentication authentication) {
        boolean favorited = favoriteService.isFavorited(authentication.getName(), recipeId);
        return ResponseEntity.ok(favorited);
    }

    @PostMapping("/{recipeId}")
    public ResponseEntity<Void> addFavorite(
            @PathVariable UUID recipeId,
            Authentication authentication) {
        boolean added = favoriteService.addFavorite(authentication.getName(), recipeId);
        return added
                ? ResponseEntity.status(HttpStatus.CREATED).build()
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{recipeId}")
    public ResponseEntity<Void> removeFavorite(
            @PathVariable UUID recipeId,
            Authentication authentication) {
        boolean removed = favoriteService.removeFavorite(authentication.getName(), recipeId);
        return removed
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}

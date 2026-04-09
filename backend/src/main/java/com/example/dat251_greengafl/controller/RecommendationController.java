package com.example.dat251_greengafl.controller;

import com.example.dat251_greengafl.model.Recipe;
import com.example.dat251_greengafl.dto.RecommendationDto;
import com.example.dat251_greengafl.service.RecommendationService;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @PostMapping("/select/{recipeId}")
    public ResponseEntity<Map<String, Object>> recordSelection(
            @RequestParam Long userId,
            @PathVariable UUID recipeId
    ) {
        try {
            recommendationService.recordSelection(userId, recipeId);
            return ResponseEntity.ok(Map.of("success", true));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("success", false, "error", ex.getMessage()));
        }
    }

    @GetMapping
    public List<RecommendationDto> recommend(
            @RequestParam Long userId,
            @RequestParam(defaultValue = "10") int limit
    ) {
        return recommendationService.recommend(userId, limit);
    }

}

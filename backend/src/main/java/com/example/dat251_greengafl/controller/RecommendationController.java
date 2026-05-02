package com.example.dat251_greengafl.controller;

import com.example.dat251_greengafl.dto.RecommendationDto;
import com.example.dat251_greengafl.service.RecommendationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @PostMapping("/select")
    public void recordSelection(@RequestParam Long userId, @RequestParam String recipeId) {
        recommendationService.recordSelection(userId, recipeId);
    }

    @GetMapping
    public List<RecommendationDto> recommend(
            @RequestParam Long userId,
            @RequestParam(defaultValue = "10") int limit
    ) {
        return recommendationService.recommend(userId, limit);
    }
}
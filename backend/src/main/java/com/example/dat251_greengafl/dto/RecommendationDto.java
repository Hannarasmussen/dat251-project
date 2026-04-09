package com.example.dat251_greengafl.dto;

import java.util.UUID;

public record RecommendationDto(
        UUID id,
        String name,
        String instructions,
        Integer cookingTime,
        String difficulty,
        String cuisine,
        String imageUrl,
        Double score
) {}

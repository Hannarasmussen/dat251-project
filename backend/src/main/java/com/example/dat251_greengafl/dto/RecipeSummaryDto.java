package com.example.dat251_greengafl.dto;

import java.util.UUID;

public record RecipeSummaryDto(
    UUID id,
    String name,
    Integer cookingTime,
    String difficulty
) {}

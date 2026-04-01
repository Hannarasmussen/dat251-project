package com.example.dat251_greengafl.dto;

public record RecipeCatalogItem(
    String name,
    String instructions,
    Integer cookingTime,
    String difficulty,
    String cuisine,
    String imageUrl
) {}

package com.example.dat251_greengafl.controller;

import com.example.dat251_greengafl.the_meal_db_client.Client.Recipe;
import com.example.dat251_greengafl.the_meal_db_client.Client.DetailedRecipe;
import com.example.dat251_greengafl.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetailedRecipe> getRecipeById(@PathVariable String id) {
        DetailedRecipe recipe = recipeService.getRecipeDetails(id);
        return recipe != null ? ResponseEntity.ok(recipe) : ResponseEntity.notFound().build();
    }

    @GetMapping("/by-category")
    public List<Recipe> getRecipesByCategory(@RequestParam String category) {
        return recipeService.getRecipesByCategory(category);
    }

    @GetMapping("/categories")
    public List<String> getAllCategories() {
        return recipeService.getAllCategories();
    }

    @GetMapping("/search")
    public List<DetailedRecipe> searchRecipesByName(@RequestParam String name) {
        return recipeService.searchRecipesByName(name);
    }

    @GetMapping("/random")
    public DetailedRecipe getRandomRecipe() {
        return recipeService.getRandomRecipe();
}
}
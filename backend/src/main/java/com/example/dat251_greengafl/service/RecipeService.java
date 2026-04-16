package com.example.dat251_greengafl.service;

import com.example.dat251_greengafl.the_meal_db_client.Client;
import com.example.dat251_greengafl.the_meal_db_client.Client.DetailedRecipe;
import com.example.dat251_greengafl.the_meal_db_client.Client.Recipe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    @Autowired
    private Client client;

    public List<String> getAllCategories() {
        return client.getAllCategories();
    }

    public List<Recipe> getRecipesByCategory(String category) {
        return client.getRecipesByCategory(category);
    }

    public List<Recipe> getAllRecipes() {
        return client.getAllRecipes();
    }

    public DetailedRecipe getRecipeDetails(String id) {
        return client.getRecipeDetails(id);
    }

    public List<DetailedRecipe> searchRecipesByName(String name) {
        return client.searchRecipesByName(name);
    }

    public DetailedRecipe getRandomRecipe() {
        return client.getRandomRecipe();
    }


}
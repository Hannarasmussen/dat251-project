package com.example.dat251_greengafl.service;

import com.example.dat251_greengafl.model.Ingredient;
import com.example.dat251_greengafl.model.Recipe;
import com.example.dat251_greengafl.model.RecipeIngredient;
import com.example.dat251_greengafl.repo.IngredientRepo;
import com.example.dat251_greengafl.repo.RecipeIngredientRepo;
import com.example.dat251_greengafl.repo.RecipeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepo recipeRepo;

    @Autowired
    private IngredientRepo ingredientRepo;

    @Autowired
    private RecipeIngredientRepo recipeIngredientRepo;

    public List<Recipe> findAll() {
        return recipeRepo.findAll();
    }

    public Optional<Recipe> findById(UUID id) {
        return recipeRepo.findById(id);
    }

    public Optional<Recipe> findByName(String name) {
        return recipeRepo.findByName(name);
    }

    public Recipe register(Recipe recipe) {
        return recipeRepo.save(recipe);
    }

    public void deleteById(UUID id) {
        recipeRepo.deleteById(id);
    }

    /**
     * Adds an ingredient to a recipe.
     *
     * @return the saved RecipeIngredient, or empty if recipe or ingredient not
     *         found
     */
    public Optional<RecipeIngredient> addIngredient(UUID recipeId,
            UUID ingredientId,
            String quantity,
            String unit) {

        Optional<Recipe> recipe = recipeRepo.findById(recipeId);
        Optional<Ingredient> ingredient = ingredientRepo.findById(ingredientId);

        if (!entitiesExist(recipe, ingredient)) {
            return Optional.empty();
        }

        RecipeIngredient recipeIngredient = createRecipeIngredient(recipe.get(), ingredient.get(), quantity, unit);

        return Optional.of(recipeIngredientRepo.save(recipeIngredient));
    }

    private boolean entitiesExist(Optional<?>... optionals) {
        for (Optional<?> optional : optionals) {
            if (optional.isEmpty()) {
                return false;
            }
        }
        return true;
    }

    private RecipeIngredient createRecipeIngredient(Recipe recipe,
            Ingredient ingredient,
            String quantity,
            String unit) {
        RecipeIngredient recipeIngredient = new RecipeIngredient();
        recipeIngredient.setRecipe(recipe);
        recipeIngredient.setIngredient(ingredient);
        recipeIngredient.setQuantity(quantity);
        recipeIngredient.setUnit(unit);
        return recipeIngredient;
    }

    /**
     * Removes a specific RecipeIngredient entry by its own ID.
     *
     * @return true if it existed and was deleted, false otherwise
     */
    public boolean removeIngredient(UUID recipeIngredientId) {
        if (!recipeIngredientRepo.existsById(recipeIngredientId)) {
            return false;
        }
        recipeIngredientRepo.deleteById(recipeIngredientId);
        return true;
    }
}

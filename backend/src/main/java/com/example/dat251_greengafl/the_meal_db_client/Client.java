package com.example.dat251_greengafl.the_meal_db_client;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.client.RestClient;
import com.fasterxml.jackson.databind.JsonNode;

public class Client {
    RestClient restClient;

    public static void main(String[] args) {
        new Client();
    }

    public Client() {
        restClient = RestClient.create("https://www.themealdb.com/api/json/v1/1/");
    }

    public List<String> getAllCategories() {
        CategoryResponse response = restClient.get().uri("list.php?c=list").retrieve().body(CategoryResponse.class);
        if (response == null || response.meals() == null) {
            return List.of();
        }
        return response.meals().stream().map(CategoryDto::strCategory).collect(Collectors.toList());
    }

    public List<Recipe> getRecipesByCategory(String category) {
        RecipeCategoryResponse response = restClient.get().uri("filter.php?c=" + category).retrieve()
                .body(RecipeCategoryResponse.class);
        if (response == null || response.meals() == null) {
            return List.of();
        }
        return response.meals();
    }

    public List<Recipe> getAllRecipes() {
        List<String> categories = getAllCategories();
        List<Recipe> recipes = new ArrayList<>();
        for (String category : categories) {
            List<Recipe> recipesByCategory = getRecipesByCategory(category);
            recipes.addAll(recipesByCategory);
        }
        return recipes;
    }

    public DetailedRecipe getRecipeDetails(String id) {

        JsonNode root = restClient.get()
                .uri("lookup.php?i=" + id)
                .retrieve()
                .body(JsonNode.class);

        if (root == null || root.get("meals") == null || root.get("meals").isEmpty()) {
            return null;
        }

        JsonNode mealNode = root.get("meals").get(0);
        return parseDetailedRecipe(mealNode);
    }

    public List<DetailedRecipe> searchRecipesByName(String name) {
        JsonNode root = restClient.get()
                .uri("search.php?s=" + name)
                .retrieve()
                .body(JsonNode.class);

        if (root == null || root.get("meals") == null || root.get("meals").isEmpty()) {
            return null;
        }

        JsonNode mealNode = root.get("meals");
        List<DetailedRecipe> meals = new ArrayList<>();
        for (JsonNode node : mealNode) {
            meals.add(parseDetailedRecipe(node));
        }
        return meals;
    }

    public DetailedRecipe getRandomRecipe() {
        JsonNode root = restClient.get()
                .uri("random.php")
                .retrieve()
                .body(JsonNode.class);

        if (root == null || root.get("meals") == null || root.get("meals").isEmpty()) {
            return null;
        }

        JsonNode mealNode = root.get("meals").get(0);
        return parseDetailedRecipe(mealNode);
    }

    private DetailedRecipe parseDetailedRecipe(JsonNode mealNode) {
        String idMeal = mealNode.get("idMeal").asText();
        String name = mealNode.get("strMeal").asText();
        String category = mealNode.get("strCategory").asText();
        String area = mealNode.get("strArea").asText();
        String instructions = mealNode.get("strInstructions").asText();
        String thumb = mealNode.get("strMealThumb").asText();

        List<Ingredient> ingredients = new ArrayList<>();

        for (int i = 1; i <= 20; i++) {
            JsonNode ingredientNode = mealNode.get("strIngredient" + i);
            JsonNode measureNode = mealNode.get("strMeasure" + i);

            if (ingredientNode != null) {
                String ingredient = ingredientNode.asText();
                if (ingredient == null || ingredient.isBlank() || ingredient.equals("null")) {
                    continue;
                }

                String measure = measureNode != null ? measureNode.asText() : "";
                if (measure == null || measure.isBlank() || measure.equals("null")) {
                    measure = "";
                }

                ingredients.add(new Ingredient(ingredient, measure));
            }
        }

        return new DetailedRecipe(
                idMeal,
                name,
                category,
                area,
                instructions,
                thumb,
                ingredients);
    }

    private record CategoryDto(String strCategory) {
    }

    private record CategoryResponse(List<CategoryDto> meals) {
    }

    private record RecipeCategoryResponse(List<Recipe> meals) {
    }

    public record Recipe(String strMeal, String strThumb, String idMeal) {
    }

    public record DetailedRecipe(
            String id,
            String name,
            String category,
            String area,
            String instructions,
            String thumbnail,
            List<Ingredient> ingredients) {
    }

    public record Ingredient(String name, String measure) {
    }
}

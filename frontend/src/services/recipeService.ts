import { recipeApi } from "./apiClient";
import type { Recipe, DetailedRecipe } from "../api/api";

export async function getAllRecipes(): Promise<Recipe[]> {
  const response = await recipeApi.getAllRecipes();
  return response.data;
}

export async function getRecipeById(id: string): Promise<DetailedRecipe> {
  const response = await recipeApi.getRecipeById(id);
  return response.data;
}

export async function getRecipesByCategory(
  category: string
): Promise<Recipe[]> {
  const response = await recipeApi.getRecipesByCategory(category);
  return response.data;
}

export async function searchRecipesByName(
  name: string
): Promise<DetailedRecipe[]> {
  const response = await recipeApi.searchRecipesByName(name);
  return response.data;
}

export async function getRandomRecipe(): Promise<DetailedRecipe> {
  const response = await recipeApi.getRandomRecipe();
  return response.data;
}

export async function getAllCategories(): Promise<string[]> {
  const response = await recipeApi.getAllCategories();
  return response.data;
}
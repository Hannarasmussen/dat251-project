import type { DetailedRecipe, Recipe } from "../api/api";

const API_BASE = "http://localhost:8080";

export async function getAllRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${API_BASE}/api/recipe`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to load recipes: ${response.status}`);
  }

  return response.json();
}

export async function getRecipeById(id: string): Promise<DetailedRecipe> {
  const response = await fetch(`${API_BASE}/api/recipe/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to load recipe ${id}: ${response.status}`);
  }

  return response.json();
}

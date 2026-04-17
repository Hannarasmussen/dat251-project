import { useState } from "react";
import type { Recipe, DetailedRecipe } from "../api/api";

import {
  searchRecipesByName,
  getRecipesByCategory,
  getRandomRecipe,
  getAllCategories,
} from "../services/recipeService";

export function useRecipes() {
  const [results, setResults] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadCategories() {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch {
      setError("Failed to load categories.");
    }
  }

  async function search(name: string) {
    try {
      setLoading(true);
      setError("");

      const data = await searchRecipesByName(name);
      const mapped = data.map((item) => ({
        strMeal: item.name,
        strThumb: item.thumbnail,
        idMeal: item.id,
      }));
      setResults(mapped);
    } catch {
      setError("Search failed.");
    } finally {
      setLoading(false);
    }
  }

  async function filterByCategory(category: string) {
    try {
      setLoading(true);
      setError("");

      const data = await getRecipesByCategory(category);
      setResults(data);
    } catch {
      setError("Category filter failed.");
    } finally {
      setLoading(false);
    }
  }

  async function loadRandom() {
    try {
      setLoading(true);
      setError("");

      const data = await getRandomRecipe();
      const mapped = {
        strMeal: data.name,
        strThumb: data.thumbnail,
        idMeal: data.id,
      };

      setResults([mapped]);
    } catch {
      setError("Failed to load random recipe.");
    } finally {
      setLoading(false);
    }
  }

  function clearResults() {
    setResults([]);
  }

  return {
    results,
    categories,
    loading,
    error,
    search,
    filterByCategory,
    loadRandom,
    loadCategories,
    clearResults,
  };
}

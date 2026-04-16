import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailedRecipe } from "../api/api";
import { getAuthStatus } from "../services/auth";
import {
  isFavorited,
  addFavorite,
  removeFavorite,
} from "../services/favorites";
import { getRecipeById } from "../services/recipes";
import "../styles/App.css";
import "../styles/recipeDetail.css";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<DetailedRecipe | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    async function loadRecipe() {
      if (!id) {
        console.log("No recipe id provided, skipping fetch.");
        return;
      }
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch {
        console.log("Could not fetch recipe: " + id);
      }
    }
    loadRecipe();
  }, [id]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const data = await getAuthStatus();
        setIsLoggedIn(!!data?.authenticated);
      } catch {
        setIsLoggedIn(false);
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !id) return;
    async function checkFavorite() {
      const result = await isFavorited(id!);
      setFavorited(result);
    }
    checkFavorite();
  }, [isLoggedIn, id]);

  async function handleFavoriteToggle() {
    if (!id || favoriteLoading) return;
    setFavoriteLoading(true);
    try {
      if (favorited) {
        const success = await removeFavorite(id);
        if (success) {
          setFavorited(false);
        }
      } else {
        const success = await addFavorite(id);
        if (success) {
          setFavorited(true);
        }
      }
    } finally {
      setFavoriteLoading(false);
    }
  }

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-detail">
      <div className="recipe-header">
        {/* Display picture if available, otherwise placeholder */}
        <img
          className="recipe-media-image recipe-media-image--detail"
          src={
            recipe.thumbnail ||
            "https://via.placeholder.com/400x250?text=No+Image"
          }
          alt={recipe.name ?? "Recipe"}
        />
        <div className="recipe-title-row">
          <h1>{recipe.name ?? "Recipe details"}</h1>
          {isLoggedIn && (
            <button
              className={`favorite-button${favorited ? " favorite-button--active" : ""}`}
              onClick={handleFavoriteToggle}
              disabled={favoriteLoading}
              aria-label={
                favorited ? "Remove from favourites" : "Add to favourites"
              }
            >
              {favorited ? "♥" : "♡"}
            </button>
          )}
        </div>
        <div className="recipe-meta">
          <span>Category: {recipe.category ?? "N/A"}</span>
          <span>Cuisine: {recipe.area ?? "N/A"}</span>
        </div>
      </div>

      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul className="ingredients-list">
          {recipe.ingredients?.map((ingredient) => (
            <li key={`${ingredient.name}-${ingredient.measure}`}>
              {[ingredient.measure, ingredient.name].filter(Boolean).join(" ")}
            </li>
          ))}
        </ul>
      </div>

      <div className="recipe-section">
        <h2>Instructions</h2>
        <p className="instructions">
          {recipe.instructions ?? "No instructions available."}
        </p>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Configuration } from "./api/configuration";
import { Recipe, RecipeControllerApi } from "./api/api";
import { getAuthStatus } from "./auth";
import { isFavorited, addFavorite, removeFavorite } from "./favorites";
import "./recipeDetail.css";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    const conf = new Configuration({
      basePath: "http://localhost:8080",
      baseOptions: {
        withCredentials: true,
      },
    });
    const recipeController = new RecipeControllerApi(conf);
    async function loadRecipe() {
      if (!id) {
        console.log("No recipe id provided, skipping fetch.");
        return;
      }
      try {
        const { data } = await recipeController.findById1(id);
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
          src={
            (recipe as any).picture ||
            "https://via.placeholder.com/400x250?text=No+Image"
          }
          alt={recipe.name}
          className="recipe-image"
        />
        <div className="recipe-title-row">
          <h1>{recipe.name}</h1>
          {isLoggedIn && (
            <button
              className={`favorite-button${favorited ? " favorite-button--active" : ""}`}
              onClick={handleFavoriteToggle}
              disabled={favoriteLoading}
              aria-label={favorited ? "Remove from favourites" : "Add to favourites"}
            >
              {favorited ? "♥" : "♡"}
            </button>
          )}
        </div>
        <div className="recipe-meta">
          <span>Cooking time: {recipe.cookingTime ?? "N/A"} min</span>
          <span>Difficulty: {recipe.difficulty ?? "N/A"}</span>
        </div>
      </div>

      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul className="ingredients-list">
          {recipe.ingredients?.map((ri) => (
            <li key={ri.id}>
              {ri.quantity} {ri.unit} {ri.ingredient?.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="recipe-section">
        <h2>Instructions</h2>
        <p className="instructions">{recipe.instructions}</p>
      </div>
    </div>
  );
}

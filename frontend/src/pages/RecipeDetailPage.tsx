import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailedRecipe } from "../api/api";
import { AppHeader } from "../components/AppHeader";
import { getAuthStatus } from "../services/auth";
import { recordSelection } from "../services/recommendation";
import { getRecipeById } from "../services/recipeService";
import "../styles/App.css";
import "../styles/recipeDetail.css";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<DetailedRecipe | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

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

        const parsedId = Number(data?.id);
        if (data?.authenticated && !isNaN(parsedId) && parsedId > 0) {
          setUserId(parsedId);
        }
      } catch {
        setIsLoggedIn(false);
      }
    }
    checkAuth();
  }, []);

  async function handleLike() {
    if (!id || !userId || isLiking || hasLiked) return;
    setIsLiking(true);
    try {
      console.log("at try clause");
      await recordSelection(userId, id);
      setHasLiked(true);
    } catch (err) {
      console.log("Failed to record recommendation selection", err);
    } finally {
      setIsLiking(false);
    }
  }

  if (!recipe) {
    return (
      <div className="recipe-page">
        <AppHeader showLogout={isLoggedIn} />
        <p className="recipe-page-header">Loading...</p>
      </div>
    );
  }

  return (
    <div className="recipe-page">
      <AppHeader showLogout={isLoggedIn} />

      <div className="recipe-detail">
        <div className="recipe-header">
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
            {isLoggedIn && userId && (
              <button
                className="ghost-button"
                onClick={() => void handleLike()}
                disabled={isLiking || hasLiked}
                style={{ marginLeft: "auto" }}
              >
                {hasLiked ? "Liked!" : isLiking ? "Saving..." : "I like this"}
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
                {[ingredient.measure, ingredient.name]
                  .filter(Boolean)
                  .join(" ")}
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
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import type { Recipe } from "../api/api";

type Props = {
  recipe: Recipe;
};

export function RecipeResultCard({ recipe }: Props) {
  const navigate = useNavigate();

  function openDetails() {
    if (recipe.idMeal) {
      navigate(`/recipes/${recipe.idMeal}`);
    }
  }

  return (
    <article className="recipe-result-card">
      <div className="recipe-result-image-wrap">
        <img
          className="recipe-result-image"
          src={
            recipe.strMealThumb ||
            "https://via.placeholder.com/640x360?text=No+Image"
          }
          alt={recipe.strMeal ?? "Recipe preview"}
        />
      </div>

      <h3>{recipe.strMeal ?? "Untitled recipe"}</h3>

      <button
        type="button"
        className="ghost-button recipe-card-action"
        onClick={openDetails}
        disabled={!recipe.idMeal}
      >
        Show more
      </button>
    </article>
  );
}

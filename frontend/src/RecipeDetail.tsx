import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Configuration } from "./api/configuration";
import { Recipe, RecipeControllerApi } from "./api/api";
import "./recipeDetail.css";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

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
        <h1>{recipe.name}</h1>
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

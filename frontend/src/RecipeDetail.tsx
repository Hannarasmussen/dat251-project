import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Configuration } from "./api/configuration";
import { Recipe, RecipeControllerApi } from "./api/api";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const conf = new Configuration({
    basePath: "http://localhost:8080",
    baseOptions: {
      withCredentials: true,
    },
  });
  const recipeController = new RecipeControllerApi(conf);

  useEffect(() => {
    async function loadRecipe() {
      try {
        const { data } = await recipeController.findById1(id ?? "");
        setRecipe(data);
      } catch {
        console.log("Could not fetch recipe: " + id);
      }
    }
    loadRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{recipe.name}</h1>

      <p>
        <strong>Cooking time:</strong> {recipe.cookingTime} minutes
      </p>
      <p>
        <strong>Difficulty:</strong> {recipe.difficulty}
      </p>

      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients?.map((ri) => (
          <li key={ri.id}>
            {ri.quantity} {ri.unit} {ri.ingredient?.name}
          </li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <p>{recipe.instructions}</p>
    </div>
  );
}

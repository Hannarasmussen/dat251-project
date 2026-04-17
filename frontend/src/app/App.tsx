import "../styles/App.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Recipe } from "../api/api";
import { getAllRecipes, getRandomRecipe } from "../services/recipeService";

const featureCards = [
  {
    title: "Personalized meals",
    description:
      "Set dietary needs, ingredient preferences, cooking time, and difficulty to shape dinner ideas around you.",
  },
  {
    title: "Flexible preferences",
    description:
      "Build a profile that respects restrictions and makes it easier to find meals that actually fit.",
  },
  {
    title: "Easy dinner inspiration",
    description:
      "When you are not sure what to cook, Greengafl is meant to make the choice feel quicker and lighter.",
  },
];

function App() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getRandomRecipe();
        const mapped = {
          strMeal: data.name,
          strThumb: data.thumbnail,
          idMeal: data.id,
        };
        setRecipes([mapped]);
      } catch {
        console.log("Could not fetch recipes");
      }
    }
    load();
  }, []);

  return (
    <div className="landing-page">
      <div className="page-glow page-glow-left" aria-hidden="true" />
      <div className="page-glow page-glow-right" aria-hidden="true" />

      <header className="topbar">
        <div className="brand-block">
          <p className="brand-mark">Greengafl</p>
          <p className="brand-subtitle">
            Easy dinner suggestions personalized for your needs.
          </p>
        </div>

        <nav className="auth-actions" aria-label="Authentication">
          <button
            type="button"
            className="ghost-button"
            onClick={() => navigate("/recipes-preview")}
          >
            Preview recipe page
          </button>
          <button
            type="button"
            className="ghost-button"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/Register")}
          >
            Register
          </button>
        </nav>
      </header>

      <main className="hero-layout">
        <section className="hero-copy">
          <h1>Dinner ideas that fit your evening.</h1>
          <p className="hero-text">
            Greengafl helps users discover meal ideas based on dietary
            preferences, restrictions, cooking difficulty, and available time.
            It starts simple, then grows into a smarter way to choose dinner.
          </p>

          <p className="account-prompt">
            Create a user to try out personalized dinner suggestions and access
            the app&apos;s recommendation features.
          </p>
        </section>

        <section className="visual-panel" aria-label="App preview">
          {recipes.length > 0 ? (
            recipes.slice(0, 1).map((recipe) => (
              <div
                key={recipe.idMeal ?? recipe.strMeal ?? "recipe-preview"}
                className="visual-card visual-card-main"
                onClick={() => {
                  if (recipe.idMeal) {
                    navigate(`/recipes/${recipe.idMeal}`);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <h2>{recipe.strMeal ?? "Untitled recipe"}</h2>
                <p>Recipe ID: {recipe.idMeal ?? "N/A"}</p>
                <img
                  className="recipe-media-image recipe-media-image--hero"
                  src={
                    recipe.strThumb ||
                    "https://images.pexels.com/photos/36275016/pexels-photo-36275016.jpeg?"
                  }
                  alt={"Preview of " + (recipe.strMeal ?? "recipe")}
                  height="250px"
                  width="250px"
                  style={{ borderRadius: "20%" }}
                />
              </div>
            ))
          ) : (
            <div className="visual-card visual-card-main">
              <p>No recipes available yet.</p>
            </div>
          )}
        </section>
      </main>

      <section className="feature-section">
        <div className="section-heading">
          <p className="eyebrow">What the app offers</p>
          <h2>Why use Greengafl?</h2>
        </div>

        <div className="feature-grid">
          {featureCards.map((card) => (
            <article className="feature-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;

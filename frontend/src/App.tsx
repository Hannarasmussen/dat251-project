import "./App.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Configuration } from "./api/configuration";
import { Recipe, RecipeControllerApi } from "./api";

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
    const conf = new Configuration({
      basePath: "http://localhost:8080",
      baseOptions: {
        withCredentials: true,
      },
    });
    const recipeController = new RecipeControllerApi(conf);
    async function load() {
      try {
        const { data } = await recipeController.findAll1();
        setRecipes(data);
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
            recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="visual-card visual-card-main"
                onClick={() => navigate(`/recipes/${recipe.id}`)}
                style={{ cursor: "pointer" }}
              >
                <h2>{recipe.name}</h2>
                <p>{recipe.cookingTime} minutes</p>
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

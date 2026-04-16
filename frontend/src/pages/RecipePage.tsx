import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";
import { getAuthStatus } from "../services/auth";
import { Recipe } from "../api/api";
import { getAllRecipes } from "../services/recipes";

type RecipePageProps = {
  requireAuth?: boolean;
};

export default function RecipePage({ requireAuth = true }: RecipePageProps) {
  const initialResultLimit = 6;
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [query, setQuery] = useState("");
  const [resultLimit, setResultLimit] = useState(initialResultLimit);
  const [results, setResults] = useState<Recipe[]>([]);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadRecipes() {
      try {
        if (requireAuth) {
          const authData = await getAuthStatus();
          if (!authData?.authenticated) {
            if (!cancelled) {
              navigate("/login", { replace: true });
            }
            return;
          }
        }

        if (!cancelled) {
          setAuthorized(true);
        }

        setLoading(true);
        setError("");

        const data = await getAllRecipes();

        if (!cancelled) {
          setRecipes(data);
          setResults(data.slice(0, initialResultLimit));
        }
      } catch (err) {
        if (!cancelled) {
          if (requireAuth) {
            navigate("/login", { replace: true });
          } else {
            setError("Could not load recipes from the backend.");
          }
          console.error(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadRecipes();

    return () => {
      cancelled = true;
    };
  }, [navigate, requireAuth]);

  if (requireAuth && !authorized && loading) {
    return (
      <main className="recipe-page">
        <section className="recipe-page-header">
          <h1>Checking your session...</h1>
        </section>
      </main>
    );
  }

  function filterRecipes() {
    if (!query.trim()) {
      return recipes;
    }

    const normalizedQuery = query.trim().toLowerCase();
    return recipes.filter((recipe) =>
      (recipe.strMeal ?? "").toLowerCase().includes(normalizedQuery),
    );
  }

  function getSuggestions() {
    const filteredRecipes = filterRecipes();
    setResults(filteredRecipes.slice(0, resultLimit));
  }

  function getRandomRecipe() {
    if (recipes.length === 0) {
      setResults([]);
      return;
    }

    const filteredRecipes = filterRecipes();

    if (filteredRecipes.length === 0) {
      setResults([]);
      return;
    }

    const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
    setResults([filteredRecipes[randomIndex]]);
  }

  return (
    <main className="recipe-page">
      <section className="recipe-page-header">
        <p className="eyebrow">Greengafl suggestions</p>
        <h1>Your dinner suggestions</h1>
        <p className="recipe-page-intro">
          Adjust your preferences, then generate dinner ideas tailored to your
          evening.
        </p>
      </section>

      <section className="recipe-page-layout">
        <aside className="preferences-panel">
          <h2>Personalize suggestions</h2>
          <p className="panel-copy">
            Search by recipe name and choose how many suggestions to display.
          </p>

          <div className="filter-group">
            <label htmlFor="recipe-query">Recipe name</label>
            <input
              id="recipe-query"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Example: chicken"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="limit">Suggestions to show: {resultLimit}</label>
            <input
              id="limit"
              type="range"
              min="1"
              max="12"
              step="1"
              value={resultLimit}
              onChange={(event) => setResultLimit(Number(event.target.value))}
            />
          </div>

          <div className="recipe-actions">
            <button
              type="button"
              className="primary-button"
              onClick={getSuggestions}
              disabled={loading || recipes.length === 0}
            >
              Get suggestions
            </button>
            <button
              type="button"
              className="ghost-button"
              onClick={getRandomRecipe}
              disabled={loading || recipes.length === 0}
            >
              I&apos;m feeling lucky
            </button>
          </div>
        </aside>

        <section className="results-panel">
          <div className="results-heading">
            <h2>Recipe results</h2>
            <p>
              {loading
                ? "Loading recipes from the backend..."
                : results.length === 0
                  ? "No recipes generated yet."
                  : `Showing ${results.length} recipe${results.length > 1 ? "s" : ""}.`}
            </p>
          </div>

          {error ? (
            <div className="empty-results">
              <p>{error}</p>
            </div>
          ) : loading ? (
            <div className="empty-results">
              <p>Loading recipes from the backend meal service.</p>
            </div>
          ) : results.length === 0 ? (
            <div className="empty-results">
              <p>Try a different query and generate suggestions again.</p>
            </div>
          ) : (
            <div className="recipe-grid">
              {results.map((recipe) => (
                <article
                  className="recipe-result-card"
                  key={recipe.idMeal ?? recipe.strMeal ?? "recipe-result"}
                >
                  <div className="recipe-result-image-wrap">
                    <img
                      className="recipe-result-image"
                      src={
                        recipe.strThumb ||
                        "https://via.placeholder.com/640x360?text=No+Image"
                      }
                      alt={recipe.strMeal ?? "Recipe preview"}
                    />
                  </div>
                  <h3>{recipe.strMeal ?? "Untitled recipe"}</h3>
                  <button
                    type="button"
                    className="ghost-button"
                    style={{ marginTop: "12px" }}
                    onClick={() => {
                      if (recipe.idMeal) {
                        navigate(`/recipes/${recipe.idMeal}`);
                      }
                    }}
                    disabled={!recipe.idMeal}
                  >
                    Open details
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

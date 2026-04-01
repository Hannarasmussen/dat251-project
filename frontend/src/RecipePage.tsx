import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { getAuthStatus } from "./auth";

type BackendRecipe = {
  name: string;
  instructions: string;
  cookingTime: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  cuisine?: string;
  imageUrl?: string;
};

const API_BASE = "http://localhost:8080";

function toDifficultyLabel(difficulty: BackendRecipe["difficulty"]) {
  return difficulty.charAt(0) + difficulty.slice(1).toLowerCase();
}

type RecipePageProps = {
  requireAuth?: boolean;
};

export default function RecipePage({
  requireAuth = true,
}: RecipePageProps) {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<BackendRecipe[]>([]);
  const [cuisine, setCuisine] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [maxTime, setMaxTime] = useState(30);
  const [results, setResults] = useState<BackendRecipe[]>([]);
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

        const response = await fetch(`${API_BASE}/api/public/recipes`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: BackendRecipe[] = await response.json();

        if (!cancelled) {
          setRecipes(data);
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

  const cuisines = Array.from(
    new Set(
      recipes
        .map((recipe) => recipe.cuisine)
        .filter((value): value is string => Boolean(value))
    )
  ).sort((first, second) => first.localeCompare(second));

  function getSuggestions() {
    const filteredRecipes = recipes.filter((recipe) => {
      const matchesCuisine = cuisine === "All" || recipe.cuisine === cuisine;
      const matchesDifficulty =
        difficulty === "All" || recipe.difficulty === difficulty;
      const matchesTime = recipe.cookingTime <= maxTime;

      return matchesCuisine && matchesDifficulty && matchesTime;
    });

    setResults(filteredRecipes.slice(0, 3));
  }

  function getRandomRecipe() {
    if (recipes.length === 0) {
      setResults([]);
      return;
    }

    const filteredRecipes = recipes.filter((recipe) => {
      const matchesCuisine = cuisine === "All" || recipe.cuisine === cuisine;
      const matchesDifficulty =
        difficulty === "All" || recipe.difficulty === difficulty;
      const matchesTime = recipe.cookingTime <= maxTime;

      return matchesCuisine && matchesDifficulty && matchesTime;
    });

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
            Choose from the recipes currently available in the backend catalog.
          </p>

          <div className="filter-group">
            <label htmlFor="cuisine">Cuisine</label>
            <select
              id="cuisine"
              value={cuisine}
              onChange={(event) => setCuisine(event.target.value)}
            >
              <option value="All">All</option>
              {cuisines.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="difficulty">Difficulty</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
            >
              <option value="All">All</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="time">Maximum time: {maxTime} min</label>
            <input
              id="time"
              type="range"
              min="10"
              max="60"
              step="5"
              value={maxTime}
              onChange={(event) => setMaxTime(Number(event.target.value))}
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
              <p>Loading recipes from `backend/src/main/resources/recipes.json`.</p>
            </div>
          ) : results.length === 0 ? (
            <div className="empty-results">
              <p>Choose your filters and generate dinner suggestions.</p>
            </div>
          ) : (
            <div className="recipe-grid">
              {results.map((recipe) => (
                <article className="recipe-result-card" key={recipe.name}>
                  <p className="recipe-meta">
                    {recipe.cookingTime} min | {toDifficultyLabel(recipe.difficulty)}
                  </p>
                  <h3>{recipe.name}</h3>
                  <p>{recipe.instructions}</p>

                  <div className="recipe-tags">
                    {recipe.cuisine ? (
                      <span className="recipe-tag">{recipe.cuisine}</span>
                    ) : null}
                    <span className="recipe-tag">
                      {toDifficultyLabel(recipe.difficulty)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { getAuthStatus } from "./auth";
import {
  Configuration,
  RecommendationControllerApi,
  UserControllerApi,
  PublicRecipeControllerApi,
  RecipeControllerApi,
} from "./api";

type BackendRecipe = {
  id?: string;
  name: string;
  instructions: string;
  cookingTime: number;
  difficulty: "EASY" | "MEDIUM" | "HARD" | string;
  cuisine?: string;
  imageUrl?: string;
  score?: number;
};

type IngredientItem = {
  id?: string;
  name?: string;
  quantity?: string;
  unit?: string;
};

function toDifficultyLabel(difficulty: BackendRecipe["difficulty"]) {
  if (!difficulty) return "Unknown";
  return difficulty.charAt(0) + difficulty.slice(1).toLowerCase();
}

function formatScore(score?: number) {
  if (typeof score !== "number" || Number.isNaN(score)) return "N/A";
  return score.toFixed(3);
}

const API_BASE = "http://localhost:8080";

export default function RecommendPage() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState<number | null>(null);
  const [catalog, setCatalog] = useState<BackendRecipe[]>([]);
  const [results, setResults] = useState<BackendRecipe[]>([]);

  const [selectedRecipe, setSelectedRecipe] = useState<BackendRecipe | null>(
    null,
  );
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientItem[]
  >([]);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const [cuisine, setCuisine] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [maxTime, setMaxTime] = useState(30);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const config = useMemo(
    () =>
      new Configuration({
        basePath: API_BASE,
        baseOptions: { withCredentials: true },
      }),
    [],
  );

  const recommendationApi = useMemo(
    () => new RecommendationControllerApi(config),
    [config],
  );
  const userApi = useMemo(() => new UserControllerApi(config), [config]);
  const publicRecipeApi = useMemo(
    () => new PublicRecipeControllerApi(config),
    [config],
  );
  const recipeApi = useMemo(() => new RecipeControllerApi(config), [config]);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      setLoading(true);
      setError("");

      try {
        const auth = await getAuthStatus();
        if (!auth?.authenticated) {
          if (!cancelled) navigate("/login", { replace: true });
          return;
        }

        let resolvedId = Number(
          (auth as any)?.id ?? (auth as any)?.userId ?? NaN,
        );

        if (!Number.isFinite(resolvedId) && (auth as any)?.username) {
          const { data: users } = await userApi.findAll();
          const found = (users as any[]).find(
            (u: any) => u.username === (auth as any).username,
          );
          if (found?.id != null) resolvedId = Number(found.id);
        }

        if (!Number.isFinite(resolvedId)) {
          if (!cancelled) setError("Could not resolve user id.");
          return;
        }

        if (!cancelled) setUserId(resolvedId);

        // load public recipe catalog (for cuisine filter options)
        const publicApiAny = publicRecipeApi as any;
        const response =
          typeof publicApiAny.findAll2 === "function"
            ? await publicApiAny.findAll2()
            : typeof publicApiAny.findAll_2 === "function"
              ? await publicApiAny.findAll_2()
              : await publicApiAny.findAll();

        if (!cancelled) {
          setCatalog((response?.data as BackendRecipe[]) ?? []);
        }
      } catch (e) {
        if (!cancelled) {
          console.error(e);
          setError("Could not initialize recommendation page.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [navigate, userApi, publicRecipeApi]);

  const cuisines = Array.from(
    new Set(
      catalog
        .map((recipe) => recipe.cuisine)
        .filter((value): value is string => Boolean(value)),
    ),
  ).sort((a, b) => a.localeCompare(b));

  function applyFilters(recipes: BackendRecipe[]) {
    return recipes.filter((recipe) => {
      const matchesCuisine = cuisine === "All" || recipe.cuisine === cuisine;
      const matchesDifficulty =
        difficulty === "All" || recipe.difficulty === difficulty;
      const matchesTime =
        typeof recipe.cookingTime === "number"
          ? recipe.cookingTime <= maxTime
          : true;

      return matchesCuisine && matchesDifficulty && matchesTime;
    });
  }

  async function fetchRecommendations(limit: number): Promise<BackendRecipe[]> {
    if (!userId) return [];

    const { data } = await recommendationApi.recommend(userId, limit);

    // backend returns ordered list DTO
    if (Array.isArray(data)) return data as BackendRecipe[];
    if (Array.isArray((data as any)?.recipes))
      return (data as any).recipes as BackendRecipe[];

    return [];
  }

  async function loadRecipeDetails(recipe: BackendRecipe) {
    setSelectedRecipe(recipe);
    setSelectedIngredients([]);

    if (!recipe.id) return;

    setDetailsLoading(true);
    try {
      const apiAny = recipeApi as any;
      const response =
        typeof apiAny.findById1 === "function"
          ? await apiAny.findById1(recipe.id)
          : typeof apiAny.findById_1 === "function"
            ? await apiAny.findById_1(recipe.id)
            : await apiAny.findById(recipe.id);

      const fullRecipe = response?.data as any;
      const ingredients: IngredientItem[] =
        fullRecipe?.ingredients?.map((ri: any) => ({
          id: ri?.id,
          name: ri?.ingredient?.name,
          quantity: ri?.quantity,
          unit: ri?.unit,
        })) ?? [];

      setSelectedIngredients(ingredients);
    } catch (e) {
      console.error("Could not load recipe details", e);
      setSelectedIngredients([]);
    } finally {
      setDetailsLoading(false);
    }
  }

  async function generateRecommendations() {
    if (!userId) {
      setError("Missing user id.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const recommended = await fetchRecommendations(50);
      const filtered = applyFilters(recommended);
      const top = filtered.slice(0, 10);
      setResults(top);

      setSelectedRecipe(null);
      setSelectedIngredients([]);

      if (top.length === 0) {
        setError("No recommendations matched your filters.");
      }
    } catch (e) {
      console.error(e);
      setError("Could not fetch recommendations.");
      setResults([]);
      setSelectedRecipe(null);
      setSelectedIngredients([]);
    } finally {
      setLoading(false);
    }
  }

  async function feelingLucky() {
    if (!userId) {
      setError("Missing user id.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const recommended = await fetchRecommendations(50);
      const filtered = applyFilters(recommended);

      if (filtered.length === 0) {
        setResults([]);
        setSelectedRecipe(null);
        setSelectedIngredients([]);
        setError("No recommendations matched your filters.");
        return;
      }

      const randomIndex = Math.floor(Math.random() * filtered.length);
      setResults([filtered[randomIndex]]);
      setSelectedRecipe(null);
      setSelectedIngredients([]);
    } catch (e) {
      console.error(e);
      setError("Could not fetch recommendations.");
      setResults([]);
      setSelectedRecipe(null);
      setSelectedIngredients([]);
    } finally {
      setLoading(false);
    }
  }

  async function selectRecommendation(recipe?: BackendRecipe) {
    if (!recipe) return;

    // show details immediately
    await loadRecipeDetails(recipe);

    if (!userId || !recipe.id) return;

    try {
      await recommendationApi.recordSelection(userId, recipe.id);

      // Re-fetch ranked list with updated scores
      const updated = await fetchRecommendations(50);
      const filtered = applyFilters(updated);
      const top = filtered.slice(0, 10);
      setResults(top);

      // Force selected recipe score to latest backend value
      const latest = updated.find((r) => r.id === recipe.id);
      if (latest) {
        setSelectedRecipe((prev) => ({
          ...(prev ?? recipe),
          ...latest, // includes new score
        }));
      }
    } catch (e) {
      console.error("Could not record selection", e);
    }
  }

  return (
    <main className="recipe-page">
      <section className="recipe-page-header">
        <p className="eyebrow">Greengafl recommendations</p>
        <h1>Recommended dishes for you</h1>
        <p className="recipe-page-intro">
          Use your profile-driven recommendations and narrow results with quick
          filters.
        </p>
      </section>

      <section className="recipe-page-layout">
        <aside className="preferences-panel">
          <h2>Filter recommendations</h2>

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
              onClick={generateRecommendations}
              disabled={loading || userId == null}
            >
              Generate
            </button>
            <button
              type="button"
              className="ghost-button"
              onClick={feelingLucky}
              disabled={loading || userId == null}
            >
              I&apos;m feeling lucky
            </button>
          </div>
        </aside>

        <section className="results-panel">
          <div className="results-heading">
            <h2>Recommendation results</h2>
            <p>
              {loading
                ? "Loading recommendations..."
                : results.length === 0
                  ? "No dishes generated yet."
                  : `Showing ${results.length} dish${results.length > 1 ? "es" : ""}.`}
            </p>
          </div>

          {selectedRecipe ? (
            <article
              className="recipe-result-card"
              style={{ marginBottom: "1rem", border: "2px solid #9ac89a" }}
            >
              <p className="recipe-meta">
                {selectedRecipe.cookingTime} min |{" "}
                {toDifficultyLabel(selectedRecipe.difficulty)} | Score:{" "}
                {formatScore(selectedRecipe.score)}
              </p>
              <h3>{selectedRecipe.name}</h3>
              <p>{selectedRecipe.instructions}</p>

              <h4 style={{ marginTop: "0.75rem" }}>Ingredients</h4>
              {detailsLoading ? (
                <p>Loading ingredients...</p>
              ) : selectedIngredients.length === 0 ? (
                <p>No ingredients available.</p>
              ) : (
                <ul>
                  {selectedIngredients.map((ing, idx) => (
                    <li key={`${ing.id ?? ing.name ?? "ingredient"}-${idx}`}>
                      {ing.name ?? "Unknown"}
                      {ing.quantity ? ` - ${ing.quantity}` : ""}
                      {ing.unit ? ` ${ing.unit}` : ""}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ) : null}

          {error ? (
            <div className="empty-results">
              <p>{error}</p>
            </div>
          ) : results.length === 0 ? (
            <div className="empty-results">
              <p>Click Generate to fetch recommendations.</p>
            </div>
          ) : (
            <div className="recipe-grid">
              {results.map((recipe, idx) => (
                <article
                  className="recipe-result-card"
                  key={`${recipe.id ?? recipe.name}-${idx}`}
                >
                  <p className="recipe-meta">
                    {recipe.cookingTime} min |{" "}
                    {toDifficultyLabel(recipe.difficulty)} | Score:{" "}
                    {formatScore(recipe.score)}
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
                    <span className="recipe-tag">
                      Score: {formatScore(recipe.score)}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="ghost-button"
                    onClick={() => selectRecommendation(recipe)}
                  >
                    Select
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

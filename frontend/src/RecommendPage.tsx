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

const API_BASE = "http://localhost:8080";

export default function RecommendPage() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState<number | null>(null);
  const [catalog, setCatalog] = useState<BackendRecipe[]>([]);
  const [results, setResults] = useState<BackendRecipe[]>([]);

  // Center modal state (inactive until user clicks Select)
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
          const found = users.find(
            (u: any) => u.username === (auth as any).username,
          );
          if (found?.id != null) resolvedId = Number(found.id);
        }

        if (!Number.isFinite(resolvedId)) {
          if (!cancelled) setError("Could not resolve user id.");
          return;
        }

        if (!cancelled) setUserId(resolvedId);

        // OpenAPI-based catalog load
        const publicApiAny = publicRecipeApi as any;
        const catalogResponse =
          typeof publicApiAny.findAll2 === "function"
            ? await publicApiAny.findAll2()
            : await publicApiAny.findAll_2();

        if (!cancelled) {
          setCatalog((catalogResponse?.data as BackendRecipe[]) ?? []);
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
      const matchesTime = recipe.cookingTime <= maxTime;
      return matchesCuisine && matchesDifficulty && matchesTime;
    });
  }

  function normalizeRecommendationResponse(data: any): BackendRecipe[] {
    if (Array.isArray(data)) return data as BackendRecipe[];
    if (Array.isArray(data?.recipes)) return data.recipes as BackendRecipe[];
    if (Array.isArray(data?.items)) return data.items as BackendRecipe[];
    if (Array.isArray(data?.data)) return data.data as BackendRecipe[];
    if (Array.isArray(data?.content)) return data.content as BackendRecipe[];

    if (data && typeof data === "object") {
      const values = Object.values(data).filter(
        (v: any) =>
          v &&
          typeof v === "object" &&
          typeof v.name === "string" &&
          typeof v.instructions === "string",
      ) as BackendRecipe[];
      if (values.length > 0) return values;
    }

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
          : await apiAny.findById_1(recipe.id);

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
      const { data } = await recommendationApi.recommend(userId, 10);
      const normalized = normalizeRecommendationResponse(data);
      const filtered = applyFilters(normalized);
      const top = filtered.slice(0, 3);

      setResults(top);

      // Keep center modal inactive until user explicitly clicks Select
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
      const { data } = await recommendationApi.recommend(userId, 20);
      const normalized = normalizeRecommendationResponse(data);
      const filtered = applyFilters(normalized);

      if (filtered.length === 0) {
        setResults([]);
        setSelectedRecipe(null);
        setSelectedIngredients([]);
        setError("No recommendations matched your filters.");
        return;
      }

      const randomIndex = Math.floor(Math.random() * filtered.length);
      const lucky = filtered[randomIndex];
      setResults([lucky]);

      // Keep center modal inactive until explicit Select
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

    await loadRecipeDetails(recipe);

    if (!userId || !recipe.id) return;
    try {
      await recommendationApi.recordSelection(userId, recipe.id);
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

          {/* Center modal is only active/visible once user selects a recipe */}
          {selectedRecipe ? (
            <article
              className="recipe-result-card"
              style={{ marginBottom: "1rem", border: "2px solid #9ac89a" }}
            >
              <p className="recipe-meta">
                {selectedRecipe.cookingTime} min |{" "}
                {toDifficultyLabel(selectedRecipe.difficulty)}
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
                    {toDifficultyLabel(recipe.difficulty)}
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

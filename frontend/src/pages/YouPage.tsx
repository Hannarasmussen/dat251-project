import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthStatus } from "../services/auth";
import { RecommendationDto } from "../api/src/api";
import { getAllCategories } from "../services/recipeService";
import { getRecommendations } from "../services/recommendation";
import { AppHeader } from "../components/AppHeader";
import "../styles/you.css";
import "../styles/App.css";

function resolveUserId(authData: any): number | null {
  const candidates = [
    authData?.id,
    authData?.userId,
    authData?.user?.id,
    authData?.principal?.id,
  ];
  for (const c of candidates) {
    const n = Number(c);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return null;
}

export default function You() {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<RecommendationDto[]>(
    [],
  );
  const [recLoading, setRecLoading] = useState(false);
  const [recError, setRecError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [numberOfRecs, setNumberOfRecs] = useState<number>(12);

  const userId = useMemo(() => resolveUserId(authData), [authData]);

  useEffect(() => {
    let cancelled = false;

    async function assertLoggedIn() {
      try {
        const data = await getAuthStatus();

        if (!data?.authenticated) {
          if (!cancelled) navigate("/login", { replace: true });
          return;
        }

        if (data?.isNew) {
          if (!cancelled) navigate("/onboarding", { replace: true });
          return;
        }

        if (!cancelled) {
          setAuthData(data);
        }
      } catch {
        if (!cancelled) navigate("/login", { replace: true });
      }
    }

    assertLoggedIn();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  // Load available categories
  useEffect(() => {
    let cancelled = false;
    async function loadCategories() {
      try {
        const cats = await getAllCategories();
        if (!cancelled) setCategories(cats || []);
      } catch (e) {
        console.error("Failed to load categories", e);
      }
    }
    loadCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    async function fetchRecs() {
      if (userId == null) {
        setRecommendations([]);
        return;
      }

      const cat = selectedCategory || undefined;

      setRecLoading(true);
      setRecError(null);
      try {
        const data = await getRecommendations(userId, numberOfRecs, cat);
        setRecommendations(data);
      } catch (e) {
        setRecommendations([]);
        setRecError("Failed to fetch recommendations.");
      } finally {
        setRecLoading(false);
      }
    }

    fetchRecs();
  }, [userId, selectedCategory, numberOfRecs]);

  return (
    <div className="you-page">
      <AppHeader />

      <main className="you-content">
        <div className="recommendations-controls">
          <select
            className="recommendations-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="recommendations-slider-container">
            <label
              htmlFor="limit-slider"
              className="recommendations-slider-label"
            >
              Number of recipes: {numberOfRecs}
            </label>
            <input
              id="limit-slider"
              className="recommendations-slider-input"
              type="range"
              min="4"
              max="50"
              step="4"
              value={numberOfRecs}
              onChange={(e) => setNumberOfRecs(Number(e.target.value))}
            />
          </div>
        </div>

        {recLoading ? (
          <p className="recommendations-empty">Loading recommendations...</p>
        ) : recError ? (
          <p className="recommendations-empty">{recError}</p>
        ) : recommendations.length === 0 ? (
          <p className="recommendations-empty">
            No recommendations found for this category. Open some recipes to
            personalize this list.
          </p>
        ) : (
          <div className="recommendations-grid">
            {recommendations.map((recipe) => (
              <button
                key={recipe.id}
                type="button"
                className="recommendation-card"
                onClick={() => navigate(`/recipes/${recipe.id}`)}
              >
                {recipe.imageUrl ? (
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    className="recommendation-image"
                  />
                ) : null}
                <h3>{recipe.name}</h3>
                <p>
                  {recipe.category} · score {(recipe.score ?? 0).toFixed(2)}
                </p>
              </button>
            ))}
          </div>
        )}
        <div className="recommendations-footer">
          <button
            type="button"
            className="ghost-button"
            onClick={() => navigate("/recipes-preview")}
          >
            Explore all recipes
          </button>
        </div>
      </main>
    </div>
  );
}

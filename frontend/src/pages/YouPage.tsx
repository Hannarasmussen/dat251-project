import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthStatus } from "../services/auth";
import { getFavorites, RecipeSummary } from "../services/favorites";
import {
  getRecommendations,
  recordSelection,
  RecommendationDto,
} from "../services/recommendation";
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
  const [favorites, setFavorites] = useState<RecipeSummary[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationDto[]>(
    [],
  );
  const [recLoading, setRecLoading] = useState(false);
  const [recError, setRecError] = useState<string | null>(null);

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

  useEffect(() => {
    let cancelled = false;

    if (!authData)
      return () => {
        cancelled = true;
      };

    async function loadFavorites() {
      try {
        const data = await getFavorites();
        if (!cancelled) setFavorites(data);
      } catch {
        if (!cancelled) setFavorites([]);
      }
    }

    async function loadRecommendations() {
      if (userId == null) {
        if (!cancelled) {
          setRecommendations([]);
          setRecError("Could not resolve userId from auth response.");
        }
        return;
      }

      const resolvedUserId: number = userId;

      setRecLoading(true);
      setRecError(null);
      try {
        const data = await getRecommendations(resolvedUserId, 10);
        if (!cancelled) setRecommendations(data);
      } catch (e) {
        if (!cancelled) {
          setRecommendations([]);
          setRecError(
            e instanceof Error ? e.message : "Failed to load recommendations",
          );
        }
      } finally {
        if (!cancelled) setRecLoading(false);
      }
    }

    loadFavorites();
    loadRecommendations();

    return () => {
      cancelled = true;
    };
  }, [authData, userId]);

  async function onRecommendationClick(recipeId: string) {
    if (userId) {
      try {
        await recordSelection(userId, recipeId);
      } catch {}
    }
    navigate(`/recipes/${recipeId}`);
  }

  return (
    <div className="you-page">
      <AppHeader />

      <main className="you-content">
        <h1>hello, world!</h1>
        <p>Logged in as {authData?.username}</p>

        <section className="recommendations-section">
          <h2>Recommended Recipes</h2>

          {recLoading ? (
            <p className="recommendations-empty">Loading recommendations...</p>
          ) : recError ? (
            <p className="recommendations-empty">{recError}</p>
          ) : recommendations.length === 0 ? (
            <p className="recommendations-empty">
              No recommendations yet. Open some recipes to personalize this
              list.
            </p>
          ) : (
            <div className="recommendations-grid">
              {recommendations.map((recipe) => (
                <button
                  key={recipe.id}
                  type="button"
                  className="recommendation-card"
                  onClick={() => void onRecommendationClick(recipe.id)}
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
                    {recipe.category} · score {recipe.score.toFixed(2)}
                  </p>
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="favorites-section">
          <h2>Favourite Recipes</h2>
          {favorites.length === 0 ? (
            <p className="favorites-empty">
              No favourite recipes yet. Browse recipes and click ♡ to save them
              here.
            </p>
          ) : (
            <div className="favorites-grid">
              {favorites.map((recipe) => (
                <button
                  key={recipe.id}
                  type="button"
                  className="favorite-card"
                  onClick={() => navigate(`/recipes/${recipe.id}`)}
                >
                  <h3>{recipe.name}</h3>
                  <p>
                    {recipe.cookingTime} min · {recipe.difficulty}
                  </p>
                </button>
              ))}
            </div>
          )}
          <button
            type="button"
            className="ghost-button"
            onClick={() => navigate("/recipes-preview")}
          >
            Preview recipe page
          </button>
        </section>
      </main>
    </div>
  );
}

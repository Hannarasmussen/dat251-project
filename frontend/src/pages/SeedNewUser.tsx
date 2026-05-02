import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthStatus } from "../services/auth";
import {
  getAllCategories,
  getRecipesByCategory,
} from "../services/recipeService";
import { recordSelection } from "../services/recommendation";
import { updateIsNew } from "../services/user";
import { AppHeader } from "../components/AppHeader";
import "../styles/you.css";
import "../styles/App.css";

export default function SeedNewUser() {
  const navigate = useNavigate();

  const [authData, setAuthData] = useState<any>(null);
  const userId = authData?.id;

  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const auth = await getAuthStatus();
        if (!auth?.authenticated) {
          navigate("/login", { replace: true });
          return;
        }

        if (!cancelled) setAuthData(auth);

        const categories = await getAllCategories();
        if (!cancelled) setCategories(categories ?? []);
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "Failed to initialize onboarding",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  function toggleCategory(category: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  async function savePreferences() {
    if (!userId) {
      setError("Could not resolve userId.");
      return;
    }
    if (selected.size === 0) {
      setError("Please select at least one category.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      for (const category of selected) {
        const recipes = await getRecipesByCategory(category);
        if (!recipes || recipes.length === 0) continue;

        const seedRecipes = recipes.slice(0, 2);
        for (const r of seedRecipes) {
          if (!r.idMeal) continue;
          await recordSelection(userId, r.idMeal);
        }
      }

      await updateIsNew(userId, false);
      navigate("/you", { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save preferences.");
    } finally {
      setSaving(false);
    }
  }

  async function skipForNow() {
    if (!userId) {
      setError("Could not resolve userId.");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await updateIsNew(userId, false);
      navigate("/you", { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to skip onboarding.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="you-page">
        <AppHeader />
        <main className="you-content">
          <h1>Set your food preferences</h1>
          <p className="recommendations-empty">Loading categories...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="you-page">
      <AppHeader />
      <main className="you-content">
        <h1>Set your food preferences</h1>
        <p className="recommendations-empty">
          Pick a few categories you like. We’ll personalize your
          recommendations.
        </p>

        {error ? <p className="recommendations-empty">{error}</p> : null}

        <div className="recommendations-grid">
          {categories.map((c) => {
            const active = selected.has(c);
            return (
              <button
                key={c}
                type="button"
                className="recommendation-card"
                onClick={() => toggleCategory(c)}
                style={{
                  border: active ? "2px solid #80a869" : undefined,
                  boxShadow: active
                    ? "0 0 0 2px rgba(128,168,105,0.2)"
                    : undefined,
                }}
              >
                <h3>{c}</h3>
                <p>{active ? "Selected" : "Click to select"}</p>
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem" }}>
          <button
            type="button"
            className="ghost-button"
            onClick={() => void skipForNow()}
            disabled={saving}
          >
            Skip for now
          </button>
          <button
            type="button"
            className="ghost-button"
            onClick={() => void savePreferences()}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save preferences"}
          </button>
        </div>
      </main>
    </div>
  );
}

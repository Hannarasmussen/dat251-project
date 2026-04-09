import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthStatus, logout } from "./auth";
import { getFavorites, RecipeSummary } from "./favorites";
import logo from "./assets/greengaflLogo.png";
import "./you.css";
import "./App.css";

export default function You() {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState<any>(null);
  const [favorites, setFavorites] = useState<RecipeSummary[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function assertLoggedIn() {
      try {
        const data = await getAuthStatus();

        if (!data?.authenticated) {
          if (!cancelled) navigate("/login", { replace: true });
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

    if (!authData) return () => {
      cancelled = true;
    };

    async function loadFavorites() {
      try {
        const data = await getFavorites();
        if (!cancelled) {
          setFavorites(data);
        }
      } catch {
        if (!cancelled) {
          setFavorites([]);
        }
      }
    }

    loadFavorites();

    return () => {
      cancelled = true;
    };
  }, [authData]);

  async function handleLogout() {
    try {
      await logout();
    } finally {
      navigate("/", { replace: true });
    }
  }

  return (
    <div className="you-page">
      <header className="you-topbar">
        <div className="you-brand-block">
          <img src={logo} alt="Greengafl logo" className="you-brand-logo" />
        </div>

        <nav className="you-auth-actions" aria-label="Authentication">
          <button type="button" className="ghost-button" onClick={handleLogout}>
            Log out
          </button>
        </nav>
      </header>

      <main className="you-content">
        <h1>hello, world!</h1>
        <p>Logged in as {authData?.username}</p>

        <section className="favorites-section">
          <h2>Favourite Recipes</h2>
          {favorites.length === 0 ? (
            <p className="favorites-empty">No favourite recipes yet. Browse recipes and click ♡ to save them here.</p>
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
                  <p>{recipe.cookingTime} min · {recipe.difficulty}</p>
                </button>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

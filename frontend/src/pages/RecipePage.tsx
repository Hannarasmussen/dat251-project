import { useEffect, useState } from "react";
import logo from "../assets/greengaflLogo.png";
import { RecipeResultCard } from "../components/RecipeResultCard";
import { AppHeader } from "../components/AppHeader";
import type { Recipe } from "../api/api";
import {
  getAllCategories,
  getAllRecipes,
  getRandomRecipe,
  getRecipeById,
  getRecipesByCategory,
} from "../services/recipeService";
import "../styles/App.css";

export default function RecipePage({ requireAuth = true }) {
  const [results, setResults] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const areaOptions = [
    "American",
    "British",
    "Canadian",
    "Chinese",
    "Croatian",
    "Dutch",
    "Egyptian",
    "Filipino",
    "French",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Jamaican",
    "Japanese",
    "Kenyan",
    "Malaysian",
    "Mexican",
    "Moroccan",
    "Polish",
    "Portuguese",
    "Russian",
    "Spanish",
    "Thai",
    "Tunisian",
    "Turkish",
    "Vietnamese",
  ];

  useEffect(() => {
    async function loadPageData() {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch {
        setError("Could not load categories.");
      }
    }

    loadPageData();
  }, []);

  function shuffleRecipes(list: Recipe[]) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  async function handleGetSuggestions() {
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const baseRecipes = selectedCategory
        ? await getRecipesByCategory(selectedCategory)
        : await getAllRecipes();

      const byName = query.trim()
        ? baseRecipes.filter((recipe) =>
            (recipe.strMeal ?? "")
              .toLowerCase()
              .includes(query.trim().toLowerCase()),
          )
        : baseRecipes;

      if (byName.length === 0) {
        setError("No recipes matched your search and filters.");
        return;
      }

      if (!selectedArea) {
        setResults(shuffleRecipes(byName).slice(0, 3));
        return;
      }

      const shuffledCandidates = shuffleRecipes(byName);
      const areaMatches: Recipe[] = [];

      for (const candidate of shuffledCandidates) {
        if (!candidate.idMeal || areaMatches.length >= 3) {
          continue;
        }

        try {
          const details = await getRecipeById(candidate.idMeal);
          if (
            (details.area ?? "").toLowerCase() === selectedArea.toLowerCase()
          ) {
            areaMatches.push(candidate);
          }
        } catch {
          // Skip recipes that fail details lookup and keep scanning for matches.
        }
      }

      if (areaMatches.length === 0) {
        setError("No recipes matched the selected area.");
        return;
      }

      setResults(areaMatches);
    } catch {
      setError("Could not load suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleFeelingLucky() {
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const randomRecipe = await getRandomRecipe();
      setResults([
        {
          strMeal: randomRecipe.name,
          strMealThumb: randomRecipe.thumbnail,
          idMeal: randomRecipe.id,
        },
      ]);
    } catch {
      setError("Could not fetch a random recipe.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="recipe-page">
      <AppHeader showLogout={requireAuth} />

      <main className="recipe-workspace">
        <section className="preferences-panel recipe-filters-panel">
          <h2>Find your dinner</h2>
          <p className="panel-copy">
            Search, filter by cuisine and category, then get curated
            suggestions.
          </p>

          <div className="filter-group">
            <label htmlFor="recipe-search">Search</label>
            <input
              id="recipe-search"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Example: chicken"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="recipe-cuisine">Area (Cuisine)</label>
            <select
              id="recipe-cuisine"
              value={selectedArea}
              onChange={(event) => setSelectedArea(event.target.value)}
            >
              <option value="">Any area</option>
              {areaOptions.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="recipe-category">Category</label>
            <select
              id="recipe-category"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <option value="">Any category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="recipe-actions">
            <button
              type="button"
              className="primary-button recipe-suggest-button"
              onClick={handleGetSuggestions}
              disabled={loading}
            >
              Get suggestions
            </button>
            <button
              type="button"
              className="ghost-button recipe-random-button"
              onClick={handleFeelingLucky}
              disabled={loading}
            >
              I&apos;m feeling lucky
            </button>
          </div>
        </section>

        <section className="results-panel recipe-results-panel">
          <div className="results-heading">
            <h2>Recipe suggestions</h2>
            {!loading && !error && results.length === 0 && (
              <p>Use the filters and click a button to load recipes.</p>
            )}
            {!loading && !error && results.length > 0 && (
              <p>
                Showing {results.length} recipe{results.length > 1 ? "s" : ""}.
              </p>
            )}
            {!loading && error && <p>{error}</p>}
          </div>

          {loading ? (
            <div className="recipe-loading-state" aria-live="polite">
              <img
                src={logo}
                alt="Loading recipes"
                className="recipe-loading-logo"
              />
              <p>Fetching recipes...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="recipe-grid recipe-grid-results">
              {results.map((recipe) => (
                <RecipeResultCard
                  key={recipe.idMeal ?? recipe.strMeal ?? "recipe-result"}
                  recipe={recipe}
                />
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <p>No recipes to show yet.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

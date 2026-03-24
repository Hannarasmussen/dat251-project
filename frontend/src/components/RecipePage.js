import { useState } from 'react';
import '../App.css';

const mockRecipes = [
  {
    id: 1,
    title: 'Creamy Tomato Rigatoni',
    description: 'A comforting pasta dish with tomato sauce, garlic, and parmesan.',
    time: 25,
    difficulty: 'Easy',
    preferences: ['Vegetarian'],
    restrictions: ['Nut Free'],
    tags: ['Vegetarian', 'Quick'],
  },
  {
    id: 2,
    title: 'Lemon Salmon Bowl',
    description: 'Fresh salmon with rice, cucumber, avocado, and lemon dressing.',
    time: 30,
    difficulty: 'Medium',
    preferences: ['Pescetarian', 'High Protein'],
    restrictions: ['Gluten Free'],
    tags: ['High Protein', 'Fresh'],
  },
  {
    id: 3,
    title: 'Spicy Chickpea Curry',
    description: 'A warming chickpea curry with coconut milk and spinach.',
    time: 35,
    difficulty: 'Easy',
    preferences: ['Vegan'],
    restrictions: ['Dairy Free'],
    tags: ['Vegan', 'Comfort'],
  },
  {
    id: 4,
    title: 'Chicken Teriyaki Noodles',
    description: 'Savory noodles with chicken, vegetables, and teriyaki sauce.',
    time: 20,
    difficulty: 'Easy',
    preferences: ['High Protein'],
    restrictions: ['Nut Free'],
    tags: ['Quick', 'Popular'],
  },
  {
    id: 5,
    title: 'Mushroom Risotto',
    description: 'Creamy risotto with mushrooms, onion, and parmesan.',
    time: 40,
    difficulty: 'Medium',
    preferences: ['Vegetarian'],
    restrictions: ['Nut Free'],
    tags: ['Vegetarian', 'Cozy'],
  },
  {
    id: 6,
    title: 'Tofu Stir Fry',
    description: 'Crispy tofu with vegetables and soy-ginger sauce.',
    time: 20,
    difficulty: 'Easy',
    preferences: ['Vegan', 'High Protein'],
    restrictions: ['Dairy Free'],
    tags: ['Vegan', 'Quick'],
  },
];

function RecipePage() {
  const [preferences, setPreferences] = useState('All');
  const [restrictions, setRestrictions] = useState('None');
  const [difficulty, setDifficulty] = useState('All');
  const [maxTime, setMaxTime] = useState(30);
  const [results, setResults] = useState([]);

  function getSuggestions() {
    const filteredRecipes = mockRecipes.filter((recipe) => {
      const matchesPreferences =
        preferences === 'All' || recipe.preferences.includes(preferences);
      const matchesRestrictions =
        restrictions === 'None' || recipe.restrictions.includes(restrictions);
      const matchesDifficulty =
        difficulty === 'All' || recipe.difficulty === difficulty;
      const matchesTime = recipe.time <= maxTime;

      return (
        matchesPreferences &&
        matchesRestrictions &&
        matchesDifficulty &&
        matchesTime
      );
    });

    setResults(filteredRecipes.slice(0, 3));
  }

  function getRandomRecipe() {
    const randomIndex = Math.floor(Math.random() * mockRecipes.length);
    setResults([mockRecipes[randomIndex]]);
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
            Choose a few filters to shape the recommendations.
          </p>

          <div className="filter-group">
            <label htmlFor="preferences">Preferences</label>
            <select
              id="preferences"
              value={preferences}
              onChange={(event) => setPreferences(event.target.value)}
            >
              <option value="All">All</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Pescetarian">Pescetarian</option>
              <option value="High Protein">High Protein</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="restrictions">Restrictions</label>
            <select
              id="restrictions"
              value={restrictions}
              onChange={(event) => setRestrictions(event.target.value)}
            >
              <option value="None">None</option>
              <option value="Nut Free">Nut Free</option>
              <option value="Dairy Free">Dairy Free</option>
              <option value="Gluten Free">Gluten Free</option>
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
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
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
            <button type="button" className="primary-button" onClick={getSuggestions}>
              Get suggestions
            </button>
            <button type="button" className="ghost-button" onClick={getRandomRecipe}>
              I&apos;m feeling lucky
            </button>
          </div>
        </aside>

        <section className="results-panel">
          <div className="results-heading">
            <h2>Recipe results</h2>
            <p>
              {results.length === 0
                ? 'No recipes generated yet.'
                : `Showing ${results.length} recipe${results.length > 1 ? 's' : ''}.`}
            </p>
          </div>

          {results.length === 0 ? (
            <div className="empty-results">
              <p>Choose your preferences and generate dinner suggestions.</p>
            </div>
          ) : (
            <div className="recipe-grid">
              {results.map((recipe) => (
                <article className="recipe-result-card" key={recipe.id}>
                  <p className="recipe-meta">
                    {recipe.time} min | {recipe.difficulty}
                  </p>
                  <h3>{recipe.title}</h3>
                  <p>{recipe.description}</p>

                  <div className="recipe-tags">
                    {recipe.tags.map((tag) => (
                      <span className="recipe-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
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

export default RecipePage;

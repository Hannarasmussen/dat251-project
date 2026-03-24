import "./App.css";
import { useNavigate } from "react-router-dom";

const featureCards = [
  {
    title: "Personalized meals",
    description:
      "Set dietary needs, ingredient preferences, cooking time, and difficulty to shape dinner ideas around you.",
  },
  {
    title: "Flexible preferences",
    description:
      "Build a profile that respects restrictions and makes it easier to find meals that actually fit.",
  },
  {
    title: "Easy dinner inspiration",
    description:
      "When you are not sure what to cook, Greengafl is meant to make the choice feel quicker and lighter.",
  },
];

function App() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="page-glow page-glow-left" aria-hidden="true" />
      <div className="page-glow page-glow-right" aria-hidden="true" />

      <header className="topbar">
        <div className="brand-block">
          <p className="brand-mark">Greengafl</p>
          <p className="brand-subtitle">
            Easy dinner suggestions personalized for your needs.
          </p>
        </div>

        <nav className="auth-actions" aria-label="Authentication">
          <button
            type="button"
            className="ghost-button"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
          <button type="button" className="primary-button">
            Register
          </button>
        </nav>
      </header>

      <main className="hero-layout">
        <section className="hero-copy">
          <h1>Dinner ideas that fit your evening.</h1>
          <p className="hero-text">
            Greengafl helps users discover meal ideas based on dietary
            preferences, restrictions, cooking difficulty, and available time.
            It starts simple, then grows into a smarter way to choose dinner.
          </p>

          <p className="account-prompt">
            Create a user to try out personalized dinner suggestions and access
            the app&apos;s recommendation features.
          </p>
        </section>

        <section className="visual-panel" aria-label="App preview">
          <div className="visual-card visual-card-main">
            <p className="visual-label">Featured recipe preview</p>
            <h2>Creamy tomato rigatoni</h2>
            <p>
              A quick example of how Greengafl can present an appealing dinner
              option before users explore more suggestions inside the app.
            </p>
          </div>

          <div className="visual-card visual-card-accent preview-detail">
            <span>Time</span>
            <strong>25 minutes</strong>
          </div>

          <div className="visual-card visual-card-accent soft preview-detail">
            <span>Good for</span>
            <strong>Busy evenings and cozy dinners</strong>
          </div>
        </section>
      </main>

      <section className="feature-section">
        <div className="section-heading">
          <p className="eyebrow">What the app offers</p>
          <h2>Why use Greengafl?</h2>
        </div>

        <div className="feature-grid">
          {featureCards.map((card) => (
            <article className="feature-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;

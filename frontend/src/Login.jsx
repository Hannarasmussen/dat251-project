import { useState } from "react";
import { login } from "./auth";
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { ok, data } = await login(username, password);

      if (!ok || !data.authenticated) {
        setError(data.error || "Login failed");
        return;
      }

      window.location.href = "/you";
    } catch {
      setError("Could not connect to server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-modal" aria-label="Login form">
        <p className="login-brand">Greengafl</p>
        <h1>Welcome back</h1>
        <p className="login-subtitle">
          Log in to continue to your personalized dinner suggestions.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        {error && <p className="login-error">{error}</p>}
      </section>
    </main>
  );
}

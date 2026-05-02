import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/greengaflLogo.png";
import "../styles/register.css";

const API_BASE = "http://localhost:8080";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          password,
        }),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {}

      if (!res.ok) {
        setError(data?.error || data?.message || "Failed to register");
        return;
      }

      setMessage("Success!");
      setUsername("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        window.location.href = "/you";
      }, 600);
    } catch {
      setError("Could not connect to server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="register-page">
      <div className="register-wrapper">
        <button
          type="button"
          className="auth-logo-button"
          onClick={() => navigate("/")}
          aria-label="Go to home"
        >
          <img src={logo} alt="Greengafl logo" className="auth-logo" />
        </button>

        <section className="register-modal" aria-label="Register form">
          <p className="register-brand">Greengafl</p>
          <h1>Create account</h1>

          <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="register-username">Username</label>
            <input
              id="register-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />

            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />

            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <p className="login-question">
              Got an account? <a href="/login">Login here</a>
            </p>
          </form>

          {error && <p className="register-error">{error}</p>}
          {message && <p className="register-success">{message}</p>}
        </section>
      </div>
    </main>
  );
}

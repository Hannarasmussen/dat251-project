import { useState } from "react";
import "./styles/register.css";

//we are hardcoding the api-base on both sides :))))
const API_BASE = "http://localhost:8080";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    //dont send the form without the fields acutally filled in
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {}

      if (!res.ok) {
        setError(data?.error || "Failed");
        return;
      }

      setMessage("Success");
      window.location.href = "/login";
    } catch {
      setError("Could not connect to server");
    }
  }

  return (
    <main className="register-page">
      <section className="register-modal">
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

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        {error && <p className="register-error">{error}</p>}
        {message && <p className="register-success">{message}</p>}
      </section>
    </main>
  );
}

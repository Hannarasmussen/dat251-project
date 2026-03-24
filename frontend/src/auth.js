const API_BASE = "http://localhost:8080";

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  return { ok: res.ok, data };
}

export async function logout() {
  const res = await fetch(`${API_BASE}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  let data = {};
  try {
    data = await res.json();
  } catch {}

  return { ok: res.ok, data };
}

export async function getAuthStatus() {
  const res = await fetch(`${API_BASE}/api/auth/status`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();
  return { ok: res.ok, data };
}

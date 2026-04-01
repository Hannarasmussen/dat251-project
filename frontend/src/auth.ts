import { AuthControllerApi, Configuration } from "./api";

const API_BASE = "http://localhost:8080";

export async function login(username: string, password: string) {
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
  const conf = new Configuration({
    basePath: "http://localhost:8080",
    baseOptions: {
      withCredentials: true,
    },
  });
  const authController = new AuthControllerApi(conf);
  const { data } = await authController.status();

  return data;
}

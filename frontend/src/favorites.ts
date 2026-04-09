const API_BASE = "http://localhost:8080";

export interface RecipeSummary {
  id: string;
  name: string;
  cookingTime?: number;
  difficulty?: string;
}

export async function getFavorites(): Promise<RecipeSummary[]> {
  const res = await fetch(`${API_BASE}/api/favorites`, {
    credentials: "include",
  });
  if (!res.ok) return [];
  return res.json();
}

export async function isFavorited(recipeId: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/api/favorites/${recipeId}`, {
    credentials: "include",
  });
  if (!res.ok) return false;
  return res.json();
}

export async function addFavorite(recipeId: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/api/favorites/${recipeId}`, {
    method: "POST",
    credentials: "include",
  });
  return res.ok;
}

export async function removeFavorite(recipeId: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/api/favorites/${recipeId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return res.ok;
}

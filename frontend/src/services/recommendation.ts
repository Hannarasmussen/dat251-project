const API_BASE = "http://localhost:8080";

export type RecommendationDto = {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  score: number;
};

export async function getRecommendations(
  userId: number,
  limit = 10,
): Promise<RecommendationDto[]> {
  const params = new URLSearchParams({
    userId: String(userId),
    limit: String(limit),
  });

  const res = await fetch(
    `${API_BASE}/api/recommendations?${params.toString()}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!res.ok)
    throw new Error(`Failed to fetch recommendations (${res.status})`);
  return (await res.json()) as RecommendationDto[];
}

export async function recordSelection(
  userId: number,
  recipeId: string,
): Promise<void> {
  const params = new URLSearchParams({ userId: String(userId), recipeId });

  const res = await fetch(
    `${API_BASE}/api/recommendations/select?${params.toString()}`,
    {
      method: "POST",
      credentials: "include",
    },
  );

  if (!res.ok) throw new Error(`Failed to record selection (${res.status})`);
}

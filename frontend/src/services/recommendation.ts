import { RecommendationControllerApi, RecommendationDto } from "../api/api";
import { Configuration } from "../api/configuration";
import axios from "axios";

const BASE_URL = "http://localhost:8080";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
const config = new Configuration({ basePath: BASE_URL });

const recommendationApi = new RecommendationControllerApi(
  config,
  BASE_URL,
  axiosInstance,
);

export async function getRecommendations(
  userId: number,
  limit = 10,
  category?: string,
): Promise<RecommendationDto[]> {
  const params = new URLSearchParams({
    userId: String(userId),
    limit: String(limit),
  });
  if (category) {
    params.append("category", category);
  }

  const res = await fetch(
    `${BASE_URL}/api/recommendations?${params.toString()}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!res.ok)
    throw new Error(`Failed to fetch recommendations (${res.status})`);
  return (await res.json()) as RecommendationDto[];
}

export async function recordSelection(userId: number, recipeId: string) {
  const response = await recommendationApi.recordSelection(userId, recipeId);
  return response.data;
}

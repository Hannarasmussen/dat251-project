import axios from "axios";
import { Configuration } from "../api/configuration";
import { RecipeControllerApi, AuthControllerApi } from "../api/api";

const BASE_URL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const configuration = new Configuration({
  basePath: BASE_URL,
});

export const recipeApi = new RecipeControllerApi(
  configuration,
  BASE_URL,
  axiosInstance
);

export const authApi = new AuthControllerApi(
  configuration,
  BASE_URL,
  axiosInstance
);
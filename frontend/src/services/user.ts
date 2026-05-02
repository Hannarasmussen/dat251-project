import { UserControllerApi } from "../api/api";
import { Configuration } from "../api/configuration";
import axios from "axios";

const BASE_URL = "http://localhost:8080";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
const config = new Configuration({ basePath: BASE_URL });

const userApi = new UserControllerApi(config, BASE_URL, axiosInstance);

export async function updateIsNew(userId: number, isNew: boolean) {
  const response = await userApi.updateIsNew(userId, isNew);
  return response.data;
}

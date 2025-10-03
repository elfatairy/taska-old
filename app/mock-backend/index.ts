import { axios } from "./axios";
import { initializeUsers, registerUserEndpoints } from "./endpoints/users";
import { storage } from "./storage";

export function initializeMockBackend(): void {
  // Initialize data stores
  initializeUsers();

  // Register endpoints
  registerUserEndpoints();
}

export function resetMockBackend(): void {
  storage.clear();
  initializeUsers();
}

export function setNetworkDelay(ms: number): void {
  axios.setDelay(ms);
}

export { axios, storage };

export type {
  EndpointConfig,
  ErrorConfig,
  MockAxiosError,
  MockAxiosRequestConfig,
  MockAxiosResponse,
} from "./types";

import { api } from "./api";
import { registerAuthEndpoints } from "./endpoints/auth";
import { initializeUsers, registerUserEndpoints } from "./endpoints/users";
import { storage } from "./storage";

export function initializeMockBackend(): void {
  // Initialize data stores
  initializeUsers();

  // Register endpoints
  registerUserEndpoints();
  registerAuthEndpoints();
}

export function resetMockBackend(): void {
  storage.clear();
  initializeUsers();
}

export function setNetworkDelay(ms: number): void {
  api.setDelay(ms);
}

export { api, storage };

export type {
  EndpointConfig,
  ErrorConfig,
  MockError,
  MockRequestConfig,
  MockResponse,
} from "./types";

import { api } from "../api";
import type { User } from "../data/users";
import type { MockRequestConfig, MockResponse } from "../types";
import { getUsers } from "./users";

async function login(config: MockRequestConfig): Promise<MockResponse<User>> {
  const role = await config.data.role;
  if (!role) {
    throw api.createError(400, "Role is required", config);
  }

  const users = getUsers();
  const user = users.find((u) => u.role === role);
  if (!user) {
    throw api.createError(400, "No user found with this role", config);
  }

  return api.createResponse(user, config);
}

export function registerAuthEndpoints(): void {
  api.registerEndpoint("POST", "/api/login", {
    handler: login,
    errors: [{ status: 500, message: "Failed to login", probability: 0.01 }],
  });
}

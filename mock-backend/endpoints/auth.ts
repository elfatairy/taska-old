import { fakerEN } from "@faker-js/faker";
import { api } from "../api";
import { userRoles, type User } from "../data/users";
import type { MockRequestConfig, MockResponse } from "../types";
import { getUsers, saveUsers } from "./users";

async function loginWithRole(
  config: MockRequestConfig
): Promise<MockResponse<User>> {
  const role = await config.data.role;
  if (!role) {
    throw api.createError(400, "Role is required", config);
  }
  if (!userRoles.includes(role)) {
    throw api.createError(400, "Invalid role", config);
  }

  const users = getUsers();
  const user = users.find((u) => u.role === role);
  if (user) {
    return api.createResponse(user, config);
  }

  const firstName = fakerEN.person.firstName();
  const lastName = fakerEN.person.lastName();
  const newUser = {
    id: fakerEN.string.uuid(),
    name: `${firstName} ${lastName}`,
    email: fakerEN.internet.email({
      firstName,
      lastName,
    }),
    avatar: fakerEN.image.avatar(),
    role,
    createdAt: new Date().toISOString(),
    isOnline: true,
  };

  users.push(newUser);
  saveUsers(users);

  return api.createResponse(newUser, config);
}

export function registerAuthEndpoints(): void {
  api.registerEndpoint("POST", "/api/login-with-role", {
    handler: loginWithRole,
    errors: [{ status: 500, message: "Failed to login", probability: 0.01 }],
  });
}

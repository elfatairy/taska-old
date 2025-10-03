/* CRUD operations for users */

import { axios } from "../axios";
import initialUsers from "../data/users.json";
import { storage } from "../storage";
import type { MockAxiosRequestConfig, MockAxiosResponse } from "../types";

const STORAGE_KEY = "users";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt: string;
  isActive: boolean;
}

function getUsers(): User[] {
  return storage.get<User[]>(STORAGE_KEY) || [];
}

function saveUsers(users: User[]): void {
  storage.set(STORAGE_KEY, users);
}

function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
}

/* GET /api/users - Get all users */
async function getAllUsers(
  config: MockAxiosRequestConfig
): Promise<MockAxiosResponse<User[]>> {
  const users = getUsers();

  let filteredUsers = users;
  if (config.params?.role) {
    filteredUsers = users.filter((u) => u.role === config.params.role);
  }
  if (config.params?.isActive !== undefined) {
    const isActive =
      config.params.isActive === "true" || config.params.isActive === true;
    filteredUsers = filteredUsers.filter((u) => u.isActive === isActive);
  }

  return axios.createResponse(filteredUsers, config);
}

/* GET /api/users/:id - Get user by ID */
async function getUserById(
  config: MockAxiosRequestConfig
): Promise<MockAxiosResponse<User>> {
  const users = getUsers();
  const userId = config.params?.id;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    throw axios.createError(404, "User not found", config);
  }

  return axios.createResponse(user, config);
}

/* POST /api/users - Create a new user */
async function createUser(
  config: MockAxiosRequestConfig
): Promise<MockAxiosResponse<User>> {
  const users = getUsers();
  const newUserData = config.data;

  if (!newUserData.name || !newUserData.email) {
    throw axios.createError(400, "Name and email are required", config);
  }

  if (users.some((u) => u.email === newUserData.email)) {
    throw axios.createError(400, "Email already exists", config);
  }

  const newUser: User = {
    id: generateId(),
    name: newUserData.name,
    email: newUserData.email,
    role: newUserData.role || "user",
    avatar: newUserData.avatar,
    createdAt: new Date().toISOString(),
    isActive: newUserData.isActive !== undefined ? newUserData.isActive : true,
  };

  users.push(newUser);
  saveUsers(users);

  return axios.createResponse(newUser, config, 201);
}

/* PUT /api/users/:id - Update user */
async function updateUser(
  config: MockAxiosRequestConfig
): Promise<MockAxiosResponse<User>> {
  const users = getUsers();
  const userId = config.params?.id;
  const updateData = config.data;
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    throw axios.createError(404, "User not found", config);
  }

  if (updateData.email && updateData.email !== users[userIndex].email) {
    if (users.some((u) => u.email === updateData.email)) {
      throw axios.createError(400, "Email already exists", config);
    }
  }

  const updatedUser: User = {
    ...users[userIndex],
    ...updateData,
    id: users[userIndex].id,
    createdAt: users[userIndex].createdAt,
  };

  users[userIndex] = updatedUser;
  saveUsers(users);

  return axios.createResponse(updatedUser, config);
}

/* PATCH /api/users/:id - Partially update user */
async function patchUser(
  config: MockAxiosRequestConfig
): Promise<MockAxiosResponse<User>> {
  return updateUser(config);
}

/* DELETE /api/users/:id - Delete user */
async function deleteUser(
  config: MockAxiosRequestConfig
): Promise<MockAxiosResponse<{ message: string }>> {
  const users = getUsers();
  const userId = config.params?.id;
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    throw axios.createError(404, "User not found", config);
  }

  users.splice(userIndex, 1);
  saveUsers(users);

  return axios.createResponse({ message: "User deleted successfully" }, config);
}

export function registerUserEndpoints(): void {
  axios.registerEndpoint("GET", "/api/users", {
    handler: getAllUsers,
    errors: [
      // Example: 5% chance of 500 error
      // { status: 500, message: 'Internal Server Error', probability: 0.05 }
    ],
  });

  axios.registerEndpoint("GET", "/api/users/:id", {
    handler: getUserById,
    errors: [
      // Example: 3% chance of timeout
      // { status: 503, message: 'Service Unavailable', probability: 0.03 }
    ],
  });

  axios.registerEndpoint("POST", "/api/users", {
    handler: createUser,
    errors: [
      // Example: 2% chance of server error
      // { status: 500, message: 'Failed to create user', probability: 0.02 }
    ],
  });

  axios.registerEndpoint("PUT", "/api/users/:id", {
    handler: updateUser,
  });

  axios.registerEndpoint("PATCH", "/api/users/:id", {
    handler: patchUser,
  });

  axios.registerEndpoint("DELETE", "/api/users/:id", {
    handler: deleteUser,
  });
}

export function initializeUsers(): void {
  if (!storage.has(STORAGE_KEY)) {
    storage.set(STORAGE_KEY, initialUsers);
  }
}

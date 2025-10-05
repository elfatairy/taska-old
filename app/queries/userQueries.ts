import { skipToken, useQuery } from "@tanstack/react-query";
import { api } from "~/mock-backend/api";
import type { User } from "~/mock-backend/data/users";

export const userKeys = {
  all: [{ scope: "user" }] as const,
  details: (id: string) =>
    [{ ...userKeys.all[0], entity: "details", id }] as const,
  currentUser: () => [{ ...userKeys.all[0], entity: "currentUser" }] as const,
};

export const getCurrentUser = async () => {
  const response = await api.get<User>(
    `/api/users/${localStorage.getItem("userId")}`
  );
  if (response.status !== 200) {
    throw new Error("Failed to get current user");
  }
  return response.data;
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: userKeys.currentUser(),
    queryFn: localStorage.getItem("userId")
      ? () => getCurrentUser()
      : skipToken,
  });
};

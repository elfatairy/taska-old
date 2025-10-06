import { skipToken, useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "~/lib/react-query";
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

export const useLogout = () => {
  return useMutation({
    mutationFn: () => api.post<{ success: boolean }>("/api/auth/logout"),
    onSuccess: () => {
      localStorage.removeItem("userId");
      queryClient.invalidateQueries({ queryKey: userKeys.currentUser() });
    },
  });
};

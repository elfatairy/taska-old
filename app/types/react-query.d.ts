import type { AxiosError } from "axios";

declare module "@tanstack/react-query" {
  interface Register {
    default_Error: AxiosError;
  }
}

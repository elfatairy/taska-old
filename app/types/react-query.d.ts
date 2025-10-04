import type { MockError } from "~/mock-backend/types";

declare module "@tanstack/react-query" {
  interface Register {
    default_Error: MockError;
  }
}

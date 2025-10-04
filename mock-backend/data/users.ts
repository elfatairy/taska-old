import { fakerEN } from "@faker-js/faker";

export type UserRole =
  | "CTO"
  | "PM"
  | "Frontend Developer"
  | "Backend Developer"
  | "Designer"
  | "QA"
  | "DevOps";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  isOnline: boolean;
}

function randomUser(): User {
  const firstName = fakerEN.person.firstName();
  const lastName = fakerEN.person.lastName();
  return {
    id: fakerEN.string.uuid(),
    name: `${firstName} ${lastName}`,
    email: fakerEN.internet.email({
      firstName,
      lastName,
    }),
    avatar: fakerEN.image.avatar(),
    role: fakerEN.helpers.arrayElement([
      "PM",
      "Frontend Developer",
      "Backend Developer",
      "Designer",
      "QA",
      "DevOps",
    ]),
    createdAt: fakerEN.date.past().toISOString(),
    isOnline: fakerEN.datatype.boolean(),
  };
}

export const initialUsers: User[] = [
  {
    ...randomUser(),
    role: "CTO",
  },
  ...Array.from({ length: 10 }).map(() => randomUser()),
];

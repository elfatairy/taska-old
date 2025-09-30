import { Header } from "~/routes/components/Header";
import type { Route } from "./+types/dashboard";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Dashboard() {
  return <div className="flex">
    <Header />
    {/* <div className="flex">
      <Sidebar />
    </div> */}
  </div>;
}

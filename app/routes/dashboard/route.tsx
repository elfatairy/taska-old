import { Outlet } from "react-router";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { DashboardHeader } from "~/routes/dashboard/header";
import { DashboardSidebar } from "~/routes/dashboard/sidebar";
import type { Route } from "./+types/route";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function DashboardLayout() {
  return (
    <div className="[--header-height:calc(--spacing(16))]">
      <SidebarProvider className="flex flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <DashboardSidebar />
          <SidebarInset>
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

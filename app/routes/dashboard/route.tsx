import { useRef } from "react";
import { Outlet, redirect } from "react-router";
import { Button } from "~/components/ui/button";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { DashboardHeader } from "~/routes/dashboard/header";
import { DashboardSidebar } from "~/routes/dashboard/sidebar/sidebar";
import type { Route } from "./+types/route";

export const clientLoader = async () => {
  if (!localStorage.getItem("userId")) {
    return redirect("/onboarding");
  }
};

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function DashboardLayout() {
  const mainRef = useRef<HTMLDivElement>(null);

  const focusMain = () => {
    mainRef.current?.focus();
  }

  return (
    <>
      <AccessibilityLinks focusMain={focusMain} />

      <div className="[--header-height:calc(--spacing(14))]">
        <SidebarProvider className="flex flex-col">
          <DashboardHeader />
          <div className="flex flex-1">
            <DashboardSidebar />
            <SidebarInset>
              <div tabIndex={-1} id="main" ref={mainRef} className="focus:inset-ring-2 inset-ring-ring min-h-full">
                <Outlet />
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </>
  )
}

function AccessibilityLinks({ focusMain }: { focusMain: () => void }) {
  return (
    <>
      <Button
        variant="link"
        className="fixed top-0 left-0 z-20 py-2 px-4 font-bold bg-background opacity-0 pointer-events-none focus:pointer-events-auto focus:opacity-100"
        onClick={focusMain}
      >
        Skip to content
      </Button>
    </>
  )
}
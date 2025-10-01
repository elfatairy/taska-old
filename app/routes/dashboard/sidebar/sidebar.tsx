import { Separator } from "~/components/ui/separator";
import { Sidebar, SidebarContent } from "~/components/ui/sidebar";
import { MainNav } from "~/routes/dashboard/sidebar/mainNav";
import { UtilityNav } from "~/routes/dashboard/sidebar/utilityNav";

export function DashboardSidebar() {
  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]">
      <SidebarContent>
        <MainNav />
        <Separator />
        <UtilityNav />
      </SidebarContent>
    </Sidebar>
  )
}
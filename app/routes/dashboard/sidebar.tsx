import { Separator } from "~/components/ui/separator";
import { Sidebar, SidebarContent, SidebarMenu } from "~/components/ui/sidebar";
import { MainNav } from "~/routes/dashboard/mainNav";
import { UtilityNav } from "~/routes/dashboard/utilityNav";

export function DashboardSidebar() {
  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]">
      <SidebarContent>
        <SidebarMenu>
          <MainNav />
          <Separator />
          <UtilityNav />
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
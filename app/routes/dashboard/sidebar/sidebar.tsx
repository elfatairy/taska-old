import { AppLogo } from "~/components/AppLogo";
import SearchBar from "~/components/SearchBar";
import { Separator } from "~/components/ui/separator";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "~/components/ui/sidebar";
import { MainNav } from "~/routes/dashboard/sidebar/mainNav";
import { UtilityNav } from "~/routes/dashboard/sidebar/utilityNav";

export function DashboardSidebar() {
  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]">
      <SidebarContent>
        <SidebarHeader className="ml-2 md:hidden flex-row mt-2 items-center justify-between gap-4">
          <AppLogo />
          <SearchBar />
        </SidebarHeader>
        <MainNav />
        <Separator />
        <UtilityNav />
        <SidebarFooter className="md:hidden">
          {/* TODO: Add profile popover here */}
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar"
import { SidebarNavLink } from "~/routes/dashboard/sidebar/sidebarNavLink"
import type { Route } from "~/routes/dashboard/sidebar/types"

const utilityRoutes: Route[] = [
  {
    label: "Documents",
    href: "/dashboard/documents",
    icon: 'ClipboardList'
  },
  {
    label: "Components",
    href: "/dashboard/components",
    icon: 'Collection'
  },
  {
    label: "Help",
    href: "/dashboard/help",
    icon: 'Support'
  },
]

export function UtilityNav() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {
            utilityRoutes.map((route) => (
              <SidebarMenuItem key={route.label}>
                <SidebarMenuButton asChild>
                  <SidebarNavLink route={route} />
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          }
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
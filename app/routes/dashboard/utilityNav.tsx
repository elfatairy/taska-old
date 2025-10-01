import { NavLink } from "react-router"
import { Icon } from "~/components/Icon"
import { SidebarGroup, SidebarGroupContent, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar"
import type { Route } from "~/routes/dashboard/types"

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
        {
          utilityRoutes.map((route) => (
            <SidebarMenuItem key={route.label}>
              <SidebarMenuButton asChild>
                <NavLink to={route.href} >
                  {route.icon && <Icon icon={route.icon} />}
                  {route.label}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))
        }
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
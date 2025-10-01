import { Link } from "react-router"
import { Icon } from "~/components/Icon"
import { SidebarGroup, SidebarGroupContent, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar"
import type { Route } from "~/routes/dashboard/types"

const utilityRoutes: Route[] = [
  {
    label: "Documents",
    href: "/documents",
    icon: 'Profile'
  },
  {
    label: "Components",
    href: "/components",
  },
  {
    label: "Help",
    href: "/help",
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
                <Link to={route.href}>
                  {route.icon && <Icon icon={route.icon} />}
                  {route.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))
        }
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
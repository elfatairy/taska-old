import { ChevronDownIcon } from "lucide-react"
import { NavLink } from "react-router"
import { Icon } from "~/components/Icon"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible"
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "~/components/ui/sidebar"
import type { Route } from "~/routes/dashboard/types"

export const mainRoutes: Route[] = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: 'ChartPie'
  },
  {
    label: "Pages",
    href: "/dashboard/pages",
    icon: "DocumentReport",
    children: [
      {
        label: "Users",
        href: "/dashboard/pages/users",
      },
      {
        label: "Profile",
        href: "/dashboard/pages/profile"
      },
      {
        label: "Settings",
        href: "/dashboard/pages/settings",
      },
      {
        label: "Pricing",
        href: "/dashboard/pages/pricing",
      },
      {
        label: "Calendar",
        href: "/dashboard/pages/calendar",
      },
      {
        label: "Kanban",
        href: "/dashboard/pages/kanban",
      }
    ],
  },
  {
    label: "Sales",
    href: "/dashboard/sales",
    icon: 'ShoppingBag',
    children: [
      {
        label: "Product List",
        href: "/dashboard/sales/product-list",
      },
      {
        label: "Billing",
        href: "/dashboard/sales/billing",
      },
      {
        label: "Invoice",
        href: "/dashboard/sales/invoice",
      },
    ],
  },
  {
    label: "Messages",
    href: "/dashboard/messages",
    icon: 'InboxIn'
  },
  {
    label: "Authentication",
    href: "/dashboard/authentication",
    icon: 'LockClosed'
  }
]

export function MainNav() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {
            mainRoutes.map((route) => (
              route.children ? (
                <Collapsible key={route.label}>
                  <SidebarMenuItem key={route.label}>
                    <SidebarMenuButton asChild>
                      <NavLink to={route.href}>
                        {route.icon && <Icon icon={route.icon} />}
                        {route.label}
                      </NavLink>
                    </SidebarMenuButton>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction>
                        <ChevronDownIcon className="size-4" />
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {
                          route.children.map((child) => (
                            <SidebarMenuItem key={child.label}>
                              <SidebarMenuButton asChild>
                                <NavLink to={child.href}>
                                  {child.icon && <Icon icon={child.icon} />}
                                  {child.label}
                                </NavLink>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))
                        }
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={route.label}>
                  <SidebarMenuButton asChild>
                    <NavLink to={route.href} className={({ isActive }) => isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}>
                      {route.icon && <Icon icon={route.icon} />}
                      {route.label}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            ))
          }
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
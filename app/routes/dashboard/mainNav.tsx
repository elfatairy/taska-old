import { ChevronDownIcon } from "lucide-react"
import { Link } from "react-router"
import { Icon } from "~/components/Icon"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible"
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "~/components/ui/sidebar"
import type { Route } from "~/routes/dashboard/types"

export const mainRoutes: Route[] = [
  {
    label: "Overview",
    href: "/",
  },
  {
    label: "Pages",
    href: "/pages",
    children: [
      {
        label: "Users",
        href: "/users",
      },
      {
        label: "Profile",
        href: "/profile",
      },
      {
        label: "Settings",
        href: "/settings",
      },
      {
        label: "Pricing",
        href: "/pricing",
      },
      {
        label: "Calendar",
        href: "/calendar",
      },
      {
        label: "Kanban",
        href: "/kanban",
      }
    ],
  },
  {
    label: "Sales",
    href: "/sales",
    children: [
      {
        label: "Product List",
        href: "/product-list",
      },
      {
        label: "Billing",
        href: "/billing",
      },
      {
        label: "Invoice",
        href: "/invoice",
      },
    ],
  },
  {
    label: "Messages",
    href: "/messages"
  },
  {
    label: "Authentication",
    href: "/authentication"
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
                      <Link to={route.href}>
                        {route.icon && <Icon icon={route.icon} />}
                        {route.label}
                      </Link>
                    </SidebarMenuButton>
                    <CollapsibleTrigger>
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
                                <Link to={child.href}>
                                  {child.icon && <Icon icon={child.icon} />}
                                  {child.label}
                                </Link>
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
                    <Link to={route.href}>
                      {route.icon && <Icon icon={route.icon} />}
                      {route.label}
                    </Link>
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
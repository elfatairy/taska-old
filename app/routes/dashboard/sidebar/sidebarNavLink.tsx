import { NavLink } from "react-router";
import { Icon } from "~/components/Icon";
import type { Route } from "~/routes/dashboard/sidebar/types";

interface NavLinkProps {
  route: Route;
}

export function SidebarNavLink({ route, ...props }: NavLinkProps) {
  return (
    <NavLink to={route.href} className='gap-4' end {...props}>
      {route.icon && <Icon icon={route.icon} size={20} strokeWidth={0} />}
      {route.label}
    </NavLink>
  )
}
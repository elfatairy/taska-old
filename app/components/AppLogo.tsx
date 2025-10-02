import { Link } from "react-router";
import { Icon } from "./Icon";

export function AppLogo({ className }: { className?: string }) {
  return (
    <Link to="/dashboard" aria-label="Go to Dashboard Overview">
      <Icon
        icon='Logo'
        width={30}
        height={30}
        aria-label="Taska Logo"
        className={className}
        strokeWidth={0}
      />
    </Link>
  )
}

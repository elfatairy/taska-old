import { Icon } from "~/components/Icon";

export default function NotificationTrigger() {
  return (
    <div
      className="flex"
      aria-label="Open Notifications Menu"
    >
      <Icon icon='Bell' className="text-foreground w-5 h-5 stroke-0" aria-hidden="true" />
    </div>
  )
}
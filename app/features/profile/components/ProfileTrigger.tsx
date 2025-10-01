import { Icon } from "~/components/Icon";

export default function ProfileTrigger() {
  return (
    <PlaceholderProfileIcon />
  )
}

function PlaceholderProfileIcon() {
  return (
    <div className="flex items-center justify-center bg-muted text-muted-foreground rounded-full w-9 h-9">
      <Icon icon='Profile' className="w-4 h-4" />
    </div>
  )
}
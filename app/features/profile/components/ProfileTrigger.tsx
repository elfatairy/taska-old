import { Icon } from "~/components/Icon";

export default function ProfileTrigger() {
  return (
    <PlaceholderProfileIcon />
  )
}

function PlaceholderProfileIcon() {
  return (
    <div className="flex">
      <Icon icon='Profile' />
    </div>
  )
}
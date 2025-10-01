import { Icon } from "~/components/Icon";
import SearchBar from "~/components/SearchBar";
import NotificationTrigger from "~/features/notifications/components/NotificationTrigger";
import ProfileTrigger from "~/features/profile/components/ProfileTrigger";

export function DashboardHeader() {
  return (
    <div className="sticky top-0 w-full px-5 h-(--header-height) flex justify-between items-center bg-card border-b border-border">
      <div className="flex items-center gap-8">
        <Icon icon='Logo' width={30} height={30} />
        <SearchBar />
      </div>
      <div className="flex items-center gap-4">
        <NotificationTrigger />
        <ProfileTrigger />
      </div>
    </div>
  )
}
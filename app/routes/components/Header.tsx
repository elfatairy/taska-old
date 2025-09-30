import { Icon } from "~/components/Icon";
import NotificationTrigger from "~/features/notifications/components/NotificationTrigger";
import ProfileTrigger from "~/features/profile/components/ProfileTrigger";
import SearchBar from "~/routes/components/SearchBar";

export function Header() {
  return <div className="fixed top-0 left-0 w-full px-5 h-16 flex justify-between items-center bg-card">
    <div className="flex items-center gap-8">
      <Icon icon='Logo' width={30} height={30} />
      <SearchBar />
    </div>
    <div className="flex items-center">
      <NotificationTrigger />
      <ProfileTrigger />
    </div>
  </div>;
}
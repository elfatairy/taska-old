import { Icon } from "~/components/Icon";
import SearchBar from "~/components/SearchBar";
import { Button } from "~/components/ui/button";
import { useSidebar } from "~/components/ui/sidebar";
import NotificationTrigger from "~/features/notifications/components/NotificationTrigger";
import ProfileTrigger from "~/features/profile/components/ProfileTrigger";

export function DashboardHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="sticky top-0 w-full px-5 h-(--header-height) flex justify-between items-center bg-card border-b border-border">
      <div className="flex items-center gap-8">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
          <Icon icon='Menu' />
        </Button>
        <Icon icon='Logo' width={30} height={30} className="hidden md:block" />
        <div className="hidden md:block">
          <SearchBar />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <NotificationTrigger />
        <div className="hidden md:block">
          <ProfileTrigger />
        </div>
      </div>
    </div>
  )
}
import { BadgeCheck, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "~/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { useCurrentUser, useLogout } from "~/queries/userQueries";

export function ProfileDropdownContent() {
  const { data: user } = useCurrentUser();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/onboarding");
  };

  if (!user) return null;

  return (
    <DropdownMenuContent
      className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
      side={"bottom"}
      align="end"
      sideOffset={4}
    >
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="truncate text-xs">{user.email}</span>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {user.email}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </DropdownMenuLabel>

      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <BadgeCheck />
          Account
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleLogout}>
        <LogOut />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
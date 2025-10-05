import { UserIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Icon } from "~/components/Icon";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type Role = {
  label: string;
  value: string;
  icon: React.ReactNode;
  locked?: boolean;
}

const roles: Role[] = [
  {
    label: "CTO",
    value: "CTO",
    icon: <UserIcon className="size-10" aria-hidden />,
  },
  {
    label: "Product Manager",
    value: "Product Manager",
    icon: <UserIcon className="size-10" aria-hidden />,
    locked: true,
  },
  {
    label: "Team Lead",
    value: "Team Lead",
    icon: <UserIcon className="size-10" aria-hidden />,
    locked: true,
  },
  {
    label: "Developer",
    value: "Developer",
    icon: <UserIcon className="size-10" aria-hidden />,
    locked: true,
  }
]

export default function Onboarding() {
  const navigate = useNavigate();

  const handleRoleClick = (role: Role) => {
    if (role.locked) {
      toast.info("This role is still under development, check back later to use it");
      return;
    }

    navigate(`/dashboard`, {
      viewTransition: true
    });
  }

  return (
    <div className="w-screen h-screen bg-background text-foreground flex flex-col items-center justify-center">
      <div className="bg-card p-8 rounded-lg border shadow-sm">
        <h1 className="text-2xl font-bold text-center">Welcome to Taska</h1>
        <p className="text-sm text-center text-muted-foreground">Select a role</p>
        <div className="grid grid-cols-2 gap-4 mt-8">
          {
            roles.map((role) => (
              <Button
                className={cn("relative flex-1 p-10 aspect-1 cursor-pointer ring-2 ring-transparent flex-col h-auto", !role.locked && "hover:ring-primary", role.locked && "opacity-50")}
                variant="outline"
                onClick={() => handleRoleClick(role)}
                key={role.value}
              >
                {role.locked && <Icon icon="DoubleGear" className="absolute top-2 left-2 size-6" aria-label="Coming soon" />}
                {role.icon}
                <span className="text-lg">{role.label}</span>
              </Button>
            ))
          }
        </div>
      </div>
    </div>
  );
}
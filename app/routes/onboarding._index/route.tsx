import { UserIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";

const roles = [
  {
    label: "CTO",
    value: "CTO",
    icon: <UserIcon className="size-10" />,
  },
  {
    label: "Product Manager",
    value: "Product Manager",
    icon: <UserIcon className="size-10" />,
  },
  {
    label: "Team Lead",
    value: "Team Lead",
    icon: <UserIcon className="size-10" />,
  },
  {
    label: "Developer",
    value: "Developer",
    icon: <UserIcon className="size-10" />,
  }
]

export default function Onboarding() {
  const navigate = useNavigate();

  const handleRoleClick = (role: string) => {
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
                className="flex-1 p-10 aspect-1 cursor-pointer ring-2 ring-transparent hover:ring-primary flex-col h-auto"
                variant="outline"
                onClick={() => handleRoleClick(role.value)}
                key={role.value}
              >
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
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Login</h1>
      <Button onClick={() => {
        navigate("/onboarding");
      }}>
        Login With Role
      </Button>
    </div>
  )
}
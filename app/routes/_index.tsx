import { redirect } from "react-router";

export const clientLoader = async () => {
  if (!localStorage.getItem("userId")) {
    return redirect("/onboarding");
  }

  return redirect("/dashboard");
};

export default function Index() {
  return <div>Index</div>;
}
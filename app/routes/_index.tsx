import { redirect } from "react-router";

export const loader = () => {
  return redirect("/dashboard");
};

export default function Index() {
  return <div>Index</div>;
}
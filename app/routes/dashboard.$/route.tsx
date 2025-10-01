import type { Route } from "../dashboard/+types/route";

export default function Dashboard({ params }: Route.ComponentProps) {
  const path = params['*'];
  return (
    <div>
      <h1>Dashboard {path}</h1>
    </div>
  )
}
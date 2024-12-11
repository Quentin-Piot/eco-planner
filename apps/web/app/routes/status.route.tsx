import StatusPage from "@/pages/status.page";

import { Route } from "../../.react-router/types/app/+types/root";

export function meta({}: Route.MetaArgs) {
  return [{ title: "StatusPage | EcoPlanner" }];
}

export default function HomeRoute() {
  return <StatusPage />;
}

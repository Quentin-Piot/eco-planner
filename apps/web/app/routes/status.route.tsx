import Status from "@/pages/status";

import { Route } from "../../.react-router/types/app/+types/root";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Status | EcoPlanner" }];
}

export default function HomeRoute() {
  return <Status />;
}

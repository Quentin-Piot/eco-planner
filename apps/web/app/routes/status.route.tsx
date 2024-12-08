import { Route } from "../../.react-router/types/app/+types/root";
import Status from "@/pages/status";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Status | EcoPlanner" },
  ];
}

export default function HomeRoute() {
  return <Status />;
}

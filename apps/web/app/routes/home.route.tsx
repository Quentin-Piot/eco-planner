import Home from "@/pages/home";

import { Route } from "../../.react-router/types/app/+types/root";

export function meta({}: Route.MetaArgs) {
  return [{ title: "EcoPlanner" }];
}

export default function HomeRoute() {
  return <Home />;
}

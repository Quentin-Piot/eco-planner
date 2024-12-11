import HomePage from "@/pages/home.page";

import { Route } from "../../.react-router/types/app/+types/root";

export function meta({}: Route.MetaArgs) {
  return [{ title: "EcoPlanner" }];
}

export default function HomeRoute() {
  return <HomePage />;
}

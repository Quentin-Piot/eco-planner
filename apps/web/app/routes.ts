import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("layouts/main.layout.tsx", [
    route("/status", "pages/status.page.tsx"),
    route("*?", "pages/home.page.tsx"),
  ]),
] satisfies RouteConfig;

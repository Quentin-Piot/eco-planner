import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("layouts/main.layout.tsx", [
    route("/status", "routes/status.route.tsx"),

    route("*?", "routes/home.route.tsx"),
  ]),
] satisfies RouteConfig;

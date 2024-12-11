import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("layouts/main.layout.tsx", [
    index("routes/home.route.tsx"),
    route("/status", "routes/status.route.tsx"),
  ]),
] satisfies RouteConfig;

import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.route.tsx"),
  route("/status", "routes/status.route.tsx"),
] satisfies RouteConfig;

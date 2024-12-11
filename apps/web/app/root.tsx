import {
  isRouteErrorResponse,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { Provider } from "@/components/ui/provider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

import ErrorPage from "@/pages/error.page";

import type { Route } from "./+types/root";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Bienvenue sur EcoPlanner, le créateur d'itinéraires eco-responsables en France"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <ThemeProvider disableTransitionOnChange attribute="class">
          <Outlet />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return <ErrorPage message={message} details={details} stack={stack} />;
}

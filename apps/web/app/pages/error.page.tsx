import { Background } from "@/components/ui/background";

type ErrorPageProps = {
  message: string;
  details: string;
  stack?: string;
};

import { redirect } from "react-router";

import { GlassCardNoChakra } from "@/components/ui/glass-card";

export async function loader({}) {
  return redirect("/login");
}

export default function ErrorPage({ message, details, stack }: ErrorPageProps) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Background />
      <GlassCardNoChakra title={message}>
        <div style={{ textAlign: "center" }}>
          {details}
          {stack && (
            <pre style={{ width: "100%", padding: "1rem", overflowX: "auto" }}>
              <code>{stack}</code>
            </pre>
          )}
          <br />
          <br />
          <a href={"/"}>Retour à la page d'accueil</a>
        </div>
      </GlassCardNoChakra>
    </div>
  );
}

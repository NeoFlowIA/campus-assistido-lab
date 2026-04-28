import { createFileRoute } from "@tanstack/react-router";
import { WidgetPage } from "../components/widget-page";
import { buildWidgetCsp } from "../lib/widget-security";

export const Route = createFileRoute("/widget")({
  validateSearch: (search: Record<string, unknown>) => ({
    allowedOrigins: typeof search.allowedOrigins === "string" ? search.allowedOrigins : undefined,
    autoOpen: search.autoOpen === "true",
    initialState: search.initialState === "start" ? "start" : "closed",
  }),
  headers: () => {
    const frameAncestors =
      typeof process.env.WIDGET_FRAME_ANCESTORS === "string" &&
      process.env.WIDGET_FRAME_ANCESTORS.trim().length > 0
        ? process.env.WIDGET_FRAME_ANCESTORS
        : "'self'";

    const csp = buildWidgetCsp(frameAncestors);

    return {
      "Content-Security-Policy": csp,
      "Referrer-Policy": "no-referrer",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
    };
  },
  head: () => ({
    meta: [{ title: "Widget | Assistente virtual IFCE" }],
  }),
  component: WidgetRoute,
});

function WidgetRoute() {
  const { allowedOrigins, autoOpen, initialState } = Route.useSearch();

  return (
    <WidgetPage allowedOrigins={allowedOrigins} autoOpen={autoOpen} initialState={initialState} />
  );
}

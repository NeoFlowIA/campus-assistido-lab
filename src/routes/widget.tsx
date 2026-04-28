import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { MessageCircle, X } from "lucide-react";

export const Route = createFileRoute("/widget")({
  component: WidgetPage,
});

type WidgetState = "minimized" | "open";

function WidgetPage() {
  const search = new URLSearchParams(window.location.search);
  const autoOpen = search.get("autoOpen") === "true";
  const initialState = search.get("initialState") === "start" ? "open" : "minimized";

  const [state, setState] = useState<WidgetState>(autoOpen ? "open" : (initialState as WidgetState));

  const allowedOrigins = useMemo(() => {
    const raw = search.get("allowedOrigins") || "";
    return raw
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean);
  }, [search]);

  useEffect(() => {
    const parentOrigin = document.referrer ? new URL(document.referrer).origin : "";

    if (window.parent !== window && parentOrigin) {
      window.parent.postMessage({ type: "NEOTALK_WIDGET_READY" }, parentOrigin);
    }

    const onMessage = (event: MessageEvent) => {
      if (allowedOrigins.length > 0 && !allowedOrigins.includes(event.origin)) return;
      if (event.data?.type !== "NEOTALK_WIDGET_CONFIG") return;

      const payload = event.data.payload || {};
      if (payload.autoOpen === true) setState("open");
      if (payload.initialState === "start") setState("open");
      if (payload.initialState === "minimized") setState("minimized");
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [allowedOrigins]);

  return (
    <main className="min-h-screen bg-transparent">
      <div className="fixed bottom-4 right-4 z-50">
        {state === "minimized" ? (
          <button
            onClick={() => setState("open")}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg"
          >
            <MessageCircle className="h-4 w-4" /> Assistente virtual
          </button>
        ) : (
          <div className="h-[680px] w-[380px] overflow-hidden rounded-xl border bg-background shadow-2xl">
            <header className="flex items-center justify-between border-b px-4 py-3">
              <h1 className="text-sm font-semibold">Assistente virtual</h1>
              <button
                onClick={() => setState("minimized")}
                className="rounded-md p-1 text-muted-foreground hover:bg-accent"
                aria-label="Minimizar widget"
              >
                <X className="h-4 w-4" />
              </button>
            </header>
            <section className="flex h-[calc(100%-53px)] items-center justify-center p-6 text-center text-sm text-muted-foreground">
              Widget pronto para integração segura via iframe e postMessage.
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

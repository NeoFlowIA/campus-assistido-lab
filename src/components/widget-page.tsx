import { useEffect, useMemo, useState } from "react";
import { Bot, MessageCircle, SendHorizontal, X } from "lucide-react";
import {
  sanitizeAllowedOrigins,
  sanitizeErrorLog,
  sanitizeWidgetConfig,
  type WidgetConfig,
} from "../lib/widget-security";

const DEFAULT_CONFIG: Required<WidgetConfig> = {
  autoOpen: false,
  initialState: "closed",
};

type WidgetPageProps = {
  allowedOrigins?: string;
  autoOpen?: boolean;
  initialState?: "start" | "closed";
};

export function WidgetPage({
  allowedOrigins,
  autoOpen = false,
  initialState = "closed",
}: WidgetPageProps) {
  const safeOrigins = useMemo(() => sanitizeAllowedOrigins(allowedOrigins), [allowedOrigins]);

  const initialConfig = useMemo<Required<WidgetConfig>>(
    () => ({
      autoOpen: autoOpen || initialState === "start",
      initialState,
    }),
    [autoOpen, initialState],
  );

  const [config, setConfig] = useState<Required<WidgetConfig>>({
    ...DEFAULT_CONFIG,
    ...initialConfig,
  });

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "bot"; text: string }>>([
    {
      role: "bot",
      text: "Olá! Sou o assistente virtual. Posso ajudar com matrículas, calendário e serviços do campus.",
    },
  ]);

  const [open, setOpen] = useState(config.autoOpen || config.initialState === "start");

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      if (!safeOrigins.includes(event.origin)) return;
      if (event.data?.type !== "NEOTALK_WIDGET_CONFIG") return;

      const payload = sanitizeWidgetConfig(event.data?.payload);
      setConfig((current) => ({ ...current, ...payload }));
      if (payload.autoOpen) setOpen(true);
      if (payload.initialState === "start") setOpen(true);
    };

    window.addEventListener("message", messageHandler);

    try {
      window.parent?.postMessage(
        {
          type: "NEOTALK_WIDGET_READY",
          payload: {
            route: "/widget",
            allowedOrigins: safeOrigins,
          },
        },
        "*",
      );
    } catch (error) {
      console.error("Widget init error", sanitizeErrorLog(error));
    }

    return () => window.removeEventListener("message", messageHandler);
  }, [safeOrigins]);

  return (
    <main className="min-h-screen bg-slate-950 p-4 text-slate-50">
      <section className="mx-auto flex h-[700px] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
        <header className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-emerald-500/20 p-2 text-emerald-300">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Assistente virtual IFCE</p>
              <p className="text-xs text-slate-400">Widget seguro para iframe</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="rounded-lg border border-slate-700 p-2 text-slate-200"
            aria-label={open ? "Fechar chat" : "Abrir chat"}
          >
            {open ? <X className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
          </button>
        </header>

        {open ? (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={
                    message.role === "bot"
                      ? "max-w-[90%] rounded-2xl rounded-bl-sm bg-slate-800 px-3 py-2 text-sm"
                      : "ml-auto max-w-[90%] rounded-2xl rounded-br-sm bg-emerald-600 px-3 py-2 text-sm"
                  }
                >
                  {message.text}
                </div>
              ))}
            </div>

            <form
              className="flex items-center gap-2 border-t border-slate-800 p-3"
              onSubmit={(event) => {
                event.preventDefault();
                if (!input.trim()) return;
                const userText = input.trim();
                setMessages((current) => [
                  ...current,
                  { role: "user", text: userText },
                  {
                    role: "bot",
                    text: "Recebi sua mensagem. Encaminhando para o fluxo de atendimento assistido.",
                  },
                ]);
                setInput("");
              }}
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="h-10 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none"
                placeholder="Digite sua dúvida"
                aria-label="Mensagem"
              />
              <button
                type="submit"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950"
                aria-label="Enviar"
              >
                <SendHorizontal className="h-4 w-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center px-6 text-center text-sm text-slate-400">
            O chat está fechado. Use o botão no topo para abrir o assistente.
          </div>
        )}

        <footer className="border-t border-slate-800 px-4 py-2 text-center text-xs text-slate-500">
          <a
            href="https://ifce.edu.br"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            Política de privacidade e atendimento
          </a>
        </footer>
      </section>
    </main>
  );
}

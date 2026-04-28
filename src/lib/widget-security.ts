const SENSITIVE_KEYS = ["cookie", "session", "token", "password"];

export type WidgetConfig = {
  autoOpen?: boolean;
  initialState?: "start" | "closed";
};

const ORIGIN_REGEX = /^https:\/\/[a-zA-Z0-9.-]+(?::\d{2,5})?$/;

export function sanitizeAllowedOrigins(value: string | undefined): string[] {
  if (!value) return [];

  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => ORIGIN_REGEX.test(origin));
}

export function sanitizeWidgetConfig(input: unknown): WidgetConfig {
  if (!input || typeof input !== "object") return {};

  const payload = input as Record<string, unknown>;
  const next: WidgetConfig = {};

  if (typeof payload.autoOpen === "boolean") {
    next.autoOpen = payload.autoOpen;
  }

  if (payload.initialState === "start" || payload.initialState === "closed") {
    next.initialState = payload.initialState;
  }

  return next;
}

export function sanitizeErrorLog(input: unknown): string {
  if (!input) return "unknown";
  const raw = typeof input === "string" ? input : JSON.stringify(input);
  let safe = raw;

  for (const key of SENSITIVE_KEYS) {
    safe = safe.replace(new RegExp(key, "gi"), "[redacted]");
  }

  return safe.slice(0, 280);
}

export function buildWidgetCsp(frameAncestors: string): string {
  return [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors " + frameAncestors,
    "base-uri 'none'",
    "form-action 'none'",
  ].join("; ");
}

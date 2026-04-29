(() => {
  const currentScript = document.currentScript;
  if (!currentScript) return;

  const widgetUrl = currentScript.getAttribute("data-widget-url");
  const widgetOrigin = currentScript.getAttribute("data-widget-origin") || new URL(widgetUrl).origin;
  const right = currentScript.getAttribute("data-right") || "16px";
  const bottom = currentScript.getAttribute("data-bottom") || "16px";

  if (!widgetUrl) return;

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.right = right;
  container.style.bottom = bottom;
  container.style.zIndex = "9999";
  document.body.appendChild(container);

  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("aria-label", "Abrir chat");
  button.textContent = "Acessibilidade";
  button.style.padding = "0 18px";
  button.style.height = "56px";
  button.style.borderRadius = "9999px";
  button.style.border = "none";
  button.style.cursor = "pointer";
  button.style.background = "#111827";
  button.style.color = "white";
  button.style.fontSize = "16px";
  button.style.fontWeight = "700";
  button.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)";

  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "rgba(0,0,0,0.45)";
  overlay.style.display = "none";
  overlay.style.zIndex = "9998";

  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.right = right;
  modal.style.bottom = `calc(${bottom} + 72px)`;
  modal.style.width = "min(420px, calc(100vw - 24px))";
  modal.style.height = "min(700px, calc(100vh - 100px))";
  modal.style.background = "white";
  modal.style.borderRadius = "16px";
  modal.style.overflow = "hidden";
  modal.style.boxShadow = "0 16px 48px rgba(0,0,0,0.35)";
  modal.style.display = "none";
  modal.style.zIndex = "9999";

  const iframe = document.createElement("iframe");
  iframe.src = widgetUrl;
  iframe.title = "Widget";
  iframe.style.border = "0";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.setAttribute("allow", "clipboard-read; clipboard-write; microphone");
  iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads");

  const openModal = () => {
    overlay.style.display = "block";
    modal.style.display = "block";
  };

  const closeModal = () => {
    overlay.style.display = "none";
    modal.style.display = "none";
  };

  button.addEventListener("click", () => {
    if (modal.style.display === "none") openModal();
    else closeModal();
  });

  overlay.addEventListener("click", closeModal);

  window.addEventListener("message", (event) => {
    if (event.origin !== widgetOrigin) return;
    if (event.data?.type === "widget:close") closeModal();
    if (event.data?.type === "widget:open") openModal();
  });

  modal.appendChild(iframe);
  container.appendChild(button);
  document.body.appendChild(overlay);
  document.body.appendChild(modal);
})();

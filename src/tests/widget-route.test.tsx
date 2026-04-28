import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WidgetPage } from "../components/widget-page";

describe("/widget route", () => {
  it("renders widget shell", () => {
    render(
      <WidgetPage autoOpen initialState="start" allowedOrigins="https://portal.externo.com" />,
    );

    expect(screen.getByText("Assistente virtual IFCE")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Mensagem" })).toBeInTheDocument();
  });
});

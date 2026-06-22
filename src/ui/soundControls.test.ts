import { describe, it, expect, vi } from "vitest";
import { renderSoundControls } from "./soundControls";
import type { SoundSettings } from "../core/soundSettings";

function setup(initial?: Partial<SoundSettings>) {
  const settings: SoundSettings = {
    theme: "kotokoto",
    volume: 0.5,
    ...initial,
  };
  const onChange = vi.fn();
  const el = renderSoundControls(settings, onChange);
  return { el, onChange };
}

describe("renderSoundControls", () => {
  it("renders a theme option for every theme", () => {
    const { el } = setup();
    const select = el.querySelector<HTMLSelectElement>(".sound__select");
    expect(select).not.toBeNull();
    // off, kotokoto, mosumosu, punyupunyu, bubble, doukutu, stone, nyanya,
    // wanwan, piyopiyo
    expect(select?.options.length).toBe(10);
  });

  it("preselects the current theme", () => {
    const { el } = setup({ theme: "nyanya" });
    const select = el.querySelector<HTMLSelectElement>(".sound__select");
    expect(select?.value).toBe("nyanya");
  });

  it("fires onChange with the new theme when the select changes", () => {
    const { el, onChange } = setup();
    const select = el.querySelector<HTMLSelectElement>(".sound__select")!;
    select.value = "piyopiyo";
    select.dispatchEvent(new Event("change"));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ theme: "piyopiyo" }),
    );
  });

  it("toggles mute on and off, preserving the previous volume", () => {
    const { el, onChange } = setup({ volume: 0.5 });
    const mute = el.querySelector<HTMLButtonElement>(".sound__mute")!;

    mute.dispatchEvent(new MouseEvent("click"));
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ volume: 0 }),
    );

    mute.dispatchEvent(new MouseEvent("click"));
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ volume: 0.5 }),
    );
  });

  it("shows a muted state when volume is zero", () => {
    const { el } = setup({ volume: 0 });
    const mute = el.querySelector<HTMLButtonElement>(".sound__mute")!;
    expect(mute.getAttribute("aria-pressed")).toBe("true");
  });
});

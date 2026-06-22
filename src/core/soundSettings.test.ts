import { describe, it, expect, beforeEach } from "vitest";
import {
  loadSoundSettings,
  saveSoundSettings,
  DEFAULT_SOUND_SETTINGS,
  type SoundSettings,
} from "./soundSettings";

beforeEach(() => {
  localStorage.clear();
});

describe("loadSoundSettings", () => {
  it("returns defaults when nothing is stored", () => {
    expect(loadSoundSettings()).toEqual(DEFAULT_SOUND_SETTINGS);
  });

  it("returns defaults when the stored JSON is invalid", () => {
    localStorage.setItem("twe.sound", "{not json");
    expect(loadSoundSettings()).toEqual(DEFAULT_SOUND_SETTINGS);
  });

  it("returns defaults when the stored theme is unknown", () => {
    localStorage.setItem(
      "twe.sound",
      JSON.stringify({ theme: "bogus", volume: 0.5 }),
    );
    expect(loadSoundSettings().theme).toBe(DEFAULT_SOUND_SETTINGS.theme);
  });

  it("loads a previously saved value", () => {
    const settings: SoundSettings = { theme: "nyanya", volume: 0.8 };
    saveSoundSettings(settings);
    expect(loadSoundSettings()).toEqual(settings);
  });

  it("clamps an out-of-range volume into 0..1", () => {
    localStorage.setItem(
      "twe.sound",
      JSON.stringify({ theme: "kotokoto", volume: 5 }),
    );
    expect(loadSoundSettings().volume).toBe(1);
    localStorage.setItem(
      "twe.sound",
      JSON.stringify({ theme: "kotokoto", volume: -2 }),
    );
    expect(loadSoundSettings().volume).toBe(0);
  });
});

describe("saveSoundSettings", () => {
  it("round-trips through localStorage", () => {
    const settings: SoundSettings = { theme: "piyopiyo", volume: 0.3 };
    saveSoundSettings(settings);
    const raw = localStorage.getItem("twe.sound");
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw as string)).toEqual(settings);
  });
});

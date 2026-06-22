import { SOUND_THEME_KEYS, type SoundThemeKey } from "./sound";

/**
 * User-configurable sound settings, persisted across sessions.
 */
export type SoundSettings = {
  theme: SoundThemeKey;
  /** Playback volume in the range 0..1. */
  volume: number;
};

/** Settings used before the user has chosen anything. */
export const DEFAULT_SOUND_SETTINGS: SoundSettings = {
  theme: "kotokoto",
  volume: 0.5,
};

const STORAGE_KEY = "twe.sound";

function clampVolume(value: unknown): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return DEFAULT_SOUND_SETTINGS.volume;
  }
  return Math.min(1, Math.max(0, value));
}

function isThemeKey(value: unknown): value is SoundThemeKey {
  return (
    typeof value === "string" &&
    (SOUND_THEME_KEYS as readonly string[]).includes(value)
  );
}

/**
 * Loads sound settings from localStorage, falling back to defaults when the
 * stored value is missing, malformed, or contains an unknown theme. The volume
 * is clamped into the valid 0..1 range.
 */
export function loadSoundSettings(): SoundSettings {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return { ...DEFAULT_SOUND_SETTINGS };
  }
  if (!raw) {
    return { ...DEFAULT_SOUND_SETTINGS };
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) {
      return { ...DEFAULT_SOUND_SETTINGS };
    }
    const record = parsed as Record<string, unknown>;
    return {
      theme: isThemeKey(record.theme)
        ? record.theme
        : DEFAULT_SOUND_SETTINGS.theme,
      volume: clampVolume(record.volume),
    };
  } catch {
    return { ...DEFAULT_SOUND_SETTINGS };
  }
}

/**
 * Persists sound settings to localStorage. Storage errors are ignored so the
 * app keeps working in private-mode browsers where writes can throw.
 */
export function saveSoundSettings(settings: SoundSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Ignore quota / availability errors.
  }
}

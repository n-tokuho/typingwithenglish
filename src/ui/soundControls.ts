import { SOUND_THEME_KEYS, SOUND_THEMES } from "../core/sound";
import type { SoundSettings } from "../core/soundSettings";

/** Volume restored when un-muting if the previous volume was zero. */
const DEFAULT_UNMUTE_VOLUME = 0.5;

/**
 * Renders the sound control bar shown on the typing screen: a theme selector
 * and a mute toggle. Calls `onChange` with the next settings whenever the user
 * changes anything; the caller is responsible for persisting and applying them.
 */
export function renderSoundControls(
  settings: SoundSettings,
  onChange: (next: SoundSettings) => void,
): HTMLElement {
  // この要素が保持する最新の設定。emit() で更新し、続く操作が古い値を
  // 参照しないようにする(コンポーネント単体でも一貫して動く)。
  let current: SoundSettings = { ...settings };
  // 直前の音量を覚えておき、ミュート解除時に復元する。
  let lastNonZeroVolume =
    current.volume > 0 ? current.volume : DEFAULT_UNMUTE_VOLUME;

  const emit = (next: SoundSettings) => {
    current = next;
    onChange(next);
  };

  const bar = document.createElement("div");
  bar.className = "sound";

  const icon = document.createElement("span");
  icon.className = "sound__icon";
  icon.textContent = "♪";
  icon.setAttribute("aria-hidden", "true");

  const select = document.createElement("select");
  select.className = "sound__select";
  select.setAttribute("aria-label", "タイピング音");
  SOUND_THEME_KEYS.forEach((key) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = SOUND_THEMES[key].label;
    if (key === settings.theme) {
      option.selected = true;
    }
    select.appendChild(option);
  });
  select.addEventListener("change", () => {
    emit({
      ...current,
      theme: select.value as SoundSettings["theme"],
    });
  });

  const mute = document.createElement("button");
  mute.type = "button";
  mute.className = "sound__mute";
  const applyMuteVisual = (volume: number) => {
    const muted = volume <= 0;
    mute.setAttribute("aria-pressed", String(muted));
    mute.textContent = muted ? "🔇" : "🔊";
    mute.setAttribute("aria-label", muted ? "ミュート解除" : "ミュート");
  };
  applyMuteVisual(current.volume);
  mute.addEventListener("click", () => {
    if (current.volume > 0) {
      lastNonZeroVolume = current.volume;
      emit({ ...current, volume: 0 });
    } else {
      emit({ ...current, volume: lastNonZeroVolume });
    }
    applyMuteVisual(current.volume);
  });

  bar.append(icon, select, mute);
  return bar;
}

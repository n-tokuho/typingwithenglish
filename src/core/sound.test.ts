import { describe, it, expect, vi } from "vitest";
import {
  SOUND_THEMES,
  SOUND_THEME_KEYS,
  createSoundPlayer,
} from "./sound";

describe("sound themes", () => {
  it("defines every advertised theme key", () => {
    expect(SOUND_THEME_KEYS).toEqual([
      "off",
      "kotokoto",
      "mosumosu",
      "punyupunyu",
      "bubble",
      "doukutu",
      "stone",
      "nyanya",
      "wanwan",
      "piyopiyo",
    ]);
  });

  it("gives every theme a Japanese label", () => {
    for (const key of SOUND_THEME_KEYS) {
      expect(SOUND_THEMES[key].label.length).toBeGreaterThan(0);
    }
  });
});

/**
 * A minimal fake AudioContext that records how many oscillator/gain nodes were
 * created, so we can assert that play() produces sound without a real audio
 * backend (jsdom has none).
 */
function makeFakeContext() {
  const created = { oscillators: 0, gains: 0, started: 0, sources: 0 };
  const osc = () => {
    created.oscillators++;
    return {
      type: "sine",
      frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn() },
      connect: vi.fn(),
      start: () => { created.started++; },
      stop: vi.fn(),
    };
  };
  const gain = () => {
    created.gains++;
    return {
      gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn(), value: 1 },
      connect: vi.fn(),
    };
  };
  const ctx = {
    currentTime: 0,
    state: "running" as AudioContextState,
    destination: {},
    createOscillator: osc,
    createGain: gain,
    createBufferSource: () => {
      created.sources++;
      return {
        buffer: null,
        playbackRate: { value: 1 },
        connect: vi.fn(),
        start: () => { created.started++; },
        stop: vi.fn(),
      };
    },
    // Pretend any bytes decode into a buffer.
    decodeAudioData: async () => ({}) as AudioBuffer,
    resume: vi.fn(),
  };
  return { ctx, created };
}

describe("createSoundPlayer", () => {
  it("falls back to the synth voice when no file is available", () => {
    const { ctx, created } = makeFakeContext();
    const player = createSoundPlayer({
      getSettings: () => ({ theme: "kotokoto", volume: 0.5 }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contextFactory: () => ctx as any,
      // ファイル取得は失敗扱いにして合成音にフォールバックさせる。
      fetchAudio: async () => null,
    });
    player.play("correct", 0);
    expect(created.oscillators).toBeGreaterThan(0);
    expect(created.started).toBeGreaterThan(0);
    expect(created.sources).toBe(0);
  });

  it("plays the decoded sample once the file has loaded", async () => {
    const { ctx, created } = makeFakeContext();
    const player = createSoundPlayer({
      getSettings: () => ({ theme: "kotokoto", volume: 0.5 }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contextFactory: () => ctx as any,
      fetchAudio: async () => new ArrayBuffer(8),
    });
    // 1回目: 読み込みを開始しつつ合成音で鳴る。
    player.play("correct", 0);
    expect(created.oscillators).toBeGreaterThan(0);
    // 非同期の読み込み(fetch + decode)が解決するのを待つ。
    await Promise.resolve();
    await Promise.resolve();
    // 2回目: サンプルが用意できているのでバッファ再生に切り替わる。
    player.play("correct", 1);
    expect(created.sources).toBeGreaterThan(0);
  });

  it("falls back to the default file when the theme file is missing", async () => {
    const { ctx, created } = makeFakeContext();
    // テーマ固有ファイルは404、既定ファイルだけ取得できる状況を再現する。
    const player = createSoundPlayer({
      getSettings: () => ({ theme: "kotokoto", volume: 0.5 }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contextFactory: () => ctx as any,
      fetchAudio: async (url) =>
        url.endsWith("defult.mp3") ? new ArrayBuffer(8) : null,
    });
    // 1回目: 両ファイルの読み込みを開始しつつ合成音で鳴る。
    player.play("correct", 0);
    await Promise.resolve();
    await Promise.resolve();
    // 2回目: 既定ファイルが用意できているのでバッファ再生になる。
    player.play("correct", 1);
    expect(created.sources).toBeGreaterThan(0);
  });

  it("stays silent when the theme is off", () => {
    const { ctx, created } = makeFakeContext();
    const player = createSoundPlayer({
      getSettings: () => ({ theme: "off", volume: 0.5 }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contextFactory: () => ctx as any,
    });
    player.play("correct", 0);
    expect(created.oscillators).toBe(0);
    expect(created.started).toBe(0);
  });

  it("stays silent when volume is zero", () => {
    const { ctx, created } = makeFakeContext();
    const player = createSoundPlayer({
      getSettings: () => ({ theme: "kotokoto", volume: 0 }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contextFactory: () => ctx as any,
    });
    player.play("correct", 0);
    expect(created.oscillators).toBe(0);
  });
});

/**
 * Web Audio based typing sound engine. Sounds are synthesised on the fly (no
 * audio files), so the app stays small and license-free. Animal themes are
 * playful, deformed approximations rather than realistic recordings.
 */

/** The kind of keystroke a sound responds to. */
export type SoundEvent = "correct" | "incorrect";

/** All available sound theme keys, in display order. */
export const SOUND_THEME_KEYS = [
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
] as const;

export type SoundThemeKey = (typeof SOUND_THEME_KEYS)[number];

/**
 * A theme defines how to render a single keystroke. `voice` is null for the
 * silent "off" theme. Implementations schedule oscillators on the given
 * context and return nothing.
 */
type ThemeVoice = (
  ctx: AudioContext,
  out: AudioNode,
  event: SoundEvent,
  index: number,
) => void;

type SoundTheme = {
  label: string;
  /** Synthesised fallback voice. null only for the silent "off" theme. */
  voice: ThemeVoice | null;
  /**
   * Optional audio file under public/sounds/ (filename only). When present and
   * loadable, it is played instead of the synthesised `voice`. If loading
   * fails, playback falls back to `voice`.
   */
  file?: string;
};

/**
 * Plays a short tone with an exponential decay envelope.
 */
function tone(
  ctx: AudioContext,
  out: AudioNode,
  opts: {
    type: OscillatorType;
    freq: number;
    /** Optional end frequency for a glide. */
    toFreq?: number;
    duration: number;
    peak: number;
  },
): void {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = opts.type;
  osc.frequency.setValueAtTime(opts.freq, now);
  if (opts.toFreq !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(1, opts.toFreq),
      now + opts.duration,
    );
  }
  gain.gain.setValueAtTime(opts.peak, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + opts.duration);
  osc.connect(gain);
  gain.connect(out);
  osc.start(now);
  osc.stop(now + opts.duration);
}

// 入力ごとにわずかにピッチを揺らし、単調さを避ける。
function wobble(index: number, amount = 0.06): number {
  // index に応じて -amount..+amount を緩やかに往復させる(乱数に依存しない)。
  return 1 + Math.sin(index * 1.7) * amount;
}

// 誤入力時は少し低めの音にして区別する。
function eventScale(event: SoundEvent): number {
  return event === "incorrect" ? 0.7 : 1;
}

export const SOUND_THEMES: Record<SoundThemeKey, SoundTheme> = {
  off: { label: "オフ", voice: null },

  kotokoto: {
    label: "コトコト",
    file: "kotokoto.mp3",
    voice: (ctx, out, event, i) => {
      const base = 220 * wobble(i) * eventScale(event);
      tone(ctx, out, { type: "square", freq: base, duration: 0.05, peak: 0.5 });
    },
  },

  mosumosu: {
    label: "もすもす",
    file: "mosu.mp3",
    voice: (ctx, out, event, i) => {
      const base = 160 * wobble(i, 0.04) * eventScale(event);
      tone(ctx, out, {
        type: "triangle",
        freq: base,
        toFreq: base * 0.8,
        duration: 0.09,
        peak: 0.5,
      });
    },
  },

  punyupunyu: {
    label: "ぷにゅぷにゅ",
    file: "punyupunyu.mp3",
    voice: (ctx, out, event, i) => {
      const base = 520 * wobble(i) * eventScale(event);
      tone(ctx, out, { type: "sine", freq: base, duration: 0.04, peak: 0.4 });
    },
  },

  bubble: {
    label: "バブル",
    file: "bubble.mp3",
    voice: (ctx, out, event, i) => {
      // 上昇する短いポップで泡がはじける風のフォールバック。
      const base = 440 * wobble(i, 0.07) * eventScale(event);
      tone(ctx, out, {
        type: "sine",
        freq: base,
        toFreq: base * 2,
        duration: 0.06,
        peak: 0.35,
      });
    },
  },

  doukutu: {
    label: "洞窟",
    file: "doukutu.mp3",
    voice: (ctx, out, event, i) => {
      // 低めで余韻のある反響風のフォールバック。
      const base = 200 * wobble(i, 0.05) * eventScale(event);
      tone(ctx, out, {
        type: "sine",
        freq: base,
        toFreq: base * 0.7,
        duration: 0.2,
        peak: 0.4,
      });
    },
  },

  stone: {
    label: "石",
    file: "stone.mp3",
    voice: (ctx, out, event, i) => {
      // 硬く短い石を打つ風のフォールバック。
      const base = 320 * wobble(i, 0.04) * eventScale(event);
      tone(ctx, out, {
        type: "square",
        freq: base,
        duration: 0.04,
        peak: 0.4,
      });
    },
  },

  nyanya: {
    label: "にゃーにゃー",
    file: "nyanya.mp3",
    voice: (ctx, out, event, i) => {
      const base = 440 * wobble(i, 0.05) * eventScale(event);
      // 上がってから下がるピッチで猫の鳴き声風に。
      tone(ctx, out, {
        type: "sine",
        freq: base,
        toFreq: base * 1.5,
        duration: 0.08,
        peak: 0.4,
      });
      tone(ctx, out, {
        type: "sine",
        freq: base * 1.5,
        toFreq: base * 0.9,
        duration: 0.14,
        peak: 0.35,
      });
    },
  },

  wanwan: {
    label: "わんわん",
    file: "wanwan.mp3",
    voice: (ctx, out, event, i) => {
      const base = 180 * wobble(i, 0.05) * eventScale(event);
      // 低め→さらに低めの短い吠え声風。
      tone(ctx, out, {
        type: "sawtooth",
        freq: base,
        toFreq: base * 0.6,
        duration: 0.1,
        peak: 0.45,
      });
    },
  },

  piyopiyo: {
    label: "ぴよぴよ",
    file: "piyopiyo.mp3",
    voice: (ctx, out, event, i) => {
      const base = 900 * wobble(i, 0.08) * eventScale(event);
      // 高音の短いチャープでひよこ風。
      tone(ctx, out, {
        type: "sine",
        freq: base,
        toFreq: base * 1.4,
        duration: 0.07,
        peak: 0.35,
      });
    },
  },
};

/** Options for {@link createSoundPlayer}. */
export type SoundPlayerOptions = {
  /** Returns the current settings each time a sound plays. */
  getSettings: () => { theme: SoundThemeKey; volume: number };
  /**
   * Creates the AudioContext. Injectable for testing; defaults to the browser
   * AudioContext.
   */
  contextFactory?: () => AudioContext;
  /**
   * Base URL for resolving theme audio files. Defaults to the app base so that
   * `public/sounds/<file>` resolves correctly even under a Pages subpath.
   */
  baseUrl?: string;
  /**
   * Fetches an audio file and returns its bytes. Injectable for testing.
   * Returning null (or throwing) makes the theme fall back to its synth voice.
   */
  fetchAudio?: (url: string) => Promise<ArrayBuffer | null>;
};

/** A live sound player bound to a settings source. */
export type SoundPlayer = {
  /** Plays the sound for an event. `index` drives the per-keystroke wobble. */
  play: (event: SoundEvent, index: number) => void;
  /** Resumes a suspended AudioContext (call after a user gesture). */
  resume: () => void;
};

/**
 * Audio file played when a theme has no file of its own, or while/if a theme's
 * own file is unavailable. Placed in public/sounds/.
 */
export const DEFAULT_SOUND_FILE = "defult.mp3";

/** Per-file load state for file-based audio (keyed by filename). */
type SampleState =
  | { status: "loading" }
  | { status: "ready"; buffer: AudioBuffer }
  // 読み込み失敗。以降はこのファイルを使わない。
  | { status: "failed" };

async function defaultFetchAudio(url: string): Promise<ArrayBuffer | null> {
  const res = await fetch(url);
  if (!res.ok) {
    return null;
  }
  return res.arrayBuffer();
}

/**
 * Plays a decoded sample with a small per-keystroke playback-rate wobble and an
 * event-based pitch shift, routed through the master gain.
 */
function playSample(
  ctx: AudioContext,
  out: AudioNode,
  buffer: AudioBuffer,
  event: SoundEvent,
  index: number,
): void {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.playbackRate.value = wobble(index, 0.05) * eventScale(event);
  source.connect(out);
  source.start(ctx.currentTime);
}

/**
 * Creates a sound player. The AudioContext is lazily created on the first
 * audible play so it can be unlocked by a user gesture, satisfying browser
 * autoplay policies. Themes with a `file` use the decoded sample once loaded,
 * and fall back to the synthesised `voice` while loading or on failure.
 */
export function createSoundPlayer(options: SoundPlayerOptions): SoundPlayer {
  const factory =
    options.contextFactory ??
    (() => new (window.AudioContext || window.webkitAudioContext)());
  const baseUrl = options.baseUrl ?? import.meta.env.BASE_URL;
  const fetchAudio = options.fetchAudio ?? defaultFetchAudio;

  let ctx: AudioContext | null = null;
  // ファイル名でキャッシュする(複数テーマで同じ既定音を共有できる)。
  const samples = new Map<string, SampleState>();

  const ensureContext = (): AudioContext | null => {
    if (!ctx) {
      try {
        ctx = factory();
      } catch {
        return null;
      }
    }
    return ctx;
  };

  // 音源ファイルを非同期で読み込む。完了後は次回以降の再生で使われる。
  const loadSample = (context: AudioContext, file: string): void => {
    if (samples.has(file)) {
      return;
    }
    samples.set(file, { status: "loading" });
    const url = `${baseUrl}sounds/${file}`;
    fetchAudio(url)
      .then(async (bytes) => {
        if (!bytes) {
          samples.set(file, { status: "failed" });
          return;
        }
        const buffer = await context.decodeAudioData(bytes.slice(0));
        samples.set(file, { status: "ready", buffer });
      })
      .catch(() => {
        samples.set(file, { status: "failed" });
      });
  };

  // 用意できていれば指定ファイルを再生し true を返す。未読込なら読み込みを
  // 開始しつつ false を返す(呼び出し側が次の手段にフォールバックできる)。
  const tryPlayFile = (
    context: AudioContext,
    out: AudioNode,
    file: string,
    event: SoundEvent,
    index: number,
  ): boolean => {
    const state = samples.get(file);
    if (!state) {
      loadSample(context, file);
      return false;
    }
    if (state.status === "ready") {
      playSample(context, out, state.buffer, event, index);
      return true;
    }
    return false;
  };

  return {
    play(event, index) {
      const { theme, volume } = options.getSettings();
      const def = SOUND_THEMES[theme];
      if (!def.voice || volume <= 0) {
        return;
      }
      const context = ensureContext();
      if (!context) {
        return;
      }
      if (context.state === "suspended") {
        context.resume();
      }

      const master = context.createGain();
      master.gain.value = volume;
      master.connect(context.destination);

      // 再生の優先順位: テーマ固有のファイル → 既定ファイル(defult.mp3) → 合成音。
      // ファイル音源は読み込み中・失敗時に次の手段へフォールバックする。
      if (def.file && tryPlayFile(context, master, def.file, event, index)) {
        return;
      }
      if (tryPlayFile(context, master, DEFAULT_SOUND_FILE, event, index)) {
        return;
      }
      def.voice(context, master, event, index);
    },
    resume() {
      const context = ensureContext();
      if (context && context.state === "suspended") {
        context.resume();
      }
    },
  };
}

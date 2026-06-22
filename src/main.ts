import "./styles/main.scss";
import {
  createGame,
  currentSentence,
  pickRandomSentences,
  typeKey,
  type Game,
} from "./core/game";
import { renderSentence, renderProgress } from "./ui/render";
import {
  renderStartScreen,
  renderTypingScreen,
  renderResultScreen,
} from "./ui/screens";
import { createSoundPlayer } from "./core/sound";
import {
  loadSoundSettings,
  saveSoundSettings,
  type SoundSettings,
} from "./core/soundSettings";
import { renderSoundControls } from "./ui/soundControls";

/** Number of sentences per game session. */
const SENTENCES_PER_GAME = 5;

/** Current sound settings, loaded from localStorage and updated by the UI. */
let soundSettings: SoundSettings = loadSoundSettings();

const soundPlayer = createSoundPlayer({
  getSettings: () => soundSettings,
});

function updateSoundSettings(next: SoundSettings): void {
  soundSettings = next;
  saveSoundSettings(next);
  // 設定変更も「ユーザー操作」なので、ここで AudioContext を解放しておく。
  soundPlayer.resume();
}

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) {
  throw new Error("#app element not found");
}
const root = app;

/** Total characters typed across completed sentences, for the WPM stat. */
let completedChars = 0;
let game: Game | null = null;
let keyHandler: ((e: KeyboardEvent) => void) | null = null;

function clearKeyHandler(): void {
  if (keyHandler) {
    window.removeEventListener("keydown", keyHandler);
    keyHandler = null;
  }
}

function mount(screen: HTMLElement): void {
  root.replaceChildren(screen);
}

function showStart(): void {
  clearKeyHandler();
  const screen = renderStartScreen(startGame);
  mount(screen);

  // Allow starting with Enter or Space for a keyboard-first flow.
  keyHandler = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      startGame();
    }
  };
  window.addEventListener("keydown", keyHandler);
}

function startGame(): void {
  clearKeyHandler();
  completedChars = 0;
  game = createGame(pickRandomSentences(SENTENCES_PER_GAME));

  const controls = renderSoundControls(soundSettings, updateSoundSettings);
  const screen = renderTypingScreen(controls);
  mount(screen);
  const stage = screen.querySelector<HTMLElement>(".typing__stage");
  if (!stage) {
    throw new Error(".typing__stage not found");
  }

  updateStage(stage);

  // 鳴らした音にピッチの揺らぎを与えるためのキーストロークカウンタ。
  let keystroke = 0;

  keyHandler = (e: KeyboardEvent) => {
    if (!game) {
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      showStart();
      return;
    }
    // Ignore modifier combos so shortcuts (e.g. devtools) still work.
    if (e.ctrlKey || e.metaKey || e.altKey) {
      return;
    }
    // Prevent the browser from scrolling on Space / Backspace navigation.
    if (e.key === " " || e.key === "Backspace") {
      e.preventDefault();
    }

    const sentence = currentSentence(game);
    const before = sentence?.en.length ?? 0;
    const beforeTyped = game.typed;
    const next = typeKey(game, e.key);

    // 入力された文字が増えたときだけ音を鳴らす(Backspaceや無視キーでは鳴らさない)。
    // 直前に入力された1文字が正解か誤りかで音を出し分ける。
    if (sentence && next.typed.length > beforeTyped.length) {
      const pos = beforeTyped.length;
      const correct = sentence.en[pos] === next.typed[pos];
      soundPlayer.play(correct ? "correct" : "incorrect", keystroke++);
    } else if (next.currentIndex !== game.currentIndex || next.finished) {
      // 文の最後の文字で完了したケースも正解音を鳴らす。
      soundPlayer.play("correct", keystroke++);
    }

    // When a sentence was just completed, its full length is added to the
    // running total used for the WPM calculation.
    if (next.currentIndex !== game.currentIndex || next.finished) {
      if (sentence && next.typed === "") {
        completedChars += before;
      }
    }

    game = next;

    if (game.finished) {
      showResult();
      return;
    }
    updateStage(stage);
  };
  window.addEventListener("keydown", keyHandler);
}

function updateStage(stage: HTMLElement): void {
  if (!game) {
    return;
  }
  const sentence = currentSentence(game);
  if (!sentence) {
    return;
  }

  stage.replaceChildren(
    renderProgress(game.currentIndex, game.sentences.length),
    renderSentence(sentence, game.typed),
  );
}

function showResult(): void {
  clearKeyHandler();
  if (!game) {
    return;
  }
  const elapsed = game.startedAt ? Date.now() - game.startedAt : 0;
  const screen = renderResultScreen({
    sentences: game.sentences,
    totalChars: completedChars,
    elapsedMs: elapsed,
    onRestart: startGame,
  });
  mount(screen);

  keyHandler = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      startGame();
    }
  };
  window.addEventListener("keydown", keyHandler);
}

showStart();

import { calculateWpm, formatDuration } from "../core/stats";
import type { Sentence } from "../data/sentences";
import { renderWords } from "./render";

/**
 * Builds the start screen with a title and a "start" prompt.
 * @param onStart Called when the user starts a new game.
 */
export function renderStartScreen(onStart: () => void): HTMLElement {
  const screen = document.createElement("div");
  screen.className = "screen screen--start";

  const title = document.createElement("h1");
  title.className = "title";
  title.innerHTML = `<span class="title__neon">TYPE</span><span class="title__accent">WITH</span><span class="title__neon">ENGLISH</span>`;

  const subtitle = document.createElement("p");
  subtitle.className = "subtitle";
  subtitle.textContent = "英文をタイプして学ぶ。日本語訳つき。時間制限なし。";

  const button = document.createElement("button");
  button.className = "btn";
  button.textContent = "START";
  button.addEventListener("click", onStart);

  const hint = document.createElement("p");
  hint.className = "hint";
  hint.textContent =
    "Enter / Space / START でスタート / Esc でいつでもリスタート";

  screen.append(title, subtitle, button, hint);
  return screen;
}

/**
 * Builds the empty typing-screen shell. The active sentence and progress are
 * injected into the `.typing__stage` node on each update.
 *
 * @param controls Optional control bar (e.g. sound controls) pinned at the top.
 */
export function renderTypingScreen(controls?: HTMLElement): HTMLElement {
  const screen = document.createElement("div");
  screen.className = "screen screen--typing";

  if (controls) {
    const toolbar = document.createElement("div");
    toolbar.className = "typing__toolbar";
    toolbar.appendChild(controls);
    screen.appendChild(toolbar);
  }

  const stage = document.createElement("div");
  stage.className = "typing__stage";

  const hint = document.createElement("p");
  hint.className = "hint";
  hint.textContent = "そのままタイプ / Backspace で修正 / Esc でリスタート";

  screen.append(stage, hint);
  return screen;
}

/**
/** Inputs for the result screen. */
export type ResultScreenProps = {
  /** Sentences that were typed this game, for the review list. */
  sentences: Sentence[];
  /** Total characters typed, for the WPM stat. */
  totalChars: number;
  /** Elapsed time in milliseconds. */
  elapsedMs: number;
  /** Called when the user wants to play again. */
  onRestart: () => void;
};

/**
 * Builds the result screen: light stats only (no accuracy score) plus a review
 * list of every sentence from this game with its translation and phrase notes.
 */
export function renderResultScreen(props: ResultScreenProps): HTMLElement {
  const { sentences, totalChars, elapsedMs, onRestart } = props;

  const screen = document.createElement("div");
  screen.className = "screen screen--result";

  const heading = document.createElement("h2");
  heading.className = "result__heading";
  heading.textContent = "COMPLETE";

  const stats = document.createElement("div");
  stats.className = "result__stats";
  stats.appendChild(statItem(`${sentences.length}`, "文"));
  stats.appendChild(statItem(formatDuration(elapsedMs), "TIME"));
  stats.appendChild(statItem(`${calculateWpm(totalChars, elapsedMs)}`, "WPM"));

  const button = document.createElement("button");
  button.className = "btn";
  button.textContent = "もう一度";
  button.addEventListener("click", onRestart);

  // 今回出題された文の振り返り。英文・訳・解説をまとめて一覧表示する。
  const review = renderReview(sentences);

  const hint = document.createElement("p");
  hint.className = "hint";
  hint.textContent = "Enter または もう一度 で再挑戦";

  screen.append(heading, stats, review, button, hint);
  return screen;
}

/**
 * Builds the review list shown on the result screen: one card per sentence with
 * its English text, Japanese translation, attribution (for speeches) and the
 * phrase notes.
 */
function renderReview(sentences: Sentence[]): HTMLElement {
  const list = document.createElement("div");
  list.className = "review";

  const title = document.createElement("h3");
  title.className = "review__title";
  title.textContent = "REVIEW — 今回のフレーズ";
  list.appendChild(title);

  sentences.forEach((sentence, i) => {
    const card = document.createElement("div");
    card.className = "review__card";

    const en = document.createElement("div");
    en.className = "review__en";
    const num = document.createElement("span");
    num.className = "review__num";
    num.textContent = `${i + 1}.`;
    const enText = document.createElement("span");
    enText.textContent = sentence.en;
    en.append(num, enText);

    const ja = document.createElement("div");
    ja.className = "review__ja";
    ja.textContent = sentence.ja;

    card.append(en, ja);

    if (sentence.attribution) {
      const credit = document.createElement("div");
      credit.className = "review__credit";
      credit.textContent = `— ${sentence.attribution}`;
      card.appendChild(credit);
    }

    const notes = document.createElement("ul");
    notes.className = "review__notes";
    sentence.notes.forEach((text) => {
      const li = document.createElement("li");
      li.className = "review__note";
      li.textContent = text;
      notes.appendChild(li);
    });
    card.appendChild(notes);

    // 少し難しい単語の意味も振り返れるよう、カードに単語一覧を添える。
    if (sentence.words.length > 0) {
      card.appendChild(renderWords(sentence.words));
    }

    list.appendChild(card);
  });

  return list;
}

function statItem(value: string, label: string): HTMLElement {
  const item = document.createElement("div");
  item.className = "stat";
  const v = document.createElement("div");
  v.className = "stat__value";
  v.textContent = value;
  const l = document.createElement("div");
  l.className = "stat__label";
  l.textContent = label;
  item.append(v, l);
  return item;
}

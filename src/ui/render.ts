import { compareChars } from "../core/typing";
import type { Sentence, WordGloss } from "../data/sentences";

/**
 * Builds the DOM for the sentence being typed: each target character becomes a
 * <span> whose class reflects its status (correct / incorrect / pending). The
 * character spans never move as you type — only their status class changes. The
 * caret is shown as a CSS pseudo-element on the span at the current input
 * position (`.char--caret`), so it overlays the layout without shifting any
 * characters. The Japanese translation is rendered below.
 *
 * @returns A container element ready to be mounted into the typing screen.
 */
export function renderSentence(sentence: Sentence, typed: string): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.className = "sentence";

  const line = document.createElement("div");
  line.className = "sentence__en";

  const results = compareChars(sentence.en, typed);
  const caretIndex = Math.min(typed.length, sentence.en.length);

  // 文字spanを単語ごとに .word でまとめる。.word は折り返し不可の単位として
  // 扱うため、改行は必ず単語間(スペース位置)でのみ起き、単語の途中で割れない。
  let currentWord: HTMLElement | null = null;
  const charSpans: HTMLElement[] = [];

  const startWord = (): HTMLElement => {
    const word = document.createElement("span");
    word.className = "word";
    line.appendChild(word);
    return word;
  };

  results.forEach((result, i) => {
    const span = document.createElement("span");
    span.className = `char char--${result.status}`;
    // カーソル位置の文字spanに目印を付け、CSSの擬似要素として左端に
    // カーソルを重ねる。文字自体のレイアウトは変えない。
    if (i === caretIndex) {
      span.classList.add("char--caret");
    }

    if (result.char === " ") {
      // スペースは単語の外に置き、ここで折り返しを許可する。
      span.classList.add("char--space");
      span.textContent = " ";
      line.appendChild(span);
      currentWord = null;
    } else {
      if (!currentWord) {
        currentWord = startWord();
      }
      span.textContent = result.char;
      currentWord.appendChild(span);
    }
    charSpans.push(span);
  });

  // 末尾までタイプし終えた場合は、最後の文字の右側にカーソルを表示する。
  if (caretIndex >= results.length && charSpans.length > 0) {
    charSpans[charSpans.length - 1].classList.add("char--caret-end");
  }

  const ja = document.createElement("div");
  ja.className = "sentence__ja";
  ja.textContent = sentence.ja;

  wrapper.appendChild(line);
  wrapper.appendChild(ja);

  // フレーズの解説(イディオム・構文・使いどころ)を訳の下に常に表示する。
  // 解説は1フレーズにつき1行で、各行の先頭にビュレットを付ける。
  const note = document.createElement("div");
  note.className = "sentence__note";
  sentence.notes.forEach((text) => {
    const row = document.createElement("div");
    row.className = "sentence__note-row";
    const bullet = document.createElement("span");
    bullet.className = "sentence__note-bullet";
    bullet.textContent = "▸";
    const body = document.createElement("span");
    body.className = "sentence__note-text";
    body.textContent = text;
    row.append(bullet, body);
    note.appendChild(row);
  });
  wrapper.appendChild(note);

  // 少し難しい単語の意味を、解説の下にまとめて表示する。
  if (sentence.words.length > 0) {
    wrapper.appendChild(renderWords(sentence.words));
  }

  // スピーチ引用には話者・出典を添えて学習の手がかりにする。
  if (sentence.attribution) {
    const credit = document.createElement("div");
    credit.className = "sentence__credit";
    credit.textContent = `— ${sentence.attribution}`;
    wrapper.appendChild(credit);
  }

  return wrapper;
}

/**
 * Renders a compact "word: meaning" gloss list for the harder words in a
 * sentence. Each entry is a chip showing the English word and its Japanese
 * meaning, so the learner can look up vocabulary at a glance.
 */
export function renderWords(words: WordGloss[]): HTMLElement {
  const list = document.createElement("div");
  list.className = "words";
  words.forEach(({ word, meaning }) => {
    const chip = document.createElement("span");
    chip.className = "words__item";
    const w = document.createElement("span");
    w.className = "words__word";
    w.textContent = word;
    const eq = document.createElement("span");
    eq.className = "words__eq";
    eq.textContent = "=";
    const m = document.createElement("span");
    m.className = "words__meaning";
    m.textContent = meaning;
    chip.append(w, eq, m);
    list.appendChild(chip);
  });
  return list;
}

/**
 * Renders the progress indicator, e.g. "3 / 5".
 */
export function renderProgress(current: number, total: number): HTMLElement {
  const el = document.createElement("div");
  el.className = "progress";
  el.textContent = `${Math.min(current + 1, total)} / ${total}`;
  return el;
}

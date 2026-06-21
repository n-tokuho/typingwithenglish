import { describe, it, expect } from "vitest";
import { renderSentence, renderProgress } from "./render";
import type { Sentence } from "../data/sentences";

const SENTENCE: Sentence = {
  id: "x",
  en: "cat",
  ja: "ねこ",
  notes: ["cat=ねこ。", "可算名詞。"],
  words: [{ word: "cat", meaning: "ねこ" }],
  source: "conversation",
};

describe("renderSentence", () => {
  it("renders one char span per target character", () => {
    const el = renderSentence(SENTENCE, "");
    expect(el.querySelectorAll(".char")).toHaveLength(3);
  });

  it("marks typed characters with correct / incorrect classes", () => {
    const el = renderSentence(SENTENCE, "cx");
    const chars = el.querySelectorAll(".char");
    expect(chars[0].className).toContain("char--correct");
    expect(chars[1].className).toContain("char--incorrect");
    expect(chars[2].className).toContain("char--pending");
  });

  it("includes the Japanese translation", () => {
    const el = renderSentence(SENTENCE, "");
    expect(el.querySelector(".sentence__ja")?.textContent).toBe("ねこ");
  });

  it("shows one note row per phrase", () => {
    const el = renderSentence(SENTENCE, "");
    const rows = el.querySelectorAll(".sentence__note-row");
    expect(rows).toHaveLength(2);
    const texts = Array.from(
      el.querySelectorAll(".sentence__note-text"),
    ).map((n) => n.textContent);
    expect(texts).toEqual(["cat=ねこ。", "可算名詞。"]);
  });

  it("shows a gloss chip for each harder word", () => {
    const el = renderSentence(SENTENCE, "");
    const items = el.querySelectorAll(".words__item");
    expect(items).toHaveLength(1);
    expect(items[0].querySelector(".words__word")?.textContent).toBe("cat");
    expect(items[0].querySelector(".words__meaning")?.textContent).toBe("ねこ");
  });

  it("omits the word list when there are no harder words", () => {
    const plain: Sentence = { ...SENTENCE, words: [] };
    const el = renderSentence(plain, "");
    expect(el.querySelector(".words")).toBeNull();
  });

  it("omits the credit line for conversation sentences", () => {
    const el = renderSentence(SENTENCE, "");
    expect(el.querySelector(".sentence__credit")).toBeNull();
  });

  it("shows an attribution credit for speech sentences", () => {
    const speech: Sentence = {
      id: "q",
      en: "go",
      ja: "行け",
      notes: ["go=行く。"],
      words: [],
      source: "speech",
      attribution: "Someone Famous",
    };
    const el = renderSentence(speech, "");
    expect(el.querySelector(".sentence__credit")?.textContent).toBe(
      "— Someone Famous",
    );
  });

  it("marks the char at the current position with the caret class", () => {
    const el = renderSentence(SENTENCE, "c");
    const carets = el.querySelectorAll(".char--caret");
    expect(carets).toHaveLength(1);
    // "c" typed -> caret sits on index 1 ("a"), without moving any char span.
    expect(carets[0].textContent).toBe("a");
  });

  it("keeps every char span in place regardless of input", () => {
    const chars = (typed: string) =>
      Array.from(renderSentence(SENTENCE, typed).querySelectorAll(".char")).map(
        (c) => c.textContent,
      );
    // The rendered character sequence is identical no matter how much is typed.
    expect(chars("")).toEqual(["c", "a", "t"]);
    expect(chars("c")).toEqual(["c", "a", "t"]);
    expect(chars("cat")).toEqual(["c", "a", "t"]);
  });

  it("shows an end caret on the last char when fully typed", () => {
    const el = renderSentence(SENTENCE, "cat");
    expect(el.querySelectorAll(".char--caret")).toHaveLength(0);
    const end = el.querySelectorAll(".char--caret-end");
    expect(end).toHaveLength(1);
    expect(end[0].textContent).toBe("t");
  });
});

describe("renderProgress", () => {
  it("shows a 1-based current index over the total", () => {
    expect(renderProgress(0, 5).textContent).toBe("1 / 5");
    expect(renderProgress(2, 5).textContent).toBe("3 / 5");
  });
});

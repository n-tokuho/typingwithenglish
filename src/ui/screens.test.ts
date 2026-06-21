import { describe, it, expect } from "vitest";
import { renderResultScreen } from "./screens";
import type { Sentence } from "../data/sentences";

const SENTENCES: Sentence[] = [
  {
    id: "a",
    en: "Let's play it by ear.",
    ja: "臨機応変にやろう。",
    notes: ["play it by ear=臨機応変にやる。"],
    words: [],
    source: "conversation",
  },
  {
    id: "b",
    en: "Stay hungry.",
    ja: "ハングリーであれ。",
    notes: ["stay+形容詞=その状態を保て。", "命令形。"],
    words: [{ word: "hungry", meaning: "空腹の・渇望して" }],
    source: "speech",
    attribution: "Steve Jobs",
  },
];

function render() {
  return renderResultScreen({
    sentences: SENTENCES,
    totalChars: 30,
    elapsedMs: 60_000,
    onRestart: () => {},
  });
}

describe("renderResultScreen review list", () => {
  it("shows one review card per sentence", () => {
    const el = render();
    expect(el.querySelectorAll(".review__card")).toHaveLength(2);
  });

  it("lists each sentence's English and Japanese", () => {
    const el = render();
    const en = Array.from(el.querySelectorAll(".review__en")).map((n) =>
      n.textContent,
    );
    expect(en[0]).toContain("Let's play it by ear.");
    const ja = Array.from(el.querySelectorAll(".review__ja")).map((n) =>
      n.textContent,
    );
    expect(ja).toEqual(["臨機応変にやろう。", "ハングリーであれ。"]);
  });

  it("renders one note item per phrase", () => {
    const el = render();
    const cards = el.querySelectorAll(".review__card");
    expect(cards[0].querySelectorAll(".review__note")).toHaveLength(1);
    expect(cards[1].querySelectorAll(".review__note")).toHaveLength(2);
  });

  it("shows word glosses only when the sentence has harder words", () => {
    const el = render();
    const cards = el.querySelectorAll(".review__card");
    expect(cards[0].querySelector(".words")).toBeNull();
    const items = cards[1].querySelectorAll(".words__item");
    expect(items).toHaveLength(1);
    expect(items[0].querySelector(".words__word")?.textContent).toBe("hungry");
  });

  it("shows attribution only for speech sentences", () => {
    const el = render();
    const cards = el.querySelectorAll(".review__card");
    expect(cards[0].querySelector(".review__credit")).toBeNull();
    expect(cards[1].querySelector(".review__credit")?.textContent).toBe(
      "— Steve Jobs",
    );
  });

  it("reports the sentence count in the stats", () => {
    const el = render();
    const values = Array.from(el.querySelectorAll(".stat__value")).map((n) =>
      n.textContent,
    );
    expect(values[0]).toBe("2");
  });
});

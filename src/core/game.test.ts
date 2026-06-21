import { describe, it, expect } from "vitest";
import {
  createGame,
  typeKey,
  isSentenceComplete,
  currentSentence,
  type Game,
} from "./game";
import type { Sentence } from "../data/sentences";

const SAMPLE: Sentence[] = [
  {
    id: "a",
    en: "ab",
    ja: "あ",
    notes: ["note a"],
    words: [],
    source: "conversation",
  },
  {
    id: "b",
    en: "cd",
    ja: "い",
    notes: ["note b"],
    words: [],
    source: "conversation",
  },
];

function makeGame(): Game {
  return createGame(SAMPLE);
}

describe("createGame", () => {
  it("starts at the first sentence with empty input", () => {
    const game = makeGame();
    expect(game.currentIndex).toBe(0);
    expect(game.typed).toBe("");
    expect(game.finished).toBe(false);
    expect(game.startedAt).toBeNull();
  });

  it("uses the provided sentences", () => {
    const game = makeGame();
    expect(game.sentences).toHaveLength(2);
  });
});

describe("currentSentence", () => {
  it("returns the sentence at the current index", () => {
    const game = makeGame();
    expect(currentSentence(game)?.en).toBe("ab");
  });

  it("returns undefined when the game is finished", () => {
    let game = makeGame();
    game = typeKey(typeKey(game, "a"), "b"); // finish "ab"
    game = typeKey(typeKey(game, "c"), "d"); // finish "cd"
    expect(currentSentence(game)).toBeUndefined();
  });
});

describe("typeKey", () => {
  it("records the start time on the first keystroke", () => {
    const game = typeKey(makeGame(), "a");
    expect(game.startedAt).not.toBeNull();
  });

  it("appends typed characters", () => {
    const game = typeKey(makeGame(), "a");
    expect(game.typed).toBe("a");
  });

  it("advances to the next sentence when the current one is complete", () => {
    let game = makeGame();
    game = typeKey(game, "a");
    game = typeKey(game, "b");
    expect(game.currentIndex).toBe(1);
    expect(game.typed).toBe("");
  });

  it("marks the game finished after the last sentence", () => {
    let game = makeGame();
    game = typeKey(typeKey(game, "a"), "b");
    game = typeKey(typeKey(game, "c"), "d");
    expect(game.finished).toBe(true);
  });

  it("supports backspace within a sentence", () => {
    let game = makeGame();
    game = typeKey(game, "a");
    game = typeKey(game, "Backspace");
    expect(game.typed).toBe("");
  });

  it("does not advance when the last character is wrong", () => {
    let game = makeGame();
    game = typeKey(game, "a");
    game = typeKey(game, "x");
    expect(game.currentIndex).toBe(0);
    expect(game.typed).toBe("ax");
  });
});

describe("isSentenceComplete", () => {
  it("is true only when typed exactly equals the target", () => {
    expect(isSentenceComplete("ab", "ab")).toBe(true);
    expect(isSentenceComplete("a", "ab")).toBe(false);
    expect(isSentenceComplete("ax", "ab")).toBe(false);
  });
});

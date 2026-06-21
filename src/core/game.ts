import { SENTENCES, type Sentence } from "../data/sentences";
import { applyKey } from "./typing";

/**
 * Picks `count` random sentences (without repetition) from the full pool.
 * Falls back to the whole shuffled pool when `count` exceeds its size.
 */
export function pickRandomSentences(
  count: number,
  pool: Sentence[] = SENTENCES,
): Sentence[] {
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * The full state of one typing game session.
 */
export type Game = {
  /** Sentences selected for this game, in order. */
  sentences: Sentence[];
  /** Index of the sentence currently being typed. */
  currentIndex: number;
  /** Characters typed so far for the current sentence. */
  typed: string;
  /** Epoch milliseconds of the first keystroke, or null before it. */
  startedAt: number | null;
  /** True once the final sentence has been completed. */
  finished: boolean;
};

/**
 * Creates a fresh game from the given sentences.
 */
export function createGame(sentences: Sentence[]): Game {
  return {
    sentences,
    currentIndex: 0,
    typed: "",
    startedAt: null,
    finished: false,
  };
}

/**
 * Returns the sentence currently being typed, or undefined if the game is over.
 */
export function currentSentence(game: Game): Sentence | undefined {
  if (game.finished) {
    return undefined;
  }
  return game.sentences[game.currentIndex];
}

/**
 * Returns true when the typed string exactly matches the target sentence.
 */
export function isSentenceComplete(typed: string, target: string): boolean {
  return typed === target;
}

/**
 * Applies a single keystroke to the game and returns the next state. Records the
 * start time on the first keystroke, advances to the next sentence when the
 * current one is completed correctly, and marks the game finished after the last.
 *
 * Pure function: a fresh Game object is returned and the input is not mutated.
 */
export function typeKey(game: Game, key: string): Game {
  if (game.finished) {
    return game;
  }

  const sentence = currentSentence(game);
  if (!sentence) {
    return { ...game, finished: true };
  }

  const startedAt = game.startedAt ?? Date.now();
  const typed = applyKey(game.typed, key, sentence.en);

  if (isSentenceComplete(typed, sentence.en)) {
    const nextIndex = game.currentIndex + 1;
    const finished = nextIndex >= game.sentences.length;
    return {
      ...game,
      startedAt,
      currentIndex: finished ? game.currentIndex : nextIndex,
      typed: "",
      finished,
    };
  }

  return { ...game, startedAt, typed };
}

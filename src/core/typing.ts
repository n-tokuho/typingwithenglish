/**
 * Per-character comparison status used to drive the colored rendering.
 * - `correct`: typed and matches the target
 * - `incorrect`: typed but differs from the target
 * - `pending`: not yet typed
 */
export type CharStatus = "correct" | "incorrect" | "pending";

/**
 * A single target character paired with how the user's current input compares.
 */
export type CharResult = {
  char: string;
  status: CharStatus;
};

/**
 * Compares the user's typed string against the target sentence and returns a
 * per-character status list (one entry per target character). Typed characters
 * beyond the target length are ignored.
 */
export function compareChars(target: string, typed: string): CharResult[] {
  return Array.from(target).map((char, i) => {
    let status: CharStatus;
    if (i >= typed.length) {
      status = "pending";
    } else if (typed[i] === char) {
      status = "correct";
    } else {
      status = "incorrect";
    }
    return { char, status };
  });
}

/**
 * Returns true when the key represents a single printable character that should
 * be appended to the input (letters, digits, punctuation, space).
 */
function isPrintable(key: string): boolean {
  return key.length === 1;
}

/**
 * Applies a keydown to the current typed string for a sentence and returns the
 * next typed string. Handles Backspace, ignores non-printable keys, and never
 * lets the input grow longer than the target.
 */
export function applyKey(typed: string, key: string, target: string): string {
  if (key === "Backspace") {
    return typed.slice(0, -1);
  }
  if (!isPrintable(key)) {
    return typed;
  }
  if (typed.length >= target.length) {
    return typed;
  }
  return typed + key;
}

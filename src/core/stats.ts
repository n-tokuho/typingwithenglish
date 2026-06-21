/** Standard typing convention: one "word" is five characters. */
const CHARS_PER_WORD = 5;
const MS_PER_MINUTE = 60_000;

/**
 * Calculates words-per-minute from a character count and elapsed milliseconds,
 * using the standard 5-characters-per-word convention. Returns 0 when no time
 * has elapsed. Result is rounded to the nearest whole number.
 */
export function calculateWpm(charCount: number, elapsedMs: number): number {
  if (elapsedMs <= 0) {
    return 0;
  }
  const words = charCount / CHARS_PER_WORD;
  const minutes = elapsedMs / MS_PER_MINUTE;
  return Math.round(words / minutes);
}

/**
 * Formats an elapsed duration in milliseconds as "m:ss".
 */
export function formatDuration(elapsedMs: number): string {
  const totalSeconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

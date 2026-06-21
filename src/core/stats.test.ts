import { describe, it, expect } from "vitest";
import { calculateWpm, formatDuration } from "./stats";

describe("calculateWpm", () => {
  it("returns 0 when no time has elapsed", () => {
    expect(calculateWpm(50, 0)).toBe(0);
  });

  it("uses the standard 5-characters-per-word convention", () => {
    // 50 chars in 60 seconds => 10 words / 1 minute => 10 wpm
    expect(calculateWpm(50, 60_000)).toBe(10);
  });

  it("scales with elapsed time", () => {
    // 50 chars in 30 seconds => 10 words / 0.5 minute => 20 wpm
    expect(calculateWpm(50, 30_000)).toBe(20);
  });

  it("rounds to the nearest whole number", () => {
    // 26 chars in 60s => 5.2 words/min => 5
    expect(calculateWpm(26, 60_000)).toBe(5);
  });
});

describe("formatDuration", () => {
  it("formats sub-minute durations as seconds", () => {
    expect(formatDuration(5_000)).toBe("0:05");
  });

  it("formats durations with minutes", () => {
    expect(formatDuration(75_000)).toBe("1:15");
  });

  it("pads seconds with a leading zero", () => {
    expect(formatDuration(61_000)).toBe("1:01");
  });
});

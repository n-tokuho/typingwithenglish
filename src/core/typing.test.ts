import { describe, it, expect } from "vitest";
import { compareChars, applyKey, type CharStatus } from "./typing";

describe("compareChars", () => {
  const target = "cat";

  it("marks all characters as pending when nothing is typed", () => {
    const result = compareChars(target, "");
    expect(result.map((c) => c.status)).toEqual<CharStatus[]>([
      "pending",
      "pending",
      "pending",
    ]);
  });

  it("marks correctly typed characters as correct", () => {
    const result = compareChars(target, "ca");
    expect(result.map((c) => c.status)).toEqual<CharStatus[]>([
      "correct",
      "correct",
      "pending",
    ]);
  });

  it("marks a wrong character as incorrect", () => {
    const result = compareChars(target, "cx");
    expect(result.map((c) => c.status)).toEqual<CharStatus[]>([
      "correct",
      "incorrect",
      "pending",
    ]);
  });

  it("keeps the original target character even when typed wrong", () => {
    const result = compareChars(target, "cx");
    expect(result.map((c) => c.char)).toEqual(["c", "a", "t"]);
  });

  it("ignores typed characters beyond the target length", () => {
    const result = compareChars("ab", "abcd");
    expect(result).toHaveLength(2);
    expect(result.map((c) => c.status)).toEqual<CharStatus[]>([
      "correct",
      "correct",
    ]);
  });
});

describe("applyKey", () => {
  it("appends a printable character", () => {
    expect(applyKey("ca", "t", "cat")).toBe("cat");
  });

  it("removes the last character on Backspace", () => {
    expect(applyKey("cat", "Backspace", "cat")).toBe("ca");
  });

  it("does nothing on Backspace when input is empty", () => {
    expect(applyKey("", "Backspace", "cat")).toBe("");
  });

  it("does not append beyond the target length", () => {
    expect(applyKey("cat", "s", "cat")).toBe("cat");
  });

  it("ignores non-printable keys", () => {
    expect(applyKey("ca", "Shift", "cat")).toBe("ca");
    expect(applyKey("ca", "Enter", "cat")).toBe("ca");
    expect(applyKey("ca", "ArrowLeft", "cat")).toBe("ca");
  });

  it("accepts a space character", () => {
    expect(applyKey("a", " ", "a b")).toBe("a ");
  });
});

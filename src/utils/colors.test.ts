import { describe, it, expect } from "vitest";
import {
  mixColors,
  recognizeColor,
  formatResult,
  EMPTY_COLOR,
  PRESETS,
} from "./colors";

describe("mixColors", () => {
  it("returns EMPTY_COLOR for no inputs", () => {
    expect(mixColors([])).toEqual(EMPTY_COLOR);
  });

  it("returns the single color for one input", () => {
    expect(mixColors([{ r: 10, g: 20, b: 30 }])).toEqual({ r: 10, g: 20, b: 30 });
  });

  it("averages two colors", () => {
    const result = mixColors([
      { r: 255, g: 0, b: 0 },
      { r: 0, g: 0, b: 255 },
    ]);
    expect(result).toEqual({ r: 128, g: 0, b: 128 });
  });

  it("averages three colors", () => {
    const result = mixColors([
      { r: 255, g: 0, b: 0 },
      { r: 0, g: 255, b: 0 },
      { r: 0, g: 0, b: 255 },
    ]);
    expect(result).toEqual({ r: 85, g: 85, b: 85 });
  });

  it("clamps values to 255", () => {
    const result = mixColors([
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 255, b: 255 },
    ]);
    expect(result).toEqual({ r: 255, g: 255, b: 255 });
  });
});

describe("recognizeColor", () => {
  it("recognizes exact preset colors", () => {
    expect(recognizeColor({ r: 255, g: 0, b: 0 })).toBe("Red");
    expect(recognizeColor({ r: 0, g: 0, b: 255 })).toBe("Blue");
    expect(recognizeColor({ r: 255, g: 255, b: 0 })).toBe("Yellow");
  });

  it("recognizes colors close to a known color", () => {
    // Very close to Red
    expect(recognizeColor({ r: 250, g: 5, b: 5 })).toBe("Red");
  });

  it("returns a name for any RGB value", () => {
    const name = recognizeColor({ r: 123, g: 45, b: 67 });
    expect(typeof name).toBe("string");
    expect(name.length).toBeGreaterThan(0);
  });
});

describe("formatResult", () => {
  it("returns empty formula and name for no selections", () => {
    const result = formatResult([], { r: 0, g: 0, b: 0 });
    expect(result.formula).toBe("");
    expect(result.name).toBe("");
  });

  it("returns the color name for a single selection", () => {
    const result = formatResult(["Red"], { r: 255, g: 0, b: 0 });
    expect(result.formula).toBe("Red");
    expect(result.name).toBe("RED");
  });

  it("returns a formula and recognized name for multiple selections", () => {
    const result = formatResult(
      ["Red", "Blue"],
      { r: 128, g: 0, b: 128 }
    );
    expect(result.formula).toBe("Red + Blue");
    expect(result.name).toBe("PURPLE");
  });

  it("passes through the mixedRgb as color", () => {
    const mixed = { r: 100, g: 200, b: 50 };
    const result = formatResult(["Red"], mixed);
    expect(result.color).toBe(mixed);
  });
});

describe("PRESETS", () => {
  it("has 17 presets", () => {
    expect(PRESETS).toHaveLength(17);
  });

  it("each preset has required fields", () => {
    for (const p of PRESETS) {
      expect(p.name).toBeTruthy();
      expect(p.label).toBeTruthy();
      expect(p.rgb).toHaveProperty("r");
      expect(p.rgb).toHaveProperty("g");
      expect(p.rgb).toHaveProperty("b");
      expect(p.note).toBeTruthy();
    }
  });
});

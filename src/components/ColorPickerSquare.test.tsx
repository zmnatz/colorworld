import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { ColorPickerSquare } from "./ColorPickerSquare";
import type { RGB } from "../utils/colors";

function pointerDown(canvas: HTMLCanvasElement, x: number, y: number) {
  const rect = canvas.getBoundingClientRect();
  fireEvent.pointerDown(canvas, {
    clientX: rect.left + x,
    clientY: rect.top + y,
    pointerId: 1,
    pointerType: "mouse",
  });
}

function pointerMove(canvas: HTMLCanvasElement, x: number, y: number) {
  const rect = canvas.getBoundingClientRect();
  fireEvent.pointerMove(canvas, {
    clientX: rect.left + x,
    clientY: rect.top + y,
    pointerId: 1,
    pointerType: "mouse",
  });
}

function pointerUp(canvas: HTMLCanvasElement) {
  fireEvent.pointerUp(canvas, { pointerId: 1, pointerType: "mouse" });
}

describe("ColorPickerSquare", () => {
  function setup(initialRgb: RGB = { r: 255, g: 0, b: 0 }) {
    const onChange = vi.fn();
    const { container } = render(
      <ColorPickerSquare rgb={initialRgb} onChange={onChange} />
    );
    const canvas = container.querySelector("canvas") as HTMLCanvasElement;

    // jsdom doesn't compute layout — fake offsetWidth/Height so syncSize works
    Object.defineProperty(canvas, "offsetWidth", { value: 400, configurable: true });
    Object.defineProperty(canvas, "offsetHeight", { value: 300, configurable: true });
    Object.defineProperty(canvas, "getBoundingClientRect", {
      value: () => ({ left: 0, top: 0, width: 400, height: 300 }),
      configurable: true,
    });

    // Trigger the layout effect manually via a resize
    fireEvent.load(window);

    return { canvas, onChange };
  }

  it("calls onChange on pointerdown in the picker square", () => {
    const { canvas, onChange } = setup();
    pointerDown(canvas, 100, 100);
    expect(onChange).toHaveBeenCalled();
  });

  it("calls onChange on pointerdown in the hue strip", () => {
    const { canvas, onChange } = setup();
    // Hue strip starts at x = pickerW + HUE_GAP_PX = (400-36-12) + 12 = 364
    pointerDown(canvas, 380, 100);
    expect(onChange).toHaveBeenCalled();
  });

  it("updates continuously while dragging on the picker square", () => {
    const { canvas, onChange } = setup();
    pointerDown(canvas, 100, 100);
    onChange.mockClear();
    pointerMove(canvas, 200, 150);
    pointerMove(canvas, 250, 200);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("updates continuously while dragging on the hue strip", () => {
    const { canvas, onChange } = setup();
    pointerDown(canvas, 380, 50);
    onChange.mockClear();
    pointerMove(canvas, 380, 100);
    pointerMove(canvas, 380, 200);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("stops updating after pointerup", () => {
    const { canvas, onChange } = setup();
    pointerDown(canvas, 100, 100);
    pointerUp(canvas);
    onChange.mockClear();
    pointerMove(canvas, 200, 200);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("preserves hue when saturation is 0", () => {
    // Start with gray (s=0)
    const { canvas, onChange } = setup({ r: 128, g: 128, b: 128 });

    // Click hue strip at y=75 (should set h ≈ 90°, s stays 0)
    pointerDown(canvas, 380, 75);
    expect(onChange).toHaveBeenCalled();

    // Now click the square to increase saturation
    onChange.mockClear();
    pointerDown(canvas, 200, 50);
    expect(onChange).toHaveBeenCalled();
    const afterSquare = onChange.mock.calls.at(-1)![0] as RGB;

    // The hue picked on the strip should be reflected in the final color
    // h ≈ 90°, s ≈ 0.5, v ≈ 0.867 → greenish
    expect(afterSquare.g).toBeGreaterThan(afterSquare.r);
    expect(afterSquare.g).toBeGreaterThan(afterSquare.b);
  });

  it("sets pointer capture on pointerdown and releases on pointerup", () => {
    const { canvas } = setup();
    const setSpy = vi.spyOn(canvas, "setPointerCapture");
    const relSpy = vi.spyOn(canvas, "releasePointerCapture");

    pointerDown(canvas, 100, 100);
    expect(setSpy).toHaveBeenCalledWith(1);

    pointerUp(canvas);
    expect(relSpy).toHaveBeenCalledWith(1);
  });
});

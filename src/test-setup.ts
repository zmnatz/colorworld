import { vi, afterEach } from "vitest";

class ResizeObserverMock {
  callback: ResizeObserverCallback;
  constructor(cb: ResizeObserverCallback) {
    this.callback = cb;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;

HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
  clearRect: vi.fn(),
  createLinearGradient: vi.fn().mockReturnValue({
    addColorStop: vi.fn(),
  }),
  fillRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  stroke: vi.fn(),
}) as unknown as CanvasRenderingContext2D;

HTMLCanvasElement.prototype.toDataURL = vi.fn().mockReturnValue("");

// jsdom doesn't implement pointer capture methods
let capturedPointerId: number | null = null;
HTMLCanvasElement.prototype.setPointerCapture = function (id: number) {
  capturedPointerId = id;
} as unknown as typeof HTMLCanvasElement.prototype.setPointerCapture;
HTMLCanvasElement.prototype.releasePointerCapture = function () {
  capturedPointerId = null;
} as unknown as typeof HTMLCanvasElement.prototype.releasePointerCapture;
HTMLCanvasElement.prototype.hasPointerCapture = function (id: number) {
  return capturedPointerId === id;
} as unknown as typeof HTMLCanvasElement.prototype.hasPointerCapture;

afterEach(() => {
  capturedPointerId = null;
});

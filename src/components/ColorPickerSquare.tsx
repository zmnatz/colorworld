import { useRef, useEffect, useLayoutEffect, useCallback } from "react";
import type { RGB } from "../utils/colors";

function hsvToRgb(h: number, s: number, v: number): RGB {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function rgbToHsv(rgb: RGB): { h: number; s: number; v: number } {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
  }
  return { h, s, v };
}

const HUE_WIDTH_PX = 36;
const HUE_GAP_PX = 12;

interface ColorPickerSquareProps {
  rgb: RGB;
  onChange: (rgb: RGB) => void;
}

export function ColorPickerSquare({ rgb, onChange }: ColorPickerSquareProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hsvRef = useRef(rgbToHsv(rgb));
  const draggingRef = useRef<"picker" | "hue" | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;

    const pickerW = w - HUE_WIDTH_PX - HUE_GAP_PX;
    const hsv = hsvRef.current;

    ctx.clearRect(0, 0, w, h);

    const hueRgb = hsvToRgb(hsv.h, 1, 1);

    const satGrad = ctx.createLinearGradient(0, 0, pickerW, 0);
    satGrad.addColorStop(0, "white");
    satGrad.addColorStop(1, `rgb(${hueRgb.r},${hueRgb.g},${hueRgb.b})`);
    ctx.fillStyle = satGrad;
    ctx.fillRect(0, 0, pickerW, h);

    const valGrad = ctx.createLinearGradient(0, 0, 0, h);
    valGrad.addColorStop(0, "rgba(0,0,0,0)");
    valGrad.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = valGrad;
    ctx.fillRect(0, 0, pickerW, h);

    const hueX = pickerW + HUE_GAP_PX;
    for (let y = 0; y < h; y++) {
      ctx.fillStyle = `hsl(${(y / h) * 360}, 100%, 50%)`;
      ctx.fillRect(hueX, y, HUE_WIDTH_PX, 1);
    }

    const hy = (hsv.h / 360) * h;
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(hueX + HUE_WIDTH_PX / 2, hy, HUE_WIDTH_PX / 2 - 2, 0, Math.PI * 2);
    ctx.stroke();

    const cx = hsv.s * (pickerW - 1);
    const cy = (1 - hsv.v) * (h - 1);
    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, Math.PI * 2);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0,0,0,0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }, []);

  useEffect(() => {
    draw();
  }, [draw, rgb]);

  // Size canvas
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas!.offsetWidth;
      if (w > 0) {
        const h = Math.round(w * 0.75);
        canvas!.style.height = `${h}px`;
        if (canvas!.width !== w || canvas!.height !== h) {
          canvas!.width = w;
          canvas!.height = h;
          draw();
        }
      }
    }

    syncSize();
    const t = setTimeout(syncSize, 50);
    const ro = new ResizeObserver(syncSize);
    ro.observe(canvas);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [draw]);

  // Native pointer event handling — bypasses React synthetic events
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function canvasPos(e: PointerEvent): { x: number; y: number } | null {
      const rect = canvas!.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return null;
      return {
        x: ((e.clientX - rect.left) / rect.width) * canvas!.width,
        y: ((e.clientY - rect.top) / rect.height) * canvas!.height,
      };
    }

    function isHue(x: number): boolean {
      const pickerW = canvas!.width - HUE_WIDTH_PX - HUE_GAP_PX;
      return x > pickerW + HUE_GAP_PX / 2;
    }

    function apply(x: number, y: number) {
      const pickerW = canvas!.width - HUE_WIDTH_PX - HUE_GAP_PX;
      const h = canvas!.height;
      const hsv = { ...hsvRef.current };

      if (isHue(x)) {
        hsv.h = Math.max(0, Math.min(360, (y / h) * 360));
      } else {
        hsv.s = Math.max(0, Math.min(1, x / pickerW));
        hsv.v = Math.max(0, Math.min(1, 1 - y / h));
      }

      hsvRef.current = hsv;
      onChangeRef.current(hsvToRgb(hsv.h, hsv.s, hsv.v));
    }

    function onDown(e: PointerEvent) {
      const pos = canvasPos(e);
      if (!pos) return;
      canvas!.setPointerCapture(e.pointerId);
      draggingRef.current = isHue(pos.x) ? "hue" : "picker";
      apply(pos.x, pos.y);
    }

    function onMove(e: PointerEvent) {
      if (!draggingRef.current) return;
      const pos = canvasPos(e);
      if (!pos) return;
      apply(pos.x, pos.y);
    }

    function onUp(e: PointerEvent) {
      if (canvas!.hasPointerCapture(e.pointerId)) {
        canvas!.releasePointerCapture(e.pointerId);
      }
      draggingRef.current = null;
    }

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div className="picker-container">
      <canvas ref={canvasRef} className="picker-canvas" />
    </div>
  );
}

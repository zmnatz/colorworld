import { useEffect, useRef } from "react";
import type { RGB } from "../utils/colors";
import { rgbString } from "../utils/colors";

interface BlobProps {
  color: RGB;
  pulse: number;
}

export function Blob({ color, pulse }: BlobProps) {
  const blobRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const pulseRef = useRef(0);
  const startRef = useRef(performance.now());

  useEffect(() => {
    pulseRef.current = pulse;
  }, [pulse]);

  useEffect(() => {
    const blob = blobRef.current;
    const glow = glowRef.current;
    if (!blob) return;

    function wobble(t: number) {
      if (!blob) return;
      const elapsed = (t - startRef.current) / 1000;
      const r = color.r / 255;
      const g = color.g / 255;
      const b = color.b / 255;

      const a = 42 + 16 * Math.sin(elapsed * (0.7 + r * 0.5)) + 8 * Math.sin(elapsed * (1.3 + g * 0.4));
      const c = 58 + 14 * Math.cos(elapsed * (0.9 + b * 0.6)) + 10 * Math.cos(elapsed * (1.1 + r * 0.3));
      const e = 46 + 12 * Math.sin(elapsed * (0.8 + g * 0.7)) + 9 * Math.sin(elapsed * (1.4 + b * 0.5));
      const f = 52 + 15 * Math.cos(elapsed * (0.6 + r * 0.4)) + 7 * Math.cos(elapsed * (1.2 + g * 0.6));

      const br = `${a}% ${c}% ${100 - a}% ${100 - c}% / ${e}% ${f}% ${100 - e}% ${100 - f}%`;
      blob.style.borderRadius = br;
      if (glow) glow.style.borderRadius = br;

      rafRef.current = requestAnimationFrame(wobble);
    }

    rafRef.current = requestAnimationFrame(wobble);
    return () => cancelAnimationFrame(rafRef.current);
  }, [color]);

  const colorStr = rgbString(color);

  return (
    <div className="blob-container">
      <div
        ref={blobRef}
        className={`blob ${pulse > 0 ? "blob--pulse" : ""}`}
        style={{ backgroundColor: colorStr }}
      />
      {pulse > 0 && (
        <div
          key={pulse}
          ref={glowRef}
          className="blob-glow"
          style={{ backgroundColor: colorStr }}
        />
      )}
    </div>
  );
}

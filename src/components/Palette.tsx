import type { RGB, ColorPreset } from "../utils/colors";
import { rgbString, recognizeColor } from "../utils/colors";

interface PaletteProps {
  presets: ColorPreset[];
  customColors: RGB[];
  selected: Set<string>;
  selectedCustom: Set<number>;
  onToggle: (preset: ColorPreset) => void;
  onCustomToggle: (index: number) => void;
  onCustomOpen: () => void;
}

export function Palette({
  presets,
  customColors,
  selected,
  selectedCustom,
  onToggle,
  onCustomToggle,
  onCustomOpen,
}: PaletteProps) {
  return (
    <div className="palette">
      <div className="palette-grid">
        {presets.map((p) => {
          const isSelected = selected.has(p.name);
          return (
            <button
              key={p.name}
              className={`color-btn ${isSelected ? "color-btn--selected" : ""}`}
              onClick={() => onToggle(p)}
              aria-pressed={isSelected}
              aria-label={`${p.name} - ${isSelected ? "selected" : "tap to add"}`}
            >
              <span
                className="color-swatch"
                style={{ backgroundColor: rgbString(p.rgb) }}
              />
              <span className="color-label">{p.label}</span>
            </button>
          );
        })}
        {customColors.map((c, i) => {
          const isSelected = selectedCustom.has(i);
          const name = recognizeColor(c).toUpperCase();
          return (
            <button
              key={`custom-${i}`}
              className={`color-btn ${isSelected ? "color-btn--selected" : ""}`}
              onClick={() => onCustomToggle(i)}
              aria-pressed={isSelected}
              aria-label={`${name} - ${isSelected ? "selected" : "tap to add"}`}
            >
              <span
                className="color-swatch"
                style={{ backgroundColor: rgbString(c) }}
              />
              <span className="color-label">{name}</span>
            </button>
          );
        })}
        <button
          className="color-btn color-btn--custom"
          onClick={onCustomOpen}
          aria-label="Open custom color picker"
        >
          <span className="color-swatch color-swatch--custom">+</span>
          <span className="color-label">CUSTOM</span>
        </button>
      </div>
    </div>
  );
}

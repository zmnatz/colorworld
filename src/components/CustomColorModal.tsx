import { useState } from "react";
import type { RGB } from "../utils/colors";
import { rgbString } from "../utils/colors";
import { ColorPickerSquare } from "./ColorPickerSquare";

interface CustomColorModalProps {
  customColors: RGB[];
  onAdd: (rgb: RGB) => void;
  onRemove: (index: number) => void;
  onClose: () => void;
}

export function CustomColorModal({
  customColors,
  onAdd,
  onRemove,
  onClose,
}: CustomColorModalProps) {
  const [rgb, setRgb] = useState<RGB>({ r: 128, g: 128, b: 128 });

  function handleAdd() {
    onAdd(rgb);
  }

  return (
    <div className="modal-overlay" role="dialog" aria-label="Custom color picker">
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">CUSTOM COLORS</span>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {customColors.length > 0 && (
          <div className="modal-section">
            <span className="modal-section-title">YOUR COLORS</span>
            <div className="custom-color-grid">
              {customColors.map((c, i) => (
                <div key={i} className="custom-color-item">
                  <div
                    className="custom-color-swatch"
                    style={{ backgroundColor: rgbString(c) }}
                  />
                  <button
                    className="custom-color-remove"
                    onClick={() => onRemove(i)}
                    aria-label={`Remove custom color ${i + 1}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="modal-section modal-section--picker">
          <span className="modal-section-title">MIX A NEW COLOR</span>
          <ColorPickerSquare rgb={rgb} onChange={setRgb} />
          <div
            className="custom-preview"
            style={{ backgroundColor: rgbString(rgb) }}
          />
          <button className="custom-add-btn" onClick={handleAdd}>
            ADD TO PALETTE
          </button>
        </div>
      </div>
    </div>
  );
}

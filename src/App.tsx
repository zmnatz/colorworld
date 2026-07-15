import { useState, useCallback } from "react";
import { Blob } from "./components/Blob";
import { Palette } from "./components/Palette";
import { CustomColorModal } from "./components/CustomColorModal";
import { ColorFormula } from "./components/ColorFormula";
import {
  PRESETS,
  mixColors,
  formatResult,
  recognizeColor,
  type RGB,
  type ColorPreset,
} from "./utils/colors";
import { playAdd, playRemove } from "./utils/sound";
import "./App.css";

function App() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [customColors, setCustomColors] = useState<RGB[]>([]);
  const [selectedCustomIndices, setSelectedCustomIndices] = useState<Set<number>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  const selectedPresets = PRESETS.filter((p) => selected.has(p.name));
  const activeCustomColors = customColors.filter((_, i) => selectedCustomIndices.has(i));
  const allColors: RGB[] = [
    ...selectedPresets.map((p) => p.rgb),
    ...activeCustomColors,
  ];
  const selectedNames = [
    ...selectedPresets.map((p) => p.name),
    ...activeCustomColors.map((c) => recognizeColor(c)),
  ];

  const mixed = mixColors(allColors);
  const result = formatResult(selectedNames, mixed);

  function pulseIfAdded(prevSize: number, nextSize: number) {
    if (nextSize > prevSize) {
      setPulseKey((k) => k + 1);
    }
  }

  const handleToggle = useCallback(
    (preset: ColorPreset) => {
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(preset.name)) {
          next.delete(preset.name);
          playRemove(preset.note);
        } else {
          next.add(preset.name);
          playAdd(preset.note);
        }
        pulseIfAdded(prev.size, next.size);
        return next;
      });
    },
    [],
  );

  const handleCustomToggle = useCallback((index: number) => {
    setSelectedCustomIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
        playRemove("C5");
      } else {
        next.add(index);
        playAdd("C5");
      }
      pulseIfAdded(prev.size, next.size);
      return next;
    });
  }, []);

  const handleCustomAdd = useCallback((rgb: RGB) => {
    setCustomColors((prev) => {
      const next = [...prev, rgb];
      setSelectedCustomIndices((sel) => {
        const nextSel = new Set(sel);
        nextSel.add(next.length - 1);
        return nextSel;
      });
      playAdd("C5");
      return next;
    });
    setPulseKey((k) => k + 1);
  }, []);

  const handleCustomRemove = useCallback(
    (index: number) => {
      setCustomColors((prev) => prev.filter((_, i) => i !== index));
      setSelectedCustomIndices((prev) => {
        const next = new Set<number>();
        for (const i of prev) {
          if (i < index) next.add(i);
          else if (i > index) next.add(i - 1);
        }
        return next;
      });
      playRemove("C5");
      setPulseKey((k) => k + 1);
    },
    [],
  );

  return (
    <div className="app">
      <div className="display-area">
        <Blob color={mixed} pulse={pulseKey} />
        <ColorFormula formula={result.formula} name={result.name} />
      </div>

      <div className="palette-area">
        <Palette
          presets={PRESETS}
          customColors={customColors}
          selected={selected}
          selectedCustom={selectedCustomIndices}
          onToggle={handleToggle}
          onCustomToggle={handleCustomToggle}
          onCustomOpen={() => setShowModal(true)}
        />
      </div>

      {showModal && (
        <CustomColorModal
          customColors={customColors}
          onAdd={handleCustomAdd}
          onRemove={handleCustomRemove}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default App;

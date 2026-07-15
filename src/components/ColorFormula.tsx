interface ColorFormulaProps {
  formula: string;
  name: string;
}

export function ColorFormula({ formula, name }: ColorFormulaProps) {
  if (!formula && !name) {
    return (
      <div className="color-formula color-formula--empty">
        <span className="formula-text">Tap a color to start mixing!</span>
      </div>
    );
  }

  return (
    <div className="color-formula">
      {formula && <span className="formula-text">{formula}</span>}
      {name && <span className="formula-name">{name}</span>}
    </div>
  );
}

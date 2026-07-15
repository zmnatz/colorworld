export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface ColorPreset {
  name: string;
  label: string;
  rgb: RGB;
  note: string;
}

export const PRESETS: ColorPreset[] = [
  { name: "Red", label: "RED", rgb: { r: 255, g: 0, b: 0 }, note: "C4" },
  { name: "Orange", label: "ORANGE", rgb: { r: 255, g: 128, b: 0 }, note: "D4" },
  { name: "Yellow", label: "YELLOW", rgb: { r: 255, g: 255, b: 0 }, note: "E4" },
  { name: "Green", label: "GREEN", rgb: { r: 0, g: 255, b: 0 }, note: "G4" },
  { name: "Cyan", label: "CYAN", rgb: { r: 0, g: 255, b: 255 }, note: "A4" },
  { name: "Blue", label: "BLUE", rgb: { r: 0, g: 0, b: 255 }, note: "B4" },
  { name: "Purple", label: "PURPLE", rgb: { r: 128, g: 0, b: 255 }, note: "C5" },
  { name: "Pink", label: "PINK", rgb: { r: 255, g: 0, b: 255 }, note: "D5" },
  { name: "White", label: "WHITE", rgb: { r: 255, g: 255, b: 255 }, note: "E5" },
];

export const EMPTY_COLOR: RGB = { r: 30, g: 30, b: 40 };

const COLOR_NAMES: [string, RGB][] = [
  ["Black", { r: 0, g: 0, b: 0 }],
  ["Onyx", { r: 53, g: 56, b: 57 }],
  ["Charcoal", { r: 54, g: 69, b: 108 }],
  ["Gunmetal", { r: 44, g: 52, b: 58 }],
  ["Dark Gray", { r: 64, g: 64, b: 64 }],
  ["Gray", { r: 128, g: 128, b: 128 }],
  ["Silver", { r: 192, g: 192, b: 192 }],
  ["Light Gray", { r: 211, g: 211, b: 211 }],
  ["White Smoke", { r: 245, g: 245, b: 245 }],
  ["White", { r: 255, g: 255, b: 255 }],
  ["Snow", { r: 255, g: 250, b: 250 }],
  ["Ivory", { r: 255, g: 255, b: 240 }],
  ["Cream", { r: 255, g: 253, b: 208 }],
  ["Linen", { r: 250, g: 240, b: 230 }],
  ["Beige", { r: 245, g: 245, b: 220 }],
  ["Champagne", { r: 247, g: 231, b: 206 }],
  ["Wheat", { r: 245, g: 222, b: 179 }],
  ["Tan", { r: 210, g: 180, b: 140 }],
  ["Khaki", { r: 195, g: 177, b: 225 }],
  ["Sand", { r: 194, g: 178, b: 128 }],
  ["Peach", { r: 255, g: 218, b: 185 }],
  ["Apricot", { r: 251, g: 206, b: 177 }],
  ["Coral", { r: 255, g: 127, b: 80 }],
  ["Salmon", { r: 250, g: 128, b: 114 }],
  ["Tomato", { r: 255, g: 99, b: 71 }],
  ["Vermilion", { r: 227, g: 66, b: 52 }],
  ["Red", { r: 255, g: 0, b: 0 }],
  ["Scarlet", { r: 255, g: 36, b: 0 }],
  ["Crimson", { r: 220, g: 20, b: 60 }],
  ["Ruby", { r: 155, g: 17, b: 30 }],
  ["Maroon", { r: 128, g: 0, b: 0 }],
  ["Burgundy", { r: 128, g: 0, b: 32 }],
  ["Wine", { r: 114, g: 47, b: 55 }],
  ["Rose", { r: 255, g: 0, b: 127 }],
  ["Blush", { r: 222, g: 93, b: 131 }],
  ["Flamingo", { r: 252, g: 142, b: 172 }],
  ["Pink", { r: 255, g: 192, b: 203 }],
  ["Hot Pink", { r: 255, g: 105, b: 180 }],
  ["Magenta", { r: 255, g: 0, b: 255 }],
  ["Fuchsia", { r: 255, g: 0, b: 255 }],
  ["Orchid", { r: 218, g: 112, b: 214 }],
  ["Mauve", { r: 224, g: 176, b: 255 }],
  ["Lavender", { r: 230, g: 230, b: 250 }],
  ["Lilac", { r: 200, g: 162, b: 200 }],
  ["Periwinkle", { r: 204, g: 204, b: 255 }],
  ["Violet", { r: 127, g: 0, b: 255 }],
  ["Purple", { r: 128, g: 0, b: 128 }],
  ["Plum", { r: 142, g: 69, b: 133 }],
  ["Eggplant", { r: 97, g: 64, b: 81 }],
  ["Indigo", { r: 75, g: 0, b: 130 }],
  ["Navy", { r: 0, g: 0, b: 128 }],
  ["Midnight Blue", { r: 25, g: 25, b: 112 }],
  ["Cobalt", { r: 0, g: 71, b: 171 }],
  ["Royal Blue", { r: 65, g: 105, b: 225 }],
  ["Blue", { r: 0, g: 0, b: 255 }],
  ["Dodger Blue", { r: 30, g: 144, b: 255 }],
  ["Sky Blue", { r: 135, g: 206, b: 235 }],
  ["Powder Blue", { r: 176, g: 224, b: 230 }],
  ["Baby Blue", { r: 137, g: 207, b: 240 }],
  ["Steel Blue", { r: 70, g: 130, b: 180 }],
  ["Slate Blue", { r: 106, g: 90, b: 205 }],
  ["Cornflower", { r: 100, g: 149, b: 237 }],
  ["Ice Blue", { r: 153, g: 255, b: 255 }],
  ["Turquoise", { r: 64, g: 224, b: 208 }],
  ["Teal", { r: 0, g: 128, b: 128 }],
  ["Cyan", { r: 0, g: 255, b: 255 }],
  ["Aqua", { r: 0, g: 255, b: 255 }],
  ["Aquamarine", { r: 127, g: 255, b: 212 }],
  ["Seafoam", { r: 120, g: 230, b: 200 }],
  ["Mint", { r: 152, g: 255, b: 152 }],
  ["Emerald", { r: 80, g: 200, b: 120 }],
  ["Jade", { r: 0, g: 168, b: 107 }],
  ["Green", { r: 0, g: 128, b: 0 }],
  ["Lime", { r: 0, g: 255, b: 0 }],
  ["Chartreuse", { r: 127, g: 255, b: 0 }],
  ["Pistachio", { r: 147, g: 197, b: 53 }],
  ["Olive", { r: 128, g: 128, b: 0 }],
  ["Moss Green", { r: 138, g: 154, b: 91 }],
  ["Forest", { r: 34, g: 139, b: 34 }],
  ["Pine", { r: 1, g: 121, b: 111 }],
  ["Sage", { r: 188, g: 184, b: 138 }],
  ["Celery", { r: 178, g: 200, b: 130 }],
  ["Lemon", { r: 255, g: 247, b: 0 }],
  ["Canary", { r: 255, g: 239, b: 0 }],
  ["Gold", { r: 255, g: 215, b: 0 }],
  ["Amber", { r: 255, g: 191, b: 0 }],
  ["Honey", { r: 236, g: 184, b: 64 }],
  ["Mustard", { r: 255, g: 219, b: 88 }],
  ["Yellow", { r: 255, g: 255, b: 0 }],
  ["Butter", { r: 255, g: 255, b: 130 }],
  ["Banana", { r: 255, g: 234, b: 0 }],
  ["Dandelion", { r: 255, g: 222, b: 49 }],
  ["Saffron", { r: 244, g: 196, b: 48 }],
  ["Marigold", { r: 234, g: 167, b: 42 }],
  ["Tangerine", { r: 255, g: 159, b: 0 }],
  ["Orange", { r: 255, g: 165, b: 0 }],
  ["Peach Orange", { r: 255, g: 203, b: 164 }],
  ["Apricot Orange", { r: 255, g: 195, b: 136 }],
  ["Mango", { r: 255, g: 169, b: 77 }],
  ["Butterscotch", { r: 224, g: 162, b: 72 }],
  ["Caramel", { r: 255, g: 213, b: 128 }],
  ["Bronze", { r: 205, g: 127, b: 50 }],
  ["Copper", { r: 184, g: 115, b: 51 }],
  ["Rust", { r: 183, g: 65, b: 14 }],
  ["Sienna", { r: 160, g: 82, b: 45 }],
  ["Brown", { r: 150, g: 75, b: 0 }],
  ["Chocolate", { r: 123, g: 63, b: 0 }],
  ["Coffee", { r: 111, g: 78, b: 55 }],
  ["Mahogany", { r: 192, g: 64, b: 0 }],
  ["Chestnut", { r: 149, g: 69, b: 53 }],
  ["Cinnamon", { r: 210, g: 105, b: 30 }],
  ["Copper Red", { r: 203, g: 109, b: 81 }],
  ["Terracotta", { r: 204, g: 78, b: 92 }],
];

export function recognizeColor(rgb: RGB): string {
  let bestName = "Mix";
  let bestDist = Infinity;

  for (const [name, c] of COLOR_NAMES) {
    const dr = rgb.r - c.r;
    const dg = rgb.g - c.g;
    const db = rgb.b - c.b;
    const d = dr * dr + dg * dg + db * db;
    if (d < bestDist) {
      bestDist = d;
      bestName = name;
    }
  }

  return bestName;
}

export function mixColors(colors: RGB[]): RGB {
  if (colors.length === 0) return EMPTY_COLOR;
  if (colors.length === 1) return colors[0];

  const sum = colors.reduce(
    (acc, c) => ({ r: acc.r + c.r, g: acc.g + c.g, b: acc.b + c.b }),
    { r: 0, g: 0, b: 0 },
  );
  const n = colors.length;
  return {
    r: Math.min(255, Math.round(sum.r / n)),
    g: Math.min(255, Math.round(sum.g / n)),
    b: Math.min(255, Math.round(sum.b / n)),
  };
}

export function rgbString(c: RGB): string {
  return `rgb(${c.r}, ${c.g}, ${c.b})`;
}

export function buildFormula(selectedNames: string[]): string {
  if (selectedNames.length === 0) return "";
  return selectedNames.join(" + ");
}

export function formatResult(
  selectedNames: string[],
  mixedRgb: RGB,
): { formula: string; name: string; color: RGB } {
  const recognized = recognizeColor(mixedRgb);
  const formula = buildFormula(selectedNames);
  let name: string;

  if (selectedNames.length === 0) {
    name = "";
  } else if (selectedNames.length === 1) {
    name = selectedNames[0].toUpperCase();
  } else {
    name = recognized.toUpperCase();
  }

  return { formula, name, color: mixedRgb };
}

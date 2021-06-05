export const COLORS = [
  "#F2CB6C",
  "#F27B6C",
  "#6CD5F2",
  "#4A90E2",
  "#f26ca1",
  "#383971",
  "#6f9cab",
  "#3a0d2f",
  "#b2cc7e",
];

// Not currently used.
export const getColor = (input: string, values: typeof COLORS) => {
  const alpha = "abcdefghijklmnopqrstuvwxyz".split("");
  let stripped = input
    .replace(/[^\w\s]/gi, "")
    .toLowerCase()
    .trim();

  return values[alpha.indexOf(stripped.charAt(0)) % values.length];
};

export const randomValue = (values: typeof COLORS) => {
  return values[Math.floor(Math.random() * values.length)];
};

export const randomColor = () => {
  return randomValue(COLORS);
};

// Return an RGBA or RGB color from a hex value.
export const hexToRGBA = (hex: string, alpha: number | string) => {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    // Get rid of the #.
    let color = hex.substring(1).split("");
    // Deal with short-hand colors.
    if (color.length === 3) {
      color = [color[0], color[0], color[1], color[1], color[2], color[2]];
    }
    const newColor = color.join("");
    const r = parseInt(newColor.slice(0, 2), 16);
    const g = parseInt(newColor.slice(2, 4), 16);
    const b = parseInt(newColor.slice(4, 6), 16);

    if (alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else {
      return `rgb(${r}, ${g}, ${b})`;
    }
  }
  throw new Error("Not a valid hex color");
};

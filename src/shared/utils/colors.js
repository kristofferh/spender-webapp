// Return an RGBA or RGB color from a hex value.
export const hexToRGBA = (hex, alpha) => {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    // Get rid of the #.
    let color = hex.substring(1).split("");
    // Deal with short-hand colors.
    if (color.length === 3) {
      color = [color[0], color[0], color[1], color[1], color[2], color[2]];
    }
    color = color.join("");
    const r = parseInt(color.slice(0, 2), 16);
    const g = parseInt(color.slice(2, 4), 16);
    const b = parseInt(color.slice(4, 6), 16);

    if (alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else {
      return `rgb(${r}, ${g}, ${b})`;
    }
  }
  throw new Error("Not a valid hex color");
};

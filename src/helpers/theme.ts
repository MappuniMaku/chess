export const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result === null) {
    throw new Error('Invalid hex color');
  }
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
};

export const rgba = (hex: string, alpha: number): string => `rgba(${hexToRgb(hex)}, ${alpha})`;

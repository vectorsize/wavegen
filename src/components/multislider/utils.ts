export const clamp = (val: number, min: number, max: number): number =>
  Math.min(Math.max(min, val), max)

export const checkInside = (
  position: { x: number; y: number },
  dimensions: { top: number; left: number; width: number; height: number }
) =>
  position.x >= dimensions.left &&
  position.x <= dimensions.left + dimensions.width &&
  position.y >= dimensions.top &&
  position.y <= dimensions.top + dimensions.height

export const shimEvent = (event: any) => {
  let eventDoc, doc, body
  // If pageX/Y aren't available and clientX/Y are,
  // calculate pageX/Y - logic taken from jQuery.
  // (This is to support old IE)
  if (event.pageX == null && event.clientX != null) {
    eventDoc = (event.target && event.target.ownerDocument) || document
    doc = eventDoc.documentElement
    body = eventDoc.body

    event.pageX =
      event.clientX +
      ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
      ((doc && doc.clientLeft) || (body && body.clientLeft) || 0)
    event.pageY =
      event.clientY +
      ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
      ((doc && doc.clientTop) || (body && body.clientTop) || 0)
  }
  return event
}

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

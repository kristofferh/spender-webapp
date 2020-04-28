export type OverlayPosition = "top" | "right" | "bottom" | "left";

interface FindOverlayPositionArgs {
  anchor: HTMLElement;
  overlay: HTMLElement;
  position: OverlayPosition;
}

export function findOverlayPosition({
  anchor,
  overlay,
  position
}: FindOverlayPositionArgs) {
  const anchorBoundingBox = anchor.getBoundingClientRect();
  const overlayBoundingBox = overlay.getBoundingClientRect();

  console.log(anchorBoundingBox, overlayBoundingBox);
  // calculate the window's bounds
  // window.(innerWidth|innerHeight) do not account for scrollbars
  // so prefer the clientWidth/clientHeight of the DOM if available
  const documentWidth =
    document.documentElement.clientWidth || window.innerWidth;
  const documentHeight =
    document.documentElement.clientHeight || window.innerHeight;
  const windowBoundingBox = {
    top: 0,
    right: documentWidth,
    bottom: documentHeight,
    left: 0,
    height: documentHeight,
    width: documentWidth
  };
}

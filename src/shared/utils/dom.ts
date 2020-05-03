export type OverlayPlacement = "top" | "right" | "bottom" | "left";

interface FindOverlayPositionArgs {
  anchor: HTMLElement;
  overlay: HTMLElement;
  position: OverlayPlacement;
  forcePosition?: boolean;
  align?: OverlayPlacement;
  container?: HTMLElement;
  buffer?: number;
  offset?: number;
}

interface FindOverlayPositionResult {
  top: number;
  left: number;
  position: OverlayPlacement;
  fit: number;
  anchorBoundingBox?: DOMRect;
}

const placementComplements: {
  [placement in OverlayPlacement]: OverlayPlacement;
} = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};

const placementSubstitutes: {
  [placement in OverlayPlacement]: "top" | "left";
} = {
  top: "left",
  right: "top",
  bottom: "left",
  left: "top"
};

/**
 * Calculates the absolute positioning (relative to document.body) to place a popover element
 */
export function findOverlayPosition({
  anchor,
  overlay,
  position,
  align,
  container,
  buffer = 16,
  offset = 0
}: FindOverlayPositionArgs): FindOverlayPositionResult {
  const anchorBoundingBox = anchor.getBoundingClientRect();
  const overlayBoundingBox = overlay.getBoundingClientRect();

  console.log(anchorBoundingBox, overlayBoundingBox, position);
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

  // if no container element is given fall back to using the window viewport
  const containerBoundingBox = container
    ? container.getBoundingClientRect()
    : windowBoundingBox;

  const iterationPositions = [position];
  // keep user-defined alignment in the original positions.
  const iterationAlignments: Array<undefined | OverlayPlacement> = [align];

  console.log(iterationPositions, iterationAlignments);

  let bestFit: number | undefined = undefined;
  let bestPosition: FindOverlayPositionResult | null = null;

  for (let idx = 0; idx < iterationPositions.length; idx++) {
    const iterationPosition = iterationPositions[idx];

    console.log(iterationPosition);
    // See if we can find a position with a better fit than we've found so far.
    // const screenCoordinates = getPopoverScreenCoordinates({
    //   position: iterationPosition,
    //   align: iterationAlignments[idx],
    //   anchorBoundingBox,
    //   overlayBoundingBox,
    //   windowBoundingBox,
    //   containerBoundingBox,
    //   offset,
    //   buffer
    // });

    // if (bestFit === undefined || screenCoordinates.fit > bestFit) {
    //   bestFit = screenCoordinates.fit;
    //   bestPosition = {
    //     fit: screenCoordinates.fit,
    //     position: iterationPosition,
    //     top: screenCoordinates.top + window.pageYOffset,
    //     left: screenCoordinates.left + window.pageXOffset,
    //   };

    //   // If we've already found the ideal fit, use that position.
    //   if (bestFit === 1) {
    //     break;
    //   }
    // }

    // If we haven't improved the fit, then continue on and try a new position.
  }
}

/**
 * Calculates the intersection space between two bounding boxes
 */
export function intersectBoundingBoxes(
  firstBox: DOMRect | ClientRect,
  secondBox: DOMRect | ClientRect
) {
  const top = Math.max(firstBox.top, secondBox.top);
  const right = Math.min(firstBox.right, secondBox.right);
  const bottom = Math.min(firstBox.bottom, secondBox.bottom);
  const left = Math.max(firstBox.left, secondBox.left);
  const height = Math.max(bottom - top, 0);
  const width = Math.max(right - left, 0);

  return {
    top,
    right,
    bottom,
    left,
    height,
    width
  };
}

/**
 * Computes the fit (overlap) of the content within the container, fit is in range 0.0 => 1.0
 */
export function getVisibleFit(
  contentBoundingBox: DOMRect | ClientRect,
  containerBoundingBox: DOMRect | ClientRect
): number {
  const intersection = intersectBoundingBoxes(
    contentBoundingBox,
    containerBoundingBox
  );

  if (
    intersection.left > intersection.right ||
    intersection.top > intersection.top
  ) {
    // there is no intersection, the boxes are completely separated on at least one axis
    return 0;
  }

  const intersectionArea =
    (intersection.right - intersection.left) *
    (intersection.bottom - intersection.top);
  const contentArea =
    (contentBoundingBox.right - contentBoundingBox.left) *
    (contentBoundingBox.bottom - contentBoundingBox.top);

  return intersectionArea / contentArea;
}

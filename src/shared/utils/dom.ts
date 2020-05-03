export type OverlayPlacement = "top" | "right" | "bottom" | "left";

type Dimension = "height" | "width";

export const POSITIONS: OverlayPlacement[] = ["top", "right", "bottom", "left"];

interface BoundingBox {
  [position: string]: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface BoundingClientRect extends BoundingBox {
  height: number;
  width: number;
}

const relatedDimension: { [position in OverlayPlacement]: Dimension } = {
  top: "height",
  right: "width",
  bottom: "height",
  left: "width"
};

const dimensionPositionAttribute: {
  [dimension in Dimension]: "top" | "left";
} = {
  height: "top",
  width: "left"
};

const positionComplements: {
  [position in OverlayPlacement]: OverlayPlacement;
} = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};

// always resolving to top/left is taken advantage of by knowing they are the
// minimum edges of the bounding box
const positionSubstitutes: {
  [position in OverlayPlacement]: "left" | "top";
} = {
  top: "left",
  right: "top",
  bottom: "left",
  left: "top"
};

interface FindOverlayPositionArgs {
  anchor: HTMLElement;
  overlay: HTMLElement;
  align?: OverlayPlacement;
  position: OverlayPlacement;
  forcePosition?: boolean;
  buffer?: number;
  offset?: number;
  allowCrossAxis?: boolean;
  container?: HTMLElement;
  returnBoundingBox?: boolean;
}

interface FindOverlayPositionResult {
  top: number;
  left: number;
  position: "top" | "right" | "bottom" | "left";
  fit: number;
  anchorBoundingBox?: BoundingClientRect;
}

/**
 * Calculates the absolute positioning (relative to document.body) to place a overlay element
 *
 * @param anchor {HTMLElement} Element to anchor the overlay to
 * @param overlay {HTMLElement} Element containing the overlay content
 * @param position {string} Position the user wants. One of ["top", "right", "bottom", "left"]
 * @param [forcePosition] {boolean} If true, use only the provided `position` value and don't try any other position
 * @param [align] {string} Cross-axis alignment. One of ["top", "right", "bottom", "left"]
 * @param [buffer=16] {number} Minimum distance between the overlay and the bounding container
 * @param [offset=0] {number} Distance between the overlay and the anchor
 * @param [allowCrossAxis=true] {boolean} Whether to allow the overlay to be positioned on the cross-axis
 * @param [container] {HTMLElement} Element the overlay must be constrained to fit within
 *
 * @returns {FindOverlayPositionResult} absolute page coordinates for the
 * overlay, and the placement's relation to the anchor or undefined
 * there's no room.
 */
export function findOverlayPosition({
  anchor,
  overlay,
  align,
  position,
  forcePosition,
  buffer = 16,
  offset = 0,
  allowCrossAxis = true,
  container,
  returnBoundingBox
}: FindOverlayPositionArgs): FindOverlayPositionResult {
  // find the screen-relative bounding boxes of the anchor, overlay, and container
  const anchorBoundingBox = getElementBoundingBox(anchor);
  const overlayBoundingBox = getElementBoundingBox(overlay);

  // calculate the window's bounds
  // window.(innerWidth|innerHeight) do not account for scrollbars
  // so prefer the clientWidth/clientHeight of the DOM if available
  const documentWidth =
    document.documentElement.clientWidth || window.innerWidth;
  const documentHeight =
    document.documentElement.clientHeight || window.innerHeight;
  const windowBoundingBox: BoundingClientRect = {
    top: 0,
    right: documentWidth,
    bottom: documentHeight,
    left: 0,
    height: documentHeight,
    width: documentWidth
  };

  // if no container element is given fall back to using the window viewport
  const containerBoundingBox = container
    ? getElementBoundingBox(container)
    : windowBoundingBox;

  /**
   * `position` was specified by the function caller and is a strong hint
   * as to the preferred location of the overlay relative to the anchor.
   * However, we strongly prefer showing all of the overlay content within
   * the window+container boundary and will iterate over the four
   * possible sides until a perfect fit is located. If none of the locations
   * fully contain overlay, the location with the best fit is selected.
   *
   * This approach first checks the preferred `position`, then its opposite
   * along the same axis, next a location on the cross-axis, and finally it
   * tests the remaining position.
   *
   * e.g.
   * if position = "top" the order is top, bottom, left right
   * if position = "right" the order is right, left, top, bottom
   */

  // Try the user-desired position first.
  const iterationPositions = [position];
  // keep user-defined alignment in the original positions.
  const iterationAlignments: Array<undefined | OverlayPlacement> = [align];

  if (forcePosition !== true) {
    iterationPositions.push(positionComplements[position]); // Try the complementary position.
    iterationAlignments.push(align); // keep user-defined alignment in the complementary position.

    if (allowCrossAxis) {
      iterationPositions.push(
        positionSubstitutes[position], // Switch to the cross axis.
        positionComplements[positionSubstitutes[position]] // Try the complementary position on the cross axis.
      );
      iterationAlignments.push(undefined, undefined); // discard desired alignment on cross-axis
    }
  } else {
    // position is forced, if it conflicts with the alignment then reset align to `null`
    // e.g. original placement request for `downLeft` is moved to the `left` side, future calls
    // will position and align `left`, and `leftLeft` is not a valid placement
    if (
      position === align ||
      (align !== undefined && position === positionComplements[align])
    ) {
      iterationAlignments[0] = undefined;
    }
  }

  let bestFit: number | undefined = undefined;
  let bestPosition: FindOverlayPositionResult | null = null;

  for (let idx = 0; idx < iterationPositions.length; idx++) {
    const iterationPosition = iterationPositions[idx];

    // See if we can find a position with a better fit than we've found so far.
    const screenCoordinates = getOverlayScreenCoordinates({
      position: iterationPosition,
      align: iterationAlignments[idx],
      anchorBoundingBox,
      overlayBoundingBox,
      windowBoundingBox,
      containerBoundingBox,
      offset,
      buffer
    });

    if (bestFit === undefined || screenCoordinates.fit > bestFit) {
      bestFit = screenCoordinates.fit;
      bestPosition = {
        fit: screenCoordinates.fit,
        position: iterationPosition,
        top: screenCoordinates.top + window.pageYOffset,
        left: screenCoordinates.left + window.pageXOffset
      };

      // If we've already found the ideal fit, use that position.
      if (bestFit === 1) {
        break;
      }
    }

    // If we haven't improved the fit, then continue on and try a new position.
  }

  if (bestPosition == null) {
    throw new Error("Failed to calculate bestPosition");
  }

  if (returnBoundingBox) {
    bestPosition.anchorBoundingBox = anchorBoundingBox;
  }

  return bestPosition;
}

interface GetOverlayScreenCoordinatesArgs {
  position: OverlayPlacement;
  align?: OverlayPlacement;
  anchorBoundingBox: BoundingClientRect;
  overlayBoundingBox: BoundingClientRect;
  windowBoundingBox: BoundingClientRect;
  containerBoundingBox: BoundingClientRect;
  offset?: number;
  buffer?: number;
}

interface GetOverlayScreenCoordinatesResult {
  top: number;
  left: number;
  fit: number;
}

/**
 * Given a target position and the overlay's surrounding context, returns either an
 * object with {top, left} screen coordinates or `null` if it's not possible to show
 * content in the target position
 * @param position {string} the target position, one of ["top", "right", "bottom", "left"]
 * @param align {string} target alignment on the cross-axis, one of ["top", "right", "bottom", "left"]
 * @param anchorBoundingBox {Object} bounding box of the anchor element
 * @param overlayBoundingBox {Object} bounding box of the overlay element
 * @param windowBoundingBox {Object} bounding box of the window
 * @param containerBoundingBox {Object} bounding box of the container
 * @param [offset=0] {number} Distance between the overlay and the anchor
 * @param [buffer=0] {number} Minimum distance between the overlay's
 *  placement and the container edge
 *
 * @returns {GetOverlayScreenCoordinatesResult}
 *  object with top/left coordinates, the overlay's relative position to the anchor, and how well the
 *  overlay fits in the location (0.0 -> 1.0) coordinates and the overlay's relative position, if
 *  there is no room in this placement then null
 */
export function getOverlayScreenCoordinates({
  position,
  align,
  anchorBoundingBox,
  overlayBoundingBox,
  windowBoundingBox,
  containerBoundingBox,
  offset = 0,
  buffer = 0
}: GetOverlayScreenCoordinatesArgs): GetOverlayScreenCoordinatesResult {
  /**
   * The goal is to find the best way to align the overlay content
   * on the given side of the anchor element. The overlay prefers
   * centering on the anchor but can shift along the cross-axis as needed.
   *
   * We return the top/left coordinates that best fit the overlay inside
   * the given boundaries, and also return the `fit` value which indicates
   * what percentage of the overlay is within the bounds.
   *
   * e.g. finding a location when position=top
   * the preferred location is directly over the anchor
   *
   *        +----------------------+
   *        |       overlay        |
   *        +----------------------+
   *                   v
   *            +--------------+
   *            |    anchor    |
   *            +--------------+
   *
   * but if anchor doesn't have much (or any) room on its ride side
   * the overlay will shift to the left
   *
   *    +----------------------+
   *    |       overlay        |
   *    +----------------------+
   *                   v
   *            +--------------+
   *            |    anchor    |
   *            +--------------+
   *
   */

  const crossAxisFirstSide = positionSubstitutes[position]; // "top" -> "left"
  const crossAxisSecondSide = positionComplements[crossAxisFirstSide]; // "left" -> "right"
  const crossAxisDimension = relatedDimension[crossAxisFirstSide]; // "left" -> "width"

  const crossAxisPosition = getCrossAxisPosition({
    crossAxisFirstSide,
    crossAxisSecondSide,
    crossAxisDimension,
    position,
    align,
    buffer,
    offset,
    windowBoundingBox,
    containerBoundingBox,
    overlayBoundingBox,
    anchorBoundingBox
  });

  const primaryAxisDimension = relatedDimension[position]; // "top" -> "height"
  const primaryAxisPositionName =
    dimensionPositionAttribute[primaryAxisDimension]; // "height" -> "top"

  const primaryAxisPosition = getPrimaryAxisPosition({
    position,
    offset,
    overlayBoundingBox,
    anchorBoundingBox
  });

  const overlayPlacement = {
    [crossAxisFirstSide]: crossAxisPosition,
    [primaryAxisPositionName]: primaryAxisPosition
  };

  // calculate the fit of the overlay in this location
  // fit is in range 0.0 -> 1.0 and is the percentage of the overlay which is visible in this location
  const combinedBoundingBox = intersectBoundingBoxes(
    windowBoundingBox,
    containerBoundingBox
  );

  // shrink the visible bounding box by `buffer`
  // to compute a fit value
  combinedBoundingBox.top += buffer;
  combinedBoundingBox.right -= buffer;
  combinedBoundingBox.bottom -= buffer;
  combinedBoundingBox.left += buffer;

  const fit = getVisibleFit(
    {
      top: overlayPlacement.top,
      right: overlayPlacement.left + overlayBoundingBox.width,
      bottom: overlayPlacement.top + overlayBoundingBox.height,
      left: overlayPlacement.left,
      width: overlayBoundingBox.width,
      height: overlayBoundingBox.height
    },
    combinedBoundingBox
  );

  return {
    fit,
    top: overlayPlacement.top,
    left: overlayPlacement.left
  };
}

interface GetCrossAxisPositionArgs {
  crossAxisFirstSide: OverlayPlacement;
  crossAxisSecondSide: OverlayPlacement;
  crossAxisDimension: Dimension;
  position: OverlayPlacement;
  align?: OverlayPlacement;
  buffer: number;
  offset: number;
  windowBoundingBox: BoundingClientRect;
  containerBoundingBox: BoundingClientRect;
  overlayBoundingBox: BoundingClientRect;
  anchorBoundingBox: BoundingClientRect;
}

function getCrossAxisPosition({
  crossAxisFirstSide,
  crossAxisSecondSide,
  crossAxisDimension,
  position,
  align,
  buffer,
  offset,
  windowBoundingBox,
  containerBoundingBox,
  overlayBoundingBox,
  anchorBoundingBox
}: GetCrossAxisPositionArgs) {
  // how much of the overlay overflows past either side of the anchor if its centered
  const overlaySizeOnCrossAxis = overlayBoundingBox[crossAxisDimension];
  const anchorSizeOnCrossAxis = anchorBoundingBox[crossAxisDimension];
  const anchorHalfSize = anchorSizeOnCrossAxis / 2;

  // the overlay's original position on the cross-axis is determined by:
  const crossAxisPositionOriginal =
    anchorBoundingBox[crossAxisFirstSide] + // where the anchor is located
    anchorHalfSize - // plus half anchor dimension
    overlaySizeOnCrossAxis / 2; // less half the overlay dimension

  // To fit the content within both the window and container,
  // compute the smaller of the two spaces along each edge
  const combinedBoundingBox = intersectBoundingBoxes(
    windowBoundingBox,
    containerBoundingBox
  );
  const availableSpace = getAvailableSpace(
    anchorBoundingBox,
    combinedBoundingBox,
    buffer,
    offset,
    position
  );

  const contentOverflowSize =
    (overlaySizeOnCrossAxis - anchorSizeOnCrossAxis) / 2;

  let alignAmount = 0;
  let alignDirection = 1;
  let amountOfShiftNeeded = 0;
  let shiftDirection = 1;

  if (align != null) {
    // no alignment, find how much the container boundary requires the content to shift
    alignDirection = align === "top" || align === "left" ? 1 : -1;
    alignAmount = contentOverflowSize;

    const alignedOverflowAmount = contentOverflowSize + alignAmount;
    const needsShift =
      alignedOverflowAmount > availableSpace[positionComplements[align]];
    amountOfShiftNeeded = needsShift
      ? alignedOverflowAmount - availableSpace[positionComplements[align]]
      : 0;
    shiftDirection = -1 * alignDirection;
  } else {
    // shifting the overlay to one side may yield a better fit
    const spaceAvailableOnFirstSide = availableSpace[crossAxisFirstSide];
    const spaceAvailableOnSecondSide = availableSpace[crossAxisSecondSide];

    const isShiftTowardFirstSide =
      spaceAvailableOnFirstSide > spaceAvailableOnSecondSide;
    shiftDirection = isShiftTowardFirstSide ? -1 : 1;

    // determine which direction has more room and the overlay should shift to
    const leastAvailableSpace = Math.min(
      spaceAvailableOnFirstSide,
      spaceAvailableOnSecondSide
    );

    const needsShift = contentOverflowSize > leastAvailableSpace;
    amountOfShiftNeeded = needsShift
      ? contentOverflowSize - leastAvailableSpace
      : 0;
  }

  // shift over the overlay if necessary
  const shiftAmount = amountOfShiftNeeded * shiftDirection;
  let crossAxisPosition =
    crossAxisPositionOriginal + shiftAmount + alignAmount * alignDirection;

  return crossAxisPosition;
}

interface GetPrimaryAxisPositionArgs {
  position: OverlayPlacement;
  offset: number;
  overlayBoundingBox: BoundingBox;
  anchorBoundingBox: BoundingBox;
}

function getPrimaryAxisPosition({
  position,
  offset,
  overlayBoundingBox,
  anchorBoundingBox
}: GetPrimaryAxisPositionArgs) {
  // if positioning to the top or left, the target position decreases
  // from the anchor's top or left, otherwise the position adds to the anchor's
  const isOffsetDecreasing = position === "top" || position === "left";

  const primaryAxisDimension = relatedDimension[position]; // "top" -> "height"
  const overlaySizeOnPrimaryAxis = overlayBoundingBox[primaryAxisDimension];

  // start at the top or left edge of the anchor element
  const primaryAxisPositionName =
    dimensionPositionAttribute[primaryAxisDimension]; // "height" -> "top"
  const anchorEdgeOrigin = anchorBoundingBox[primaryAxisPositionName];

  // find the overlay position on the primary axis
  const anchorSizeOnPrimaryAxis = anchorBoundingBox[primaryAxisDimension];
  const primaryAxisOffset = isOffsetDecreasing
    ? overlaySizeOnPrimaryAxis
    : anchorSizeOnPrimaryAxis;
  const contentOffset =
    (offset + primaryAxisOffset!) * (isOffsetDecreasing ? -1 : 1);
  const primaryAxisPosition = anchorEdgeOrigin + contentOffset;

  return primaryAxisPosition;
}

/**
 * Finds the client pixel coordinate of each edge for the element's bounding box,
 * and the bounding box's width & height
 *
 * @param {HTMLElement} element
 * @returns {{top: number, right: number, bottom: number, left: number, height: number, width: number}}
 */
export function getElementBoundingBox(
  element: HTMLElement
): BoundingClientRect {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    height: rect.height,
    width: rect.width
  };
}

/**
 * Calculates the available content space between anchor and container
 *
 * @param {Object} anchorBoundingBox Client bounding box of the anchor element
 * @param {Object} containerBoundingBox Client bounding box of the container element
 * @param {number} buffer Minimum distance between the overlay and the bounding container
 * @param {number} offset Distance between the overlay and the anchor
 * @param {string} offsetSide Side the offset needs to be applied to, one
 *  of ["top", "right", "bottom", "left"]
 * @returns {{top: number, right: number, bottom: number, left: number}}
 */
export function getAvailableSpace(
  anchorBoundingBox: BoundingBox,
  containerBoundingBox: BoundingBox,
  buffer: number,
  offset: number,
  offsetSide: OverlayPlacement
): BoundingBox {
  return {
    top:
      anchorBoundingBox.top -
      containerBoundingBox.top -
      buffer -
      (offsetSide === "top" ? offset : 0),
    right:
      containerBoundingBox.right -
      anchorBoundingBox.right -
      buffer -
      (offsetSide === "right" ? offset : 0),
    bottom:
      containerBoundingBox.bottom -
      anchorBoundingBox.bottom -
      buffer -
      (offsetSide === "bottom" ? offset : 0),
    left:
      anchorBoundingBox.left -
      containerBoundingBox.left -
      buffer -
      (offsetSide === "left" ? offset : 0)
  };
}

/**
 * Computes the fit (overlap) of the content within the
 * container, fit is in range 0.0 => 1.0
 */
export function getVisibleFit(
  contentBoundingBox: BoundingBox,
  containerBoundingBox: BoundingBox
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

/**
 * Calculate the intersection space between two bounding boxes
 */
export function intersectBoundingBoxes(
  firstBox: BoundingBox,
  secondBox: BoundingBox
): BoundingClientRect {
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

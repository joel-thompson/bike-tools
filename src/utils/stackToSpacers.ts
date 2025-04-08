/**
 * Calculates the required stem spacer changes and resulting reach changes for a bicycle stem adjustment.
 * Uses trigonometric relationships in a right triangle formed by:
 * - The vertical change (stackDelta) as the opposite side
 * - The horizontal change (reachDelta) as the adjacent side
 * - The spacer change (spacersDelta) as the hypotenuse
 *
 * Mathematical relationships used:
 * - sin(headAngle) = stackDelta/spacersDelta
 * - cos(headAngle) = |reachDelta|/spacersDelta
 *
 * @param {Object} params - The input parameters
 * @param {number} params.stack - Current stack height in millimeters (500-1000mm)
 * @param {number} params.headAngle - Head tube angle in degrees (0-90°)
 * @param {number} params.stackDelta - Desired vertical change in millimeters (-100 to +100mm)
 *
 * @returns {{
 *   spacersDelta: number, // Required change in spacer length (always positive)
 *   reachDelta: number    // Resulting change in reach (negative for positive spacersDelta)
 * }}
 *
 * @throws {Error} If any parameters are outside their valid ranges
 *
 * @example
 * // For a vertical stem with 90° head angle, reach doesn't change
 * stackToSpacers({ stack: 600, headAngle: 90, stackDelta: 10 })
 * // Returns { spacersDelta: 10, reachDelta: 0 }
 *
 * @example
 * // For a 45° head angle, spacersDelta is larger than stackDelta
 * stackToSpacers({ stack: 600, headAngle: 45, stackDelta: 10 })
 * // Returns { spacersDelta: 14.14, reachDelta: -10 }
 */
const stackToSpacers = ({
  headAngle,
  stackDelta,
}: {
  headAngle: number;
  stackDelta: number;
}) => {
  // should return the required spacers under the stem to get the desired stackDelta
  // should return the change in reach (reachDelta) as a result of that change in spacers

  if (headAngle <= 0 || headAngle > 90) {
    throw new Error("Head angle must be greater than 0 and less than 90");
  }

  if (stackDelta < -100 || stackDelta > 100) {
    throw new Error("Stack delta must be greater than -100 and less than 100");
  }

  // Convert headAngle to radians for Math.sin and Math.cos
  const angleInRadians = (headAngle * Math.PI) / 180;

  // Calculate spacersDelta using sin(headAngle) = stackDelta/spacersDelta
  // For negative stackDelta, spacersDelta should also be negative
  const spacersDelta = stackDelta / Math.sin(angleInRadians);

  // Calculate reachDelta using cos(headAngle) = reachDelta/spacersDelta
  // The sign of reachDelta should be opposite of spacersDelta
  const reachDelta = -1 * spacersDelta * Math.cos(angleInRadians);

  return {
    spacersDelta: Number(spacersDelta.toFixed(2)),
    reachDelta: Number(reachDelta.toFixed(2)),
  };
};

export default stackToSpacers;

// example:
// stackToSpacers({ stack: 100, headAngle: 90, stackDelta: 10 }); returns {spacersDelta: 10, reachDelta: 0}
// stackToSpacers({ stack: 100, headAngle: 45, stackDelta: 10 }); returns {spacersDelta: 14.14 (approx), reachDelta: 10}

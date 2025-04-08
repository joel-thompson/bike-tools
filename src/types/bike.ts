/**
 * Represents the geometry and details of a bicycle
 */
export interface BikeDetails {
  /** Unique identifier for the bike */
  id: string;
  /** Display name of the bike */
  name: string;
  /** Stack height in millimeters */
  stack: number;
  /** Reach length in millimeters */
  reach: number;
  /** Head tube angle in degrees */
  headAngle: number;
  /** Chainstay length in millimeters */
  chainstayLength: number;
  /** Wheelbase length in millimeters */
  wheelbase: number;
}

/**
 * Side of the bike comparison (left or right)
 */
export type BikeSide = "left" | "right";

/**
 * Result of a spacer calculation
 */
export interface SpacerCalculation {
  /** Difference in stack height between bikes in millimeters */
  stackDelta: number;
  /** Required change in spacer length in millimeters */
  spacersDelta: number;
  /** Resulting change in reach in millimeters */
  reachDelta: number;
}

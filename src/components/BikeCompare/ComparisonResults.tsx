import { BikeDetails, SpacerCalculation } from "@/types/bike";

interface ComparisonResultsProps {
  leftBike: BikeDetails;
  rightBike: BikeDetails;
  calculation: SpacerCalculation;
}

export const ComparisonResults = ({
  leftBike,
  rightBike,
  calculation,
}: ComparisonResultsProps) => (
  <div className="mt-8 p-4">
    <h3 className="font-semibold mb-2">
      Adjusting {rightBike.name} to match {leftBike.name} stack height
    </h3>
    <p className="text-sm mb-1">
      Stack difference: {calculation.stackDelta.toFixed(1)}mm
    </p>
    <p className="text-sm mb-1">
      Spacer adjustment needed on {rightBike.name}:{" "}
      {calculation.spacersDelta.toFixed(1)}mm
    </p>
    <p className="text-sm mb-1">
      This will change reach by: {calculation.reachDelta.toFixed(1)}mm
    </p>
    <p className="text-sm">
      Effective reach of {rightBike.name} at {leftBike.stack}mm stack height:{" "}
      {(rightBike.reach + calculation.reachDelta).toFixed(1)}mm
    </p>
  </div>
);

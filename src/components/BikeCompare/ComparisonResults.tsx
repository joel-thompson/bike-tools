import { BikeDetails, SpacerCalculation } from "@/types/bike";
import { calculateFrontWeightDistribution } from "@/utils/mathHelpers";

interface ComparisonResultsProps {
  leftBike: BikeDetails;
  rightBike: BikeDetails;
  calculation: SpacerCalculation;
}

export const ComparisonResults = ({
  leftBike,
  rightBike,
  calculation,
}: ComparisonResultsProps) => {
  const { bikeWithMoreFrontWeight, weightDifference } =
    calculateFrontWeightDistribution({
      leftBike,
      rightBike,
    });

  return (
    <div className="p-4 gap-2 flex flex-col">
      <h3 className="font-semibold ">
        Comparing {rightBike.name} to {leftBike.name}
      </h3>
      <h4 className="font-semibold ">Adjusting stack height</h4>
      <p className="text-sm">
        Stack difference: {calculation.stackDelta.toFixed(1)}mm
      </p>
      <p className="text-sm">
        Spacer adjustment needed on {rightBike.name}:{" "}
        {calculation.spacersDelta.toFixed(1)}mm
      </p>
      <p className="text-sm">
        This will change reach by: {calculation.reachDelta.toFixed(1)}mm
      </p>
      <p className="text-sm">
        Effective reach of {rightBike.name} at {leftBike.stack}mm stack height:{" "}
        {(rightBike.reach + calculation.reachDelta).toFixed(1)}mm
      </p>
      <h3 className="font-semibold">Comparing rear center ratio</h3>
      <p className="text-sm">
        With 200 lbs applied, {bikeWithMoreFrontWeight} would have{" "}
        {weightDifference.toFixed(2)} lbs more on the front wheel
      </p>
    </div>
  );
};

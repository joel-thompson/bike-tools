export const frontCenterToRearCenterRatio = (
  rearCenter: number,
  wheelbase: number
) => {
  const frontCenter = wheelbase - rearCenter;
  return (frontCenter / rearCenter).toFixed(3);
};

export const calculateFrontWeightDistribution = ({
  leftBike,
  rightBike,
  referenceWeight = 200,
}: {
  leftBike: { name: string; chainstayLength: number; wheelbase: number };
  rightBike: { name: string; chainstayLength: number; wheelbase: number };
  referenceWeight?: number;
}) => {
  const leftRatio = leftBike.chainstayLength / leftBike.wheelbase;
  const rightRatio = rightBike.chainstayLength / rightBike.wheelbase;

  const bikeWithMoreFrontWeight =
    leftRatio > rightRatio ? leftBike.name : rightBike.name;
  const weightDifference = Math.abs(leftRatio - rightRatio) * referenceWeight;

  return {
    bikeWithMoreFrontWeight,
    weightDifference,
  };
};

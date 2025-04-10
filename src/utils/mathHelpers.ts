export const rearCenterRatio = (chainstayLength: number, wheelbase: number) => {
  return ((chainstayLength / wheelbase) * 100).toFixed(2) + "%";
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

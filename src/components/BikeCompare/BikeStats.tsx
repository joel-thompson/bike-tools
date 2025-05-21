import { BikeDetails } from "@/types/bike";
import { frontCenterToRearCenterRatio } from "@/utils/mathHelpers";
interface BikeStatsProps {
  bike: BikeDetails;
}

export const BikeStats = ({ bike }: BikeStatsProps) => {
  return (
    <div className="pt-4 space-y-1">
      <h3 className="font-semibold">{bike.name}</h3>
      <div className="space-y-1 text-sm">
        <div>Stack: {bike.stack}mm</div>
        <div>Reach: {bike.reach}mm</div>
        <div>Head Angle: {bike.headAngle}°</div>
        <div>Chainstay: {bike.chainstayLength}mm</div>
        <div>Wheelbase: {bike.wheelbase}mm</div>
        <div>
          Front center to rear center ratio:{" "}
          {frontCenterToRearCenterRatio(bike.chainstayLength, bike.wheelbase)}
        </div>
      </div>
    </div>
  );
};

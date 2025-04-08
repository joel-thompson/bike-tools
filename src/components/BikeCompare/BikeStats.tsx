import { BikeDetails } from "@/types/bike";

interface BikeStatsProps {
  bike: BikeDetails;
}

export const BikeStats = ({ bike }: BikeStatsProps) => (
  <div className="m-4 space-y-1">
    <h3 className="font-semibold">{bike.name}</h3>
    <div className="space-y-1 text-sm">
      <div>Stack: {bike.stack}mm</div>
      <div>Reach: {bike.reach}mm</div>
      <div>Head Angle: {bike.headAngle}°</div>
      <div>Chainstay: {bike.chainstayLength}mm</div>
      <div>Wheelbase: {bike.wheelbase}mm</div>
    </div>
  </div>
);

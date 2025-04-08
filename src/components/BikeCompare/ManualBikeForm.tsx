import { Input } from "@/components/ui/input";
import { BikeDetails } from "@/types/bike";

interface ManualBikeFormProps {
  bike: BikeDetails;
  onChange: (bike: BikeDetails) => void;
}

export const ManualBikeForm = ({ bike, onChange }: ManualBikeFormProps) => {
  const handleChange = (field: keyof BikeDetails, value: string) => {
    const numValue = field === "name" ? value : parseFloat(value);
    onChange({
      ...bike,
      [field]: numValue,
    });
  };

  return (
    <div className="space-y-2">
      <div>
        <label className="text-sm font-medium">Name</label>
        <Input
          value={bike.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Custom Bike"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Stack (mm)</label>
        <Input
          type="number"
          value={bike.stack}
          onChange={(e) => handleChange("stack", e.target.value)}
          placeholder="Stack height"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Reach (mm)</label>
        <Input
          type="number"
          value={bike.reach}
          onChange={(e) => handleChange("reach", e.target.value)}
          placeholder="Reach"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Head Angle (°)</label>
        <Input
          type="number"
          value={bike.headAngle}
          onChange={(e) => handleChange("headAngle", e.target.value)}
          placeholder="Head tube angle"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Chainstay (mm)</label>
        <Input
          type="number"
          value={bike.chainstayLength}
          onChange={(e) => handleChange("chainstayLength", e.target.value)}
          placeholder="Chainstay length"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Wheelbase (mm)</label>
        <Input
          type="number"
          value={bike.wheelbase}
          onChange={(e) => handleChange("wheelbase", e.target.value)}
          placeholder="Wheelbase"
        />
      </div>
    </div>
  );
};

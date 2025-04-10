import { Button } from "@/components/ui/button";
import { BikeDetails } from "@/types/bike";
import { BikeCombobox } from "./BikeCombobox";
import { ManualBikeForm } from "./ManualBikeForm";
import { BikeStats } from "./BikeStats";
import bikes from "@/bikes.json";

interface BikeSelectorProps {
  selectedBikeId: string;
  onBikeSelect: (bikeId: string) => void;
  onCustomBikeChange: (params: { bike: BikeDetails | null }) => void;
  customBike: BikeDetails | null;
  placeholder: string;
  isManualMode: boolean;
  onManualModeChange: (isManual: boolean) => void;
  onManualChange: (params: { bike: BikeDetails }) => void;
}

const defaultBike = {
  id: "custom",
  name: "Custom Bike",
  stack: 0,
  reach: 0,
  headAngle: 0,
  chainstayLength: 0,
  wheelbase: 0,
} as const;

export const BikeSelector = ({
  selectedBikeId,
  onBikeSelect,
  onCustomBikeChange,
  customBike,
  placeholder,
  isManualMode,
  onManualModeChange,
  onManualChange,
}: BikeSelectorProps) => {
  const handleManualToggle = () => {
    const newManualMode = !isManualMode;
    onManualModeChange(newManualMode);

    if (newManualMode) {
      // When switching to manual mode, initialize with selected bike or default values
      const selectedBike = selectedBikeId
        ? bikes.bikes.find((bike) => bike.id === selectedBikeId)
        : null;
      onCustomBikeChange({ bike: selectedBike ?? defaultBike });
    } else {
      // When switching back to bike selection mode
      onCustomBikeChange({ bike: null });
    }
  };

  return (
    <div className="p-4 w-80">
      <div className="mb-2 flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={handleManualToggle}
          className="text-xs"
        >
          {isManualMode ? "Choose Bike" : "Manual Entry"}
        </Button>
      </div>

      {isManualMode ? (
        <ManualBikeForm
          bike={customBike ?? defaultBike}
          onChange={onManualChange}
        />
      ) : (
        <>
          <BikeCombobox
            selectedBikeId={selectedBikeId}
            onSelect={onBikeSelect}
            placeholder={placeholder}
          />
          {selectedBikeId &&
            bikes.bikes.find((bike) => bike.id === selectedBikeId) && (
              <BikeStats
                bike={bikes.bikes.find((bike) => bike.id === selectedBikeId)!}
              />
            )}
        </>
      )}
    </div>
  );
};

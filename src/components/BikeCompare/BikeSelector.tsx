import * as React from "react";
import { Button } from "@/components/ui/button";
import { BikeDetails } from "@/types/bike";
import { BikeCombobox } from "./BikeCombobox";
import { ManualBikeForm } from "./ManualBikeForm";
import { BikeStats } from "./BikeStats";
import bikes from "@/bikes.json";

interface BikeSelectorProps {
  selectedBikeId: string;
  onBikeSelect: (bikeId: string) => void;
  onCustomBikeChange: (bike: BikeDetails | null) => void;
  customBike: BikeDetails | null;
  placeholder: string;
  isManualMode: boolean;
  onManualModeChange: (isManual: boolean) => void;
}

export const BikeSelector = ({
  selectedBikeId,
  onBikeSelect,
  onCustomBikeChange,
  customBike,
  placeholder,
  isManualMode,
  onManualModeChange,
}: BikeSelectorProps) => {
  const [hasManualChanges, setHasManualChanges] = React.useState(false);

  const handleManualToggle = () => {
    const newManualMode = !isManualMode;
    onManualModeChange(newManualMode);

    if (newManualMode) {
      // When switching to manual mode, initialize with selected bike or default values
      const selectedBike = selectedBikeId
        ? bikes.bikes.find((bike) => bike.id === selectedBikeId)
        : null;
      onCustomBikeChange(
        selectedBike ?? {
          id: "custom",
          name: "Custom Bike",
          stack: 0,
          reach: 0,
          headAngle: 0,
          chainstayLength: 0,
          wheelbase: 0,
        }
      );
      setHasManualChanges(false);
    } else {
      // When switching back to bike selection mode
      onCustomBikeChange(null);
      setHasManualChanges(false);
    }
  };

  const handleManualChange = (bike: BikeDetails) => {
    // First time we make a change, clear the bike selection
    if (!hasManualChanges) {
      onBikeSelect("");
    }
    setHasManualChanges(true);
    onCustomBikeChange({
      ...bike,
      id: "custom", // Ensure custom bikes always have id="custom"
    });
  };

  return (
    <div className="w-80">
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
          bike={
            customBike ?? {
              id: "custom",
              name: "Custom Bike",
              stack: 0,
              reach: 0,
              headAngle: 0,
              chainstayLength: 0,
              wheelbase: 0,
            }
          }
          onChange={handleManualChange}
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

import { Button } from "@/components/ui/button";
import { useBikeSelection } from "@/hooks/useBikeSelection";
import { BikeSelector } from "./BikeSelector";
import { ComparisonResults } from "./ComparisonResults";

export { BikeCombobox } from "./BikeCombobox";
export { BikeSelector } from "./BikeSelector";
export { BikeStats } from "./BikeStats";
export { ComparisonResults } from "./ComparisonResults";
export { ManualBikeForm } from "./ManualBikeForm";

const BikeCompare = () => {
  const {
    leftBike,
    rightBike,
    leftBikeId,
    rightBikeId,
    leftCustomBike,
    rightCustomBike,
    isLeftManualMode,
    isRightManualMode,
    spacerCalculation,
    handleBikeSelect,
    handleCustomBikeChange,
    handleCalculate,
    handleManualModeChange,
    handleManualChange,
    resetSelection,
  } = useBikeSelection();

  return (
    <div className="">
      <div className="flex gap-8">
        <BikeSelector
          selectedBikeId={leftBikeId}
          onBikeSelect={(bikeId) => handleBikeSelect({ bikeId, side: "left" })}
          onCustomBikeChange={({ bike }) =>
            handleCustomBikeChange({ bike, side: "left" })
          }
          customBike={leftCustomBike}
          placeholder="Select first bike..."
          isManualMode={isLeftManualMode}
          onManualModeChange={(isManual) =>
            handleManualModeChange({ isManual, side: "left" })
          }
          onManualChange={({ bike }) =>
            handleManualChange({ bike, side: "left" })
          }
        />
        <BikeSelector
          selectedBikeId={rightBikeId}
          onBikeSelect={(bikeId) => handleBikeSelect({ bikeId, side: "right" })}
          onCustomBikeChange={({ bike }) =>
            handleCustomBikeChange({ bike, side: "right" })
          }
          customBike={rightCustomBike}
          placeholder="Select second bike..."
          isManualMode={isRightManualMode}
          onManualModeChange={(isManual) =>
            handleManualModeChange({ isManual, side: "right" })
          }
          onManualChange={({ bike }) =>
            handleManualChange({ bike, side: "right" })
          }
        />
      </div>

      {(isLeftManualMode || isRightManualMode) && (
        <div className="mt-4">
          <Button onClick={handleCalculate} disabled={!leftBike || !rightBike}>
            Calculate
          </Button>
        </div>
      )}

      {spacerCalculation && leftBike && rightBike && (
        <ComparisonResults
          leftBike={leftBike}
          rightBike={rightBike}
          calculation={spacerCalculation}
        />
      )}

      {(Boolean(leftBikeId) ||
        Boolean(rightBikeId) ||
        leftCustomBike !== null ||
        rightCustomBike !== null) && (
        <div className="mt-8">
          <Button variant="destructive" onClick={resetSelection}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};

export default BikeCompare;

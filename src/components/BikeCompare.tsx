import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import bikes from "@/bikes.json";
import stackToSpacers from "@/utils/stackToSpacers";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Route as BikeCompareRoute } from "@/routes/bike-compare";
import { bikeCompareSearchSchema } from "@/schemas";
import { z } from "zod";

type SearchParams = z.infer<typeof bikeCompareSearchSchema>;

interface BikeDetails {
  id: string;
  name: string;
  stack: number;
  reach: number;
  headAngle: number;
  chainstayLength: number;
  wheelbase: number;
}

const BikeStats = ({ bike }: { bike: BikeDetails }) => (
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

interface BikeSelectorProps {
  selectedBikeId: string;
  onBikeSelect: (bikeId: string) => void;
  onCustomBikeChange: (bike: BikeDetails | null) => void;
  customBike: BikeDetails | null;
  placeholder: string;
}

const ManualBikeInput = ({
  bike,
  onChange,
}: {
  bike: BikeDetails;
  onChange: (bike: BikeDetails) => void;
}) => {
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

const BikeSelector = ({
  selectedBikeId,
  onBikeSelect,
  onCustomBikeChange,
  customBike,
  placeholder,
}: BikeSelectorProps) => {
  const [open, setOpen] = React.useState(false);
  const [isManualMode, setIsManualMode] = React.useState(false);
  const [hasManualChanges, setHasManualChanges] = React.useState(false);
  const selectedBike = selectedBikeId ? getBikeDetails(selectedBikeId) : null;

  const handleManualToggle = () => {
    setIsManualMode(!isManualMode);
    if (!isManualMode) {
      // When switching to manual mode, initialize with selected bike or default values
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
        <ManualBikeInput
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
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {selectedBike ? selectedBike.name : placeholder}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-0">
              <Command
                filter={(value, search) => {
                  const bikeItem = bikes.bikes.find(
                    (bike) => bike.id === value
                  );
                  return bikeItem?.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
                    ? 1
                    : 0;
                }}
              >
                <CommandInput placeholder="Search bikes..." />
                <CommandList>
                  <CommandEmpty>No bike found.</CommandEmpty>
                  <CommandGroup>
                    {bikes.bikes.map((bike) => (
                      <CommandItem
                        key={bike.id}
                        value={bike.id}
                        onSelect={(currentValue) => {
                          onBikeSelect(
                            currentValue === selectedBikeId ? "" : currentValue
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedBikeId === bike.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {bike.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {selectedBike && <BikeStats bike={selectedBike} />}
        </>
      )}
    </div>
  );
};

const getBikeDetails = (bikeId: string): BikeDetails => {
  const bike = bikes.bikes.find((bike) => bike.id === bikeId);
  if (!bike) {
    throw new Error(`Bike with id ${bikeId} not found`);
  }
  return bike;
};

interface SpacerCalculationResultProps {
  leftBike: BikeDetails;
  rightBike: BikeDetails;
  calculation: {
    stackDelta: number;
    spacersDelta: number;
    reachDelta: number;
  };
}

const SpacerCalculationResult = ({
  leftBike,
  rightBike,
  calculation,
}: SpacerCalculationResultProps) => (
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

const BikeCompare = () => {
  // Get search params and navigation function
  const search = useSearch({
    from: BikeCompareRoute.id,
  }) as unknown as SearchParams;
  const leftBikeId = search.leftBikeId ?? "";
  const rightBikeId = search.rightBikeId ?? "";
  const navigate = useNavigate({ from: BikeCompareRoute.id });

  // Keep manual entry state local
  const [leftCustomBike, setLeftCustomBike] =
    React.useState<BikeDetails | null>(null);
  const [rightCustomBike, setRightCustomBike] =
    React.useState<BikeDetails | null>(null);
  const [manualCalculation, setManualCalculation] = React.useState<{
    stackDelta: number;
    spacersDelta: number;
    reachDelta: number;
  } | null>(null);

  const leftBikeDetails =
    leftCustomBike ?? (leftBikeId ? getBikeDetails(leftBikeId) : null);
  const rightBikeDetails =
    rightCustomBike ?? (rightBikeId ? getBikeDetails(rightBikeId) : null);

  const calculateSpacerChange = () => {
    if (!leftBikeDetails || !rightBikeDetails) return null;

    const stackDelta = leftBikeDetails.stack - rightBikeDetails.stack;
    const result = stackToSpacers({
      headAngle: rightBikeDetails.headAngle,
      stackDelta: stackDelta,
    });

    return {
      stackDelta,
      ...result,
    };
  };

  // Determine if we're in manual mode
  const isManualMode = leftCustomBike !== null || rightCustomBike !== null;

  // Calculate automatically only if not in manual mode
  const autoSpacerCalculation =
    !isManualMode && leftBikeDetails && rightBikeDetails
      ? calculateSpacerChange()
      : null;

  const handleCalculate = () => {
    if (leftBikeDetails && rightBikeDetails) {
      setManualCalculation(calculateSpacerChange());
    }
  };

  // Update search params when bikes are selected (but not for manual entries)
  const handleBikeSelect = (bikeId: string, isLeft: boolean) => {
    if (isLeft) {
      void navigate({
        search: (prev: SearchParams) => ({
          ...prev,
          leftBikeId: bikeId || undefined,
        }),
      });
    } else {
      void navigate({
        search: (prev: SearchParams) => ({
          ...prev,
          rightBikeId: bikeId || undefined,
        }),
      });
    }
  };

  const handleCustomBikeChange = (
    bike: BikeDetails | null,
    isLeft: boolean
  ) => {
    if (isLeft) {
      setLeftCustomBike(bike);
    } else {
      setRightCustomBike(bike);
    }
    setManualCalculation(null);
  };

  // Use manual calculation if available, otherwise use auto calculation
  const spacerCalculation = isManualMode
    ? manualCalculation
    : autoSpacerCalculation;

  return (
    <div className="">
      <div className="flex gap-8">
        <BikeSelector
          selectedBikeId={leftBikeId}
          onBikeSelect={(id) => handleBikeSelect(id, true)}
          onCustomBikeChange={(bike) => handleCustomBikeChange(bike, true)}
          customBike={leftCustomBike}
          placeholder="Select first bike..."
        />
        <BikeSelector
          selectedBikeId={rightBikeId}
          onBikeSelect={(id) => handleBikeSelect(id, false)}
          onCustomBikeChange={(bike) => handleCustomBikeChange(bike, false)}
          customBike={rightCustomBike}
          placeholder="Select second bike..."
        />
      </div>

      {isManualMode && (
        <div className="mt-4">
          <Button
            onClick={handleCalculate}
            disabled={!leftBikeDetails || !rightBikeDetails}
          >
            Calculate
          </Button>
        </div>
      )}

      {spacerCalculation && leftBikeDetails && rightBikeDetails && (
        <SpacerCalculationResult
          leftBike={leftBikeDetails}
          rightBike={rightBikeDetails}
          calculation={spacerCalculation}
        />
      )}

      {(Boolean(leftBikeId) ||
        Boolean(rightBikeId) ||
        leftCustomBike !== null ||
        rightCustomBike !== null) && (
        <div className="mt-8">
          <Button
            variant="destructive"
            onClick={() => {
              void navigate({
                search: () => ({}),
              }).then(() => window.location.reload());
            }}
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};

export default BikeCompare;

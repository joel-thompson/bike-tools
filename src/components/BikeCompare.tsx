"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  placeholder: string;
}

const BikeSelector = ({
  selectedBikeId,
  onBikeSelect,
  placeholder,
}: BikeSelectorProps) => {
  const [open, setOpen] = React.useState(false);
  const selectedBike = selectedBikeId ? getBikeDetails(selectedBikeId) : null;

  return (
    <div className="w-80">
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
              const bikeItem = bikes.bikes.find((bike) => bike.id === value);
              return bikeItem?.name.toLowerCase().includes(search.toLowerCase())
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
                        selectedBikeId === bike.id ? "opacity-100" : "opacity-0"
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
  const [leftBike, setLeftBike] = React.useState<string>("");
  const [rightBike, setRightBike] = React.useState<string>("");

  const leftBikeDetails = leftBike ? getBikeDetails(leftBike) : null;
  const rightBikeDetails = rightBike ? getBikeDetails(rightBike) : null;

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

  const spacerCalculation =
    leftBike && rightBike ? calculateSpacerChange() : null;

  return (
    <div className="">
      <div className="flex gap-8">
        <BikeSelector
          selectedBikeId={leftBike}
          onBikeSelect={setLeftBike}
          placeholder="Select first bike..."
        />
        <BikeSelector
          selectedBikeId={rightBike}
          onBikeSelect={setRightBike}
          placeholder="Select second bike..."
        />
      </div>

      {spacerCalculation && leftBikeDetails && rightBikeDetails && (
        <SpacerCalculationResult
          leftBike={leftBikeDetails}
          rightBike={rightBikeDetails}
          calculation={spacerCalculation}
        />
      )}
    </div>
  );
};

export default BikeCompare;

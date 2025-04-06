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

const BikeCompare = () => {
  const [openLeft, setOpenLeft] = React.useState(false);
  const [openRight, setOpenRight] = React.useState(false);
  const [leftBike, setLeftBike] = React.useState<string>("");
  const [rightBike, setRightBike] = React.useState<string>("");

  const getBikeDetails = (bikeId: string): BikeDetails => {
    const bike = bikes.bikes.find((bike) => bike.id === bikeId);
    if (!bike) {
      throw new Error(`Bike with id ${bikeId} not found`);
    }
    return bike;
  };

  const leftBikeDetails = getBikeDetails(leftBike);
  const rightBikeDetails = getBikeDetails(rightBike);

  const calculateSpacerChange = () => {
    if (!leftBikeDetails || !rightBikeDetails) return null;

    // const stackDelta = rightBikeDetails.stack - leftBikeDetails.stack;
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
    <div className="p-4">
      <div className="flex gap-8">
        {/* Left Bike Selector */}
        <div className="w-80">
          <Popover open={openLeft} onOpenChange={setOpenLeft}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openLeft}
                className="w-full justify-between"
              >
                {leftBike
                  ? getBikeDetails(leftBike)?.name
                  : "Select first bike..."}
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
                          setLeftBike(
                            currentValue === leftBike ? "" : currentValue
                          );
                          setOpenLeft(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            leftBike === bike.id ? "opacity-100" : "opacity-0"
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
          {leftBike && getBikeDetails(leftBike) && (
            <BikeStats bike={getBikeDetails(leftBike)} />
          )}
        </div>

        {/* Right Bike Selector */}
        <div className="w-80">
          <Popover open={openRight} onOpenChange={setOpenRight}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openRight}
                className="w-full justify-between"
              >
                {rightBike
                  ? getBikeDetails(rightBike)?.name
                  : "Select second bike..."}
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
                          setRightBike(
                            currentValue === rightBike ? "" : currentValue
                          );
                          setOpenRight(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            rightBike === bike.id ? "opacity-100" : "opacity-0"
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
          {rightBike && getBikeDetails(rightBike) && (
            <BikeStats bike={getBikeDetails(rightBike)} />
          )}
        </div>
      </div>

      {spacerCalculation && (
        <div className="mt-8 p-4">
          <h3 className="font-semibold mb-2">
            Stack Height Adjustment to get {rightBikeDetails?.name} to match{" "}
            {leftBikeDetails?.name}
          </h3>
          <p className="text-sm mb-1">
            Stack difference:{" "}
            <span className="font-medium">
              {spacerCalculation.stackDelta.toFixed(1)}mm
            </span>
          </p>
          <p className="text-sm mb-1">
            Required spacer change:{" "}
            <span className="font-medium">
              {spacerCalculation.spacersDelta.toFixed(1)}mm
            </span>
          </p>
          <p className="text-sm mb-1">
            Resulting reach change:{" "}
            <span className="font-medium">
              {spacerCalculation.reachDelta.toFixed(1)}mm
            </span>
          </p>
          <p className="text-sm">
            Effective reach at matching stack:{" "}
            <span className="font-medium">
              {(rightBikeDetails?.reach + spacerCalculation.reachDelta).toFixed(
                1
              )}
              mm
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default BikeCompare;

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

  const getBikeDetails = (bikeId: string): BikeDetails | undefined => {
    return bikes.bikes.find((bike) => bike.id === bikeId);
  };

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
              <Command>
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
            <BikeStats bike={getBikeDetails(leftBike)!} />
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
              <Command>
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
            <BikeStats bike={getBikeDetails(rightBike)!} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BikeCompare;

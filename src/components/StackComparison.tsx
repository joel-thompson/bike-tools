// should compare 2 bikes
// given stack, head angle, and reach of two bikes
// show how many spacers are needed to get the same stack on the second bike
// show the reach difference

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import stackToSpacers from "../utils/stackToSpacers";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { FaCircleInfo } from "react-icons/fa6";

export function StackComparison() {
  const [bike1Stack, setBike1Stack] = useState("");

  const [bike2Stack, setBike2Stack] = useState("");
  const [bike2HeadAngle, setBike2HeadAngle] = useState("");

  const [result, setResult] = useState({
    spacersDelta: 0,
    reachDelta: 0,
  });

  const handleCalculate = () => {
    try {
      // Validate all fields are filled
      if (!bike1Stack || !bike2Stack || !bike2HeadAngle) {
        throw new Error("Please fill in all fields for both bikes");
      }

      // Convert all values to numbers
      const b1 = {
        stack: Number(bike1Stack),
      };
      const b2 = {
        stack: Number(bike2Stack),
        headAngle: Number(bike2HeadAngle),
      };

      // Calculate stack difference (positive means bike2 needs to be raised)
      const stackDelta = b1.stack - b2.stack;

      // Calculate spacers needed using the second bike's head angle
      const calc = stackToSpacers({
        headAngle: b2.headAngle,
        stackDelta,
      });

      setResult({
        spacersDelta: calc.spacersDelta,
        reachDelta: calc.reachDelta,
      });
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while calculating"
      );
    }
  };

  const handleReset = () => {
    setBike1Stack("");
    setBike2Stack("");
    setBike2HeadAngle("");
    setResult({ spacersDelta: 0, reachDelta: 0 });
  };

  const isFormEmpty = !bike1Stack && !bike2Stack && !bike2HeadAngle;

  const isFormComplete = bike1Stack && bike2Stack && bike2HeadAngle;

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bike 1 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">Reference Bike</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <FaCircleInfo className="h-4 w-4 text-black" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Enter the measurements of the bike you want to match</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">Stack (mm)</label>
            <Input
              type="number"
              value={bike1Stack}
              onChange={(e) => setBike1Stack(e.target.value)}
              placeholder="600"
              className="placeholder:text-muted-foreground/50"
            />
          </div>
        </div>

        {/* Bike 2 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">Bike to Adjust</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <FaCircleInfo className="h-4 w-4 text-black" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>
                    Enter the measurements of the bike you'll add spacers to
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">Stack (mm)</label>
            <Input
              type="number"
              value={bike2Stack}
              onChange={(e) => setBike2Stack(e.target.value)}
              placeholder="600"
              className="placeholder:text-muted-foreground/50"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm">Head Angle (degrees)</label>
            <Input
              type="number"
              value={bike2HeadAngle}
              onChange={(e) => setBike2HeadAngle(e.target.value)}
              placeholder="64"
              className="placeholder:text-muted-foreground/50"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleCalculate} disabled={!isFormComplete}>
          Calculate
        </Button>
        <Button onClick={handleReset} variant="outline" disabled={isFormEmpty}>
          Reset
        </Button>
      </div>

      {(result.spacersDelta !== 0 || result.reachDelta !== 0) && (
        <div className="text-left space-y-1">
          <p>
            To match the reference bike's stack height, add{" "}
            <span className="font-bold">{result.spacersDelta}mm</span> of
            spacers
          </p>
          <p>
            Adding these spacers will change the reach by{" "}
            <span className="font-bold">{result.reachDelta}mm</span>
          </p>
        </div>
      )}
    </div>
  );
}

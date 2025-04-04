import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import stackToSpacers from "../utils/stackToSpacers";
import { toast } from "sonner";

export function StackSpacerCalculator() {
  const [headAngle, setHeadAngle] = useState("");
  const [stackDelta, setStackDelta] = useState("");
  const [result, setResult] = useState({ spacersDelta: 0, reachDelta: 0 });

  const handleCalculate = () => {
    try {
      if (!headAngle || !stackDelta) {
        throw new Error("Please fill in both fields");
      }
      const calc = stackToSpacers({
        headAngle: Number(headAngle),
        stackDelta: Number(stackDelta),
      });
      setResult(calc);
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
    setHeadAngle("");
    setStackDelta("");
    setResult({ spacersDelta: 0, reachDelta: 0 });
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex flex-col gap-2">
        <label className="text-sm">Head Angle (degrees)</label>
        <Input
          type="number"
          value={headAngle}
          onChange={(e) => setHeadAngle(e.target.value)}
          placeholder="64"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm">Stack Change (mm)</label>
        <Input
          type="number"
          value={stackDelta}
          onChange={(e) => setStackDelta(e.target.value)}
          placeholder="10"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleCalculate} disabled={!headAngle || !stackDelta}>
          Calculate
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          disabled={!headAngle && !stackDelta}
        >
          Reset
        </Button>
      </div>

      <div className="text-left">
        <p>Required spacer change: {result.spacersDelta}mm</p>
        <p>Resulting reach change: {result.reachDelta}mm</p>
      </div>
    </div>
  );
}

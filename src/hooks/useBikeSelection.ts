import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { Route as BikeCompareRoute } from "@/routes/bike-compare";
import { bikeCompareSearchSchema } from "@/schemas";
import { z } from "zod";
import { BikeDetails, BikeSide, SpacerCalculation } from "@/types/bike";
import stackToSpacers from "@/utils/stackToSpacers";
import bikes from "@/bikes.json";

type SearchParams = z.infer<typeof bikeCompareSearchSchema>;

/**
 * Custom hook for managing bike selection state and calculations
 */
export function useBikeSelection() {
  const search = useSearch({
    from: BikeCompareRoute.id,
  });
  const navigate = useNavigate({ from: BikeCompareRoute.id });

  // URL state
  const leftBikeId = search.leftBikeId ?? "";
  const rightBikeId = search.rightBikeId ?? "";

  // Local state for custom bikes
  const [leftCustomBike, setLeftCustomBike] = useState<BikeDetails | null>(
    null
  );
  const [rightCustomBike, setRightCustomBike] = useState<BikeDetails | null>(
    null
  );
  const [manualCalculation, setManualCalculation] =
    useState<SpacerCalculation | null>(null);
  const [isLeftManualMode, setIsLeftManualMode] = useState(false);
  const [isRightManualMode, setIsRightManualMode] = useState(false);
  const [hasLeftManualChanges, setHasLeftManualChanges] = useState(false);
  const [hasRightManualChanges, setHasRightManualChanges] = useState(false);

  /**
   * Get bike details from the bikes database
   */
  const getBikeDetails = useCallback((bikeId: string): BikeDetails => {
    const bike = bikes.bikes.find((bike) => bike.id === bikeId);
    if (!bike) {
      throw new Error(`Bike with id ${bikeId} not found`);
    }
    return bike;
  }, []);

  // Derived state
  const leftBikeDetails =
    leftCustomBike ?? (leftBikeId ? getBikeDetails(leftBikeId) : null);
  const rightBikeDetails =
    rightCustomBike ?? (rightBikeId ? getBikeDetails(rightBikeId) : null);
  const isManualMode = leftCustomBike !== null || rightCustomBike !== null;

  /**
   * Calculate spacer changes needed to match stack heights
   */
  const calculateSpacerChange = useCallback((): SpacerCalculation | null => {
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
  }, [leftBikeDetails, rightBikeDetails]);

  /**
   * Handle bike selection from the dropdown
   * @param params Selection parameters
   * @param params.bikeId The ID of the selected bike
   * @param params.side Which side to update (left or right)
   */
  const handleBikeSelect = useCallback(
    ({ bikeId, side }: { bikeId: string; side: BikeSide }) => {
      void navigate({
        search: (prev: SearchParams) => ({
          ...prev,
          [side === "left" ? "leftBikeId" : "rightBikeId"]: bikeId || undefined,
        }),
      });
      setManualCalculation(null);
    },
    [navigate]
  );

  /**
   * Handle custom bike changes in manual mode
   * @param params Change parameters
   * @param params.bike The custom bike details or null
   * @param params.side Which side to update (left or right)
   */
  const handleCustomBikeChange = useCallback(
    ({ bike, side }: { bike: BikeDetails | null; side: BikeSide }) => {
      if (side === "left") {
        setLeftCustomBike(bike);
        if (bike === null) setHasLeftManualChanges(false);
      } else {
        setRightCustomBike(bike);
        if (bike === null) setHasRightManualChanges(false);
      }
      setManualCalculation(null);
    },
    []
  );

  /**
   * Handle manual mode changes
   * @param params Mode change parameters
   * @param params.isManual Whether to enable manual mode
   * @param params.side Which side to update (left or right)
   */
  const handleManualModeChange = useCallback(
    ({ isManual, side }: { isManual: boolean; side: BikeSide }) => {
      if (side === "left") {
        setIsLeftManualMode(isManual);
        if (!isManual) {
          setLeftCustomBike(null);
          setHasLeftManualChanges(false);
        }
      } else {
        setIsRightManualMode(isManual);
        if (!isManual) {
          setRightCustomBike(null);
          setHasRightManualChanges(false);
        }
      }
    },
    []
  );

  /**
   * Handle manual changes to bike details
   * @param params Change parameters
   * @param params.bike The updated bike details
   * @param params.side Which side to update (left or right)
   */
  const handleManualChange = useCallback(
    ({ bike, side }: { bike: BikeDetails; side: BikeSide }) => {
      if (side === "left") {
        if (!hasLeftManualChanges) {
          handleBikeSelect({ bikeId: "", side: "left" });
          setHasLeftManualChanges(true);
        }
      } else {
        if (!hasRightManualChanges) {
          handleBikeSelect({ bikeId: "", side: "right" });
          setHasRightManualChanges(true);
        }
      }
      handleCustomBikeChange({
        bike: { ...bike, id: "custom" },
        side,
      });
    },
    [
      hasLeftManualChanges,
      hasRightManualChanges,
      handleBikeSelect,
      handleCustomBikeChange,
    ]
  );

  /**
   * Calculate spacers in manual mode
   */
  const handleCalculate = useCallback(() => {
    if (leftBikeDetails && rightBikeDetails) {
      setManualCalculation(calculateSpacerChange());
    }
  }, [calculateSpacerChange, leftBikeDetails, rightBikeDetails]);

  const resetSelection = useCallback(() => {
    void navigate({
      search: () => ({}),
    });
    setLeftCustomBike(null);
    setRightCustomBike(null);
    setManualCalculation(null);
    setIsLeftManualMode(false);
    setIsRightManualMode(false);
    setHasLeftManualChanges(false);
    setHasRightManualChanges(false);
  }, [navigate]);

  // Calculate automatically only if not in manual mode
  const autoSpacerCalculation =
    !isManualMode && leftBikeDetails && rightBikeDetails
      ? calculateSpacerChange()
      : null;

  // Use manual calculation if available, otherwise use auto calculation
  const spacerCalculation = isManualMode
    ? manualCalculation
    : autoSpacerCalculation;

  return {
    // Bike details
    leftBike: leftBikeDetails,
    rightBike: rightBikeDetails,

    // Selection state
    leftBikeId,
    rightBikeId,
    leftCustomBike,
    rightCustomBike,

    // Mode and calculations
    isLeftManualMode,
    isRightManualMode,
    hasLeftManualChanges,
    hasRightManualChanges,
    spacerCalculation,

    // Actions
    handleBikeSelect,
    handleCustomBikeChange,
    handleCalculate,
    handleManualModeChange,
    handleManualChange,
    resetSelection,
  };
}

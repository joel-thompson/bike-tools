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
   */
  const handleBikeSelect = useCallback(
    (bikeId: string, side: BikeSide) => {
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
   */
  const handleCustomBikeChange = useCallback(
    (bike: BikeDetails | null, side: BikeSide) => {
      if (side === "left") {
        setLeftCustomBike(bike);
      } else {
        setRightCustomBike(bike);
      }
      setManualCalculation(null);
    },
    []
  );

  /**
   * Calculate spacers in manual mode
   */
  const handleCalculate = useCallback(() => {
    if (leftBikeDetails && rightBikeDetails) {
      setManualCalculation(calculateSpacerChange());
    }
  }, [calculateSpacerChange, leftBikeDetails, rightBikeDetails]);

  /**
   * Handle manual mode changes
   */
  const handleManualModeChange = useCallback(
    (isManual: boolean, side: BikeSide) => {
      if (side === "left") {
        setIsLeftManualMode(isManual);
        if (!isManual) setLeftCustomBike(null);
      } else {
        setIsRightManualMode(isManual);
        if (!isManual) setRightCustomBike(null);
      }
    },
    []
  );

  /**
   * Reset all selections and calculations
   */
  const resetSelection = useCallback(() => {
    void navigate({
      search: () => ({}),
    });
    setLeftCustomBike(null);
    setRightCustomBike(null);
    setManualCalculation(null);
    setIsLeftManualMode(false);
    setIsRightManualMode(false);
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
    spacerCalculation,

    // Actions
    handleBikeSelect,
    handleCustomBikeChange,
    handleCalculate,
    handleManualModeChange,
    resetSelection,
  };
}

import BikeCompare from "@/components/BikeCompare/index";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { bikeCompareSearchSchema } from "@/schemas";

export const Route = createFileRoute("/bike-compare")({
  component: BikeCompare,
  validateSearch: zodValidator(bikeCompareSearchSchema),
});

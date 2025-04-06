import BikeCompare from "@/components/BikeCompare";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/bike-compare")({
  component: BikeCompare,
});

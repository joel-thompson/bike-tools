import { StackComparison } from "@/components/StackComparison";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/stack-comparison")({
  component: () => <StackComparison />,
});

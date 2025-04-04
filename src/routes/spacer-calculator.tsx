import { StackSpacerCalculator } from "@/components/StackSpacerCalculator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/spacer-calculator")({
  component: () => <StackSpacerCalculator />,
});

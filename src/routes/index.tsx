import { createFileRoute } from "@tanstack/react-router";
import { StackSpacerCalculator } from "../components/StackSpacerCalculator";

export const Route = createFileRoute("/")({
  component: () => <StackSpacerCalculator />,
});

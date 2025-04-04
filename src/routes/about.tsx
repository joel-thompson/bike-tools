import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: () => (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">About Bike Tools</h1>
      <p>A collection of helpful tools for bicycle maintenance and setup.</p>
    </div>
  ),
});

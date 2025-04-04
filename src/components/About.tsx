import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

function About() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">About Bike Tools</h1>
      <p>A collection of helpful tools for bicycle maintenance and setup.</p>
      <div className="w-fit">
        <Button asChild variant="outline" size="lg">
          <a
            href="https://github.com/joel-thompson/bike-tools"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
            View on GitHub
          </a>
        </Button>
      </div>
    </div>
  );
}

export { About };

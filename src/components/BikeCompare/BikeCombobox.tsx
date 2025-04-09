import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import bikes from "@/bikes.json";

interface BikeComboboxProps {
  selectedBikeId: string;
  onSelect: (bikeId: string) => void;
  placeholder: string;
}

export const BikeCombobox = ({
  selectedBikeId,
  onSelect,
  placeholder,
}: BikeComboboxProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedBikeId
            ? bikes.bikes.find((bike) => bike.id === selectedBikeId)?.name
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command
          filter={(value, search) => {
            const bikeItem = bikes.bikes.find((bike) => bike.id === value);
            return bikeItem?.name.toLowerCase().includes(search.toLowerCase())
              ? 1
              : 0;
          }}
        >
          <CommandInput placeholder="Search bikes..." />
          <CommandList>
            <CommandEmpty>No bike found.</CommandEmpty>
            <CommandGroup>
              {bikes.bikes.map((bike) => (
                <CommandItem
                  key={bike.id}
                  value={bike.id}
                  onSelect={(currentValue) => {
                    onSelect(
                      currentValue === selectedBikeId ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedBikeId === bike.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {bike.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

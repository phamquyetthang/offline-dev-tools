import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@lib/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@lib/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@lib/components/ui/popover";

interface IOption {
  value: string;
  function: () => void;
}
interface ComboboxProps {
  optionsGroup: Array<{
    options: Array<IOption>;
    group: string;
  }>;
  onValueChange: (option: IOption) => void;
  placeholder?: string;
  defaultValue?: string;
}
export default function Combobox({
  optionsGroup,
  onValueChange,
  placeholder = "Select option...",
  defaultValue = "",
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);

  const onSelect = (currentValue: string, option: IOption) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
    onValueChange(option);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {optionsGroup.map((group) => (
              <CommandGroup heading={group.group}>
                {group.options.map((option) => (
                  <CommandItem
                    className="capitalize"
                    value={option.value}
                    onSelect={(v) => onSelect(v, option)}
                  >
                    {option.value}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

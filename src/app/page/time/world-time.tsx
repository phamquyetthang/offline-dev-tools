import { Button } from "@lib/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@lib/components/ui/card";
import clsx from "clsx";
import moment from "moment";
import { useState, Fragment } from "react";
import "moment-timezone";
import { Separator } from "@lib/components/ui/separator";
import { CheckIcon, ChevronDown, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@lib/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@lib/components/ui/command";
import { cn } from "@lib/utils";
import { Badge } from "@lib/components/ui/badge";

const WorldTime = () => {
  const [value, setValue] = useState(new Date());
  const [tzToAdd, setTzToAdd] = useState("America/Los_Angeles");
  const [zones, setZones] = useState(["America/Los_Angeles"]);

  const [hoverValue, setHoverValue] = useState(moment().hours());
  const onAddZone = () => {
    setZones((pre) => pre.concat(tzToAdd));
  };
  const onChange = (h: number) => {
    setValue(moment().hour(h).toDate());
  };

  const onHover = (h: number) => {
    setHoverValue(h);
  };
  return (
    <div className="overflow-x-auto">
      <h3 className="font-semibold mb-4">World Clocks Converter</h3>
      <Card className="mt-8 ">
        <CardHeader>
          <CardTitle>Your clock</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div>
              <div className="flex justify-between mb-2">
                <h4 className="font-semibold">
                  <Badge className="mr-1">{moment(value).format("Z")}</Badge>
                  {moment.tz.guess()}
                </h4>
                <Badge>{moment(value).format("LLL")}</Badge>
              </div>
              <HourPicker
                value={moment(value).hour()}
                onChange={onChange}
                hoverValue={hoverValue}
                onHover={onHover}
              />
            </div>
            <Separator />
            <Clock
              value={value}
              timeZone="UTC"
              onChange={onChange}
              hoverValue={hoverValue}
              onHover={onHover}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="mt-8 ">
        <CardHeader>
          <CardTitle>World clocks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 flex-col">
            {zones.map((z, i) => (
              <Fragment key={i}>
                <Clock
                  value={value}
                  timeZone={z}
                  onChange={onChange}
                  hoverValue={hoverValue}
                  onHover={onHover}
                />
                <Separator />
              </Fragment>
            ))}
            <div className="flex gap-4">
              <TimeZonePicker zone={tzToAdd} onChange={(v) => setTzToAdd(v)} />
              <Button onClick={onAddZone}>
                <Plus />
                Add timezone
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorldTime;

interface IHourPickerProps {
  value: number;
  start?: number;
  onChange?: (v: number) => void;
  onHover?: (v: number) => void;
  hoverValue?: number;
}
export const HourPicker = ({
  value,
  start = 0,
  onChange,
  hoverValue,
  onHover,
}: IHourPickerProps) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 24 }).map((_, h) => {
        const diff = start + h;
        const hour = diff > 23 ? diff - 24 : diff < 0 ? diff + 24 : diff;
        return (
          <Button
            variant="outline"
            className={clsx('hover:bg-yellow-200 dark:hover:bg-green-300',{
              "bg-yellow-200 dark:bg-green-300": hoverValue === h,
              "bg-yellow-300 dark:bg-green-400": value === h,
              "bg-blue-300 dark:bg-blue-300": moment().hours() === h,
              "border-l-slate-900 border-l-2": hour === 0,
              "border-r-slate-900 border-r-2": hour === 23,
            })}
            size="icon"
            key={h}
            onClick={() => onChange(h)}
            onMouseOver={() => onHover(h)}
          >
            {hour}
          </Button>
        );
      })}
    </div>
  );
};

interface IClockProps {
  value: Date;
  timeZone: string;
  onChange?: (v: number) => void;
  onHover?: (v: number) => void;
  hoverValue?: number;
}
const Clock = ({
  value,
  timeZone,
  onChange,
  hoverValue,
  onHover,
}: IClockProps) => {
  const start = moment().hour(0).tz(timeZone).hours();

  return (
    <div>
      <div className="flex justify-between mb-2">
        <h4 className="font-semibold">
          <Badge className="mr-1">
            {moment(value).tz(timeZone).format("Z")}{" "}
            {moment(value).tz(timeZone).format("z")}
          </Badge>
          {moment(value).tz(timeZone).tz()}
        </h4>
        <Badge>{moment(value).tz(timeZone).format("LLL")}</Badge>
      </div>
      <HourPicker
        value={moment(value).hour()}
        start={start}
        onChange={onChange}
        hoverValue={hoverValue}
        onHover={onHover}
      />
    </div>
  );
};

const allZones = moment.tz.names();

interface ITimeZonePickerProps {
  zone: string;
  onChange: (v: string) => void;
}
export function TimeZonePicker({ zone, onChange }: ITimeZonePickerProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(zone);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? allZones.find((timezone) => timezone === value)
            : "Select timezone..."}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search timezone..." className="h-9" />
          <CommandList>
            <CommandEmpty>No timezone found.</CommandEmpty>
            <CommandGroup>
              {allZones.map((timezone) => (
                <CommandItem
                  key={timezone}
                  value={timezone}
                  onSelect={() => {
                    setValue(timezone);
                    onChange(timezone);
                    setOpen(false);
                  }}
                >
                  {timezone}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === timezone ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

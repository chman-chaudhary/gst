import { cn } from "@/lib/utils";

const { Button } = require("@/components/ui/button");
const { Calendar } = require("@/components/ui/calendar");
const { Label } = require("@/components/ui/label");
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const { Textarea } = require("@/components/ui/textarea");
const { CalendarIcon } = require("lucide-react");
import { format } from "date-fns";
import RedStar from "../RedStart";
import { Input } from "@/components/ui/input";

const InputField = ({
  label,
  required = false,
  type = "text",
  value,
  onChange = () => {},
  disabled,
  inputClass,
  ...props
}) => {
  if (type === "date") {
    return (
      <div className="grid grid-cols-3 gap-3 items-start">
        <Label className="col-span-1 pt-1">
          {label}
          {required && <RedStar />}
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "col-span-2 w-full pl-3 text-left font-normal",
                !value && "text-muted-foreground"
              )}
            >
              {value ? format(value, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={onChange}
              disabled={(date) => date < new Date("1900-01-01")}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className="grid grid-cols-3 gap-3 items-start">
        <Label className="col-span-1 pt-1">
          {label}
          {required && <RedStar />}
        </Label>
        <Textarea
          disabled={disabled}
          readOnly={disabled}
          className={`${inputClass} col-span-2`}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3 items-start">
      <Label className="col-span-1 pt-1">
        {label}
        {required && <RedStar />}
      </Label>
      <Input
        type={type}
        min={0}
        readOnly={disabled}
        disabled={disabled}
        className={`${inputClass} col-span-2`}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default InputField;

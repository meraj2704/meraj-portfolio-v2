import React, { forwardRef } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface DatePickerProps {
  label: string;
  error?: { message?: string };
  required?: boolean;
  value?: Date | string;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
}

export const DatePickerField = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      label,
      error,
      required = false,
      value,
      onChange,
      placeholder = "Select a date",
    },
    ref,
  ) => {
    const [date, setDate] = React.useState<Date | undefined>(
      value ? new Date(value) : undefined,
    );

    React.useEffect(() => {
      if (value) {
        setDate(new Date(value));
      }
    }, [value]);

    const handleDateSelect = (selectedDate: Date | undefined) => {
      setDate(selectedDate);
      if (onChange) {
        onChange(selectedDate);
      }
    };

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <div>
          <label className="text-sm font-semibold text-primary-text">
            {label}
          </label>
          {required && <span className="text-red-500">*</span>}
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <button
              ref={ref}
              className={`
                w-full px-4 py-2.5 bg-gray-50 border rounded-xl outline-none transition-all
                flex items-center justify-between text-left
                ${
                  error
                    ? "border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
                }
                ${!date && "text-secondary-text/50"}
              `}
            >
              <span>{date ? format(date, "PPP") : placeholder}</span>
              <CalendarIcon className="h-4 w-4 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white text-black" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {error && (
          <span className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
            {error.message}
          </span>
        )}
      </div>
    );
  },
);

DatePickerField.displayName = "DatePickerField";

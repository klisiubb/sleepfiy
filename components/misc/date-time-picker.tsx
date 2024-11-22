"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

type DateTimePicker24hFormProps = {
  date: Date | undefined;
  setDate: (date: Date) => void;
};

export function DateTimePicker24hForm({
  date,
  setDate,
}: DateTimePicker24hFormProps) {
  const [selectedDate, setSelectedDate] = useState(date || new Date());

  // Updates the selectedDate's hour or minute
  const handleTimeChange = (type: "hour" | "minute", value: number) => {
    const newDate = new Date(selectedDate);
    if (type === "hour") {
      newDate.setHours(value);
    } else {
      newDate.setMinutes(value);
    }
    setSelectedDate(newDate);
    setDate(newDate); // Pass the updated date to the parent
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {date ? (
            format(date, "MM/dd/yyyy HH:mm")
          ) : (
            <span>Select date & time</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          {/* Calendar for selecting the date */}
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(day) => {
              if (day) {
                const newDate = new Date(selectedDate);
                newDate.setFullYear(day.getFullYear());
                newDate.setMonth(day.getMonth());
                newDate.setDate(day.getDate());
                setSelectedDate(newDate);
                setDate(newDate); // Pass the updated date to the parent
              }
            }}
            initialFocus
          />

          {/* Time pickers for selecting hour and minute */}
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            {/* Hour Picker */}
            <ScrollArea className="w-32 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                  <Button
                    key={hour}
                    size="icon"
                    variant={
                      selectedDate.getHours() === hour ? "default" : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange("hour", hour)}
                  >
                    {hour.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
            </ScrollArea>

            {/* Minute Picker */}
            <ScrollArea className="w-32 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={
                      selectedDate.getMinutes() === minute ? "default" : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange("minute", minute)}
                  >
                    {minute.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

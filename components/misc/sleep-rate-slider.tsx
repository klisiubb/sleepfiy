"use client";

import { Slider } from "@/components/ui/slider";
import { emojis, labels } from "@/lib/consts";

interface SleepRateSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function SleepRateSlider({
  value,
  onChange,
}: SleepRateSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Slider
          value={[value]}
          onValueChange={(val) => onChange(val[0])}
          min={1}
          max={5}
          showTooltip
          tooltipContent={(value) => labels[value - 1]}
          aria-label="Rate your experience"
        />
        <span className="text-2xl">{emojis[value - 1]}</span>
      </div>
    </div>
  );
}

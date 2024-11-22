"use client";

import { Textarea } from "@/components/ui/textarea";
import { useCharacterLimit } from "@/hooks/use-character-limit";
import { noteMaxLength } from "@/lib/consts";

interface SleepNoteTextareaProps {
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function SleepNoteTextarea({
  value,
  onChange,
}: SleepNoteTextareaProps) {
  const maxLength = noteMaxLength;
  const {
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({ maxLength });

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(e);
    onChange(e);
  };

  return (
    <div className="space-y-2">
      <Textarea
        id="textarea-16"
        value={value}
        maxLength={maxLength}
        onChange={handleTextareaChange}
        aria-describedby="characters-left-textarea"
      />
      <p
        id="characters-left-textarea"
        className="mt-2 text-right text-xs text-muted-foreground"
        role="status"
        aria-live="polite"
      >
        <span className="tabular-nums">{limit - characterCount}</span>{" "}
        characters left
      </p>
    </div>
  );
}

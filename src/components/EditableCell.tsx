
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface EditableCellProps {
  value: string;
  isEditing: boolean;
  onSave: (value: string) => void;
  onCancel: () => void;
}

const EditableCell = ({
  value,
  isEditing,
  onSave,
  onCancel,
}: EditableCellProps) => {
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSave(editValue);
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="h-full w-full relative">
        <Input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => onSave(editValue)}
          className="h-full border-blue-400 focus-visible:ring-blue-400"
        />
      </div>
    );
  }

  return (
    <div className={cn("cursor-pointer py-2 group h-full w-full relative")}>
      <span>{value}</span>
      <div className="absolute inset-0 bg-blue-100/0 group-hover:bg-blue-100/50 transition-colors" />
    </div>
  );
};

export default EditableCell;


import React from "react";
import { cn } from "@/lib/utils";

interface StatusBarProps {
  isEditing: boolean;
  message: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ isEditing, message }) => {
  return (
    <div
      className={cn(
        "py-2 px-4 text-sm transition-all",
        isEditing
          ? "bg-blue-50 text-blue-700 border-t border-blue-200"
          : "bg-transparent text-transparent h-0 py-0"
      )}
    >
      {isEditing && <span>{message}</span>}
    </div>
  );
};

export default StatusBar;

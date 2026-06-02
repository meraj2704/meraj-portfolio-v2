import { forwardRef } from "react";

interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: { message?: string };
  required?: boolean; // Added required to the interface
}

export const ToggleField = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, error, required, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="flex items-center gap-3 cursor-pointer group py-2 w-fit">
          <div className="relative">
            <input
              type="checkbox"
              ref={ref}
              required={required} // Pass to native input
              {...props}
              className="sr-only peer"
            />
            <div
              className={`
              w-11 h-6 rounded-full transition-all relative
              bg-gray-200 peer-checked:bg-primary 
              after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
              after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all 
              peer-checked:after:translate-x-5 
              group-hover:ring-4 group-hover:ring-primary/5
              ${error ? "ring-2 ring-red-500/20 border border-red-500" : "border border-transparent"}
            `}
            ></div>
          </div>

          <span className="text-sm font-medium text-secondary-text group-hover:text-primary-text transition-colors flex items-center gap-1">
            {label}
            {/* Visual indicator for required fields */}
            {required && <span className="text-red-500 font-bold">*</span>}
          </span>
        </label>

        {error && (
          <span className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
            {error.message}
          </span>
        )}
      </div>
    );
  },
);

ToggleField.displayName = "ToggleField";

import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: { message?: string };
  required?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required = false, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <div>
          <label className="text-sm font-semibold text-primary-text">
            {label}
          </label>
          {required && <span className="text-red-500">*</span>}
        </div>

        <input
          ref={ref}
          {...props}
          className={`
            w-full px-4 py-2.5 bg-gray-50 border rounded-xl outline-none transition-all
            placeholder:text-secondary-text/50
            ${
              error
                ? "border-red-500 focus:ring-4 focus:ring-red-100"
                : "border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
            }
          `}
        />
        {error && (
          <span className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
            {error.message}
          </span>
        )}
      </div>
    );
  },
);

InputField.displayName = "InputField";

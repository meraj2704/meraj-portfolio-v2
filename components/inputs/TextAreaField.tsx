import { forwardRef } from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: { message?: string };
  required?: boolean; // Added required to the interface
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, required, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-sm font-semibold text-primary-text flex items-center gap-1">
          {label}
          {/* Visual indicator for required fields */}
          {required && <span className="text-red-500 font-bold">*</span>}
        </label>
        <textarea
          ref={ref}
          {...props}
          required={required} // Pass to the native textarea element
          className={`
            w-full px-4 py-2.5 bg-gray-50 border rounded-xl outline-none transition-all resize-none min-h-[120px]
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

TextAreaField.displayName = "TextAreaField";

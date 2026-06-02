import { forwardRef } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string | number }[];
  error?: { message?: string };
  required?: boolean; // Add required to the interface
}

export const SelectField = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, required, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-sm font-semibold text-primary-text flex items-center gap-1">
          {label}
          {/* Visual indicator for required fields */}
          {required && <span className="text-red-500 font-bold">*</span>}
        </label>

        <div className="relative">
          <select
            ref={ref}
            {...props}
            required={required} // Pass it to the native select element
            className={`
              w-full px-4 py-2.5 bg-gray-50 border rounded-xl outline-none appearance-none transition-all cursor-pointer
              ${
                error
                  ? "border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
              }
            `}
          >
            {/* Optional: Add a placeholder option if not already present */}
            {!props.defaultValue && !props.value && (
              <option value="" disabled>
                Select an option
              </option>
            )}

            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Custom Arrow Icon */}
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-secondary-text">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2.5 4.5L6 8L9.5 4.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {error && (
          <span className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
            {error.message}
          </span>
        )}
      </div>
    );
  },
);

SelectField.displayName = "SelectField";

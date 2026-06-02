"use client";

import { forwardRef, useState, useMemo, useRef, useCallback } from "react";
import { Upload, X } from "lucide-react";

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: { message?: string };
  required?: boolean;
  defaultValue?: string | string[];
  onDeleteExisting?: (url: string) => void;
  maxSizeMB?: number;
}

interface ImagePreview {
  id: string;
  url: string;
  name: string;
  isExisting?: boolean;
  file?: File;
}

export const FileUploadField = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      label,
      error,
      required = false,
      multiple,
      defaultValue,
      onDeleteExisting,
      maxSizeMB,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<ImagePreview[]>([]);
    const [selectedFileSizes, setSelectedFileSizes] = useState<Record<string, number>>({});
    const [removedExistingUrls, setRemovedExistingUrls] = useState<string[]>([]);

    const limitMB = maxSizeMB ?? (multiple ? 50 : 10);
    const totalSelectedBytes = Object.values(selectedFileSizes).reduce((a, b) => a + b, 0);
    const totalSelectedMB = totalSelectedBytes / 1024 / 1024;
    const exceedsLimit = totalSelectedMB > limitMB;

    // Combined ref: sets both our internal ref and RHF's forwarded ref
    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as { current: HTMLInputElement | null }).current = node;
      },
      [ref],
    );

    const existingPreviews = useMemo(() => {
      if (!defaultValue) return [];
      const urls = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      return urls
        .filter(Boolean)
        .filter((url) => !removedExistingUrls.includes(url))
        .map((url, index) => ({
          id: `existing-${index}`,
          url,
          name: "Existing Image",
          isExisting: true,
        }));
    }, [defaultValue, removedExistingUrls]);

    const allPreviews = [...existingPreviews, ...selectedFiles];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      const fileArray = Array.from(files).filter((file) =>
        file.type.startsWith("image/"),
      );
      const newPreviews: ImagePreview[] = fileArray.map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        url: URL.createObjectURL(file),
        name: file.name,
        isExisting: false,
        file,
      }));
      const newSizes: Record<string, number> = {};
      fileArray.forEach((file, i) => {
        newSizes[newPreviews[i].id] = file.size;
      });

      if (!multiple) {
        selectedFiles.forEach((f) => URL.revokeObjectURL(f.url));
        setSelectedFiles(newPreviews);
        setSelectedFileSizes(newSizes);
      } else {
        setSelectedFiles((prev) => [...prev, ...newPreviews]);
        setSelectedFileSizes((prev) => ({ ...prev, ...newSizes }));
      }

      if (props.onChange) props.onChange(e);
    };

    const removeImage = (
      id: string,
      url: string,
      isExisting: boolean | undefined,
      e: React.MouseEvent,
    ) => {
      e.preventDefault();

      if (isExisting) {
        setRemovedExistingUrls((prev) => [...prev, url]);
        if (onDeleteExisting) onDeleteExisting(url);
      } else {
        const fileToRemove = selectedFiles.find((f) => f.id === id);
        if (!fileToRemove) return;

        URL.revokeObjectURL(fileToRemove.url);
        const remaining = selectedFiles.filter((item) => item.id !== id);
        setSelectedFiles(remaining);
        setSelectedFileSizes((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });

        // Update the actual <input> FileList so RHF sees the correct files on submit
        if (inputRef.current) {
          const dt = new DataTransfer();
          remaining.forEach((f) => {
            if (f.file) dt.items.add(f.file);
          });
          inputRef.current.files = dt.files;
          if (props.onChange) {
            props.onChange({
              target: inputRef.current,
              currentTarget: inputRef.current,
            } as React.ChangeEvent<HTMLInputElement>);
          }
        }
      }
    };

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-sm font-semibold text-primary-text flex items-center gap-1">
          {label}
          {required && <span className="text-red-500 font-bold">*</span>}
        </label>

        <div
          className={`
            relative border-2 border-dashed rounded-2xl p-6 transition-all group cursor-pointer text-center
            ${exceedsLimit ? "border-red-400 bg-red-50/40" : error ? "border-red-300 bg-red-50/30" : "border-gray-200 hover:border-primary hover:bg-primary/5 bg-gray-50/50"}
          `}
        >
          <input
            type="file"
            multiple={multiple}
            {...props}
            ref={setRefs}
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
              <Upload
                size={20}
                className="text-secondary-text group-hover:text-primary"
              />
            </div>
            <p className="text-xs font-medium text-secondary-text group-hover:text-primary">
              {multiple
                ? "Upload multiple images"
                : "Click to upload or drag and drop"}
            </p>
            <p className="text-[10px] text-secondary-text">
              {multiple ? "Multiple images" : "Single image"} &mdash; max <strong>{limitMB} MB</strong> total
            </p>
          </div>
        </div>

        {totalSelectedBytes > 0 && (
          <p className={`text-[10px] font-medium mt-1 ${exceedsLimit ? "text-red-500" : "text-secondary-text"}`}>
            Selected: {totalSelectedMB.toFixed(1)} MB{exceedsLimit ? ` — exceeds ${limitMB} MB limit` : ` / ${limitMB} MB max`}
          </p>
        )}

        {allPreviews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
            {allPreviews.map((preview) => (
              <div
                key={preview.id}
                className="relative group aspect-square rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm"
              >
                <img
                  src={preview.url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={(e) =>
                      removeImage(preview.id, preview.url, preview.isExisting, e)
                    }
                    className="p-1.5 bg-white rounded-full text-red-500 hover:bg-red-50 transition-colors shadow-lg"
                  >
                    <X size={14} />
                  </button>
                </div>
                {preview.isExisting && (
                  <div className="absolute top-1 left-1 bg-blue-600 text-[8px] text-white px-1.5 py-0.5 rounded-md uppercase font-bold">
                    Current
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {error && (
          <span className="text-xs font-medium text-red-500 mt-1">
            {error.message}
          </span>
        )}
      </div>
    );
  },
);

FileUploadField.displayName = "FileUploadField";

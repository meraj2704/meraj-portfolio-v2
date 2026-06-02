"use client";

import React from "react";
import dynamic from "next/dynamic";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import "react-quill-new/dist/quill.snow.css";
import { cn } from "@/lib/utils";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface EditorFieldProps<T extends FieldValues> {
  name: Path<T>; // 2. Use Path<T> to ensure 'name' matches your Schema keys‰
  label: string;
  control: Control<T>;
  error?: FieldError;
  placeholder?: string;
  required?: boolean;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "clean"],
  ],
};

// 4. Update the component signature to use the generic T
export const EditorField = <T extends FieldValues>({
  name,
  label,
  control,
  error,
  placeholder,
  required = false,
}: EditorFieldProps<T>) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-primary-text flex items-center gap-1">
        {label}
        {required && <span className="text-red-500 font-bold">*</span>}
      </label>

      <div
        className={cn(
          "rounded-xl overflow-hidden border transition-all bg-gray-50",
          error
            ? "border-red-500 ring-4 ring-red-100"
            : "border-gray-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10",
        )}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <ReactQuill
              theme="snow"
              value={field.value || ""}
              onChange={field.onChange}
              placeholder={placeholder}
              modules={modules}
              className="bg-gray-50 text-primary-text"
            />
          )}
        />
      </div>

      {error?.message && (
        <span className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
          {error.message}
        </span>
      )}

      <style jsx global>{`
        .ql-toolbar.ql-snow {
          border: none !important;
          border-bottom: 1px solid #f3f4f6 !important;
          background: #f9fafb;
        }
        .ql-container.ql-snow {
          border: none !important;
          min-height: 200px;
          font-family: inherit;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

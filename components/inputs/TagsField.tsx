"use client";

import React, { useState } from "react";

interface TagsFieldProps {
  label: string;
  required?: boolean;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagsField({
  label,
  required = false,
  value,
  onChange,
  placeholder = "Type and press Enter…",
}: TagsFieldProps) {
  const [draft, setDraft] = useState("");

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag) return;
    if (value.some((t) => t.toLowerCase() === tag.toLowerCase())) {
      setDraft("");
      return;
    }
    onChange([...value, tag]);
    setDraft("");
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(draft);
    } else if (e.key === "Backspace" && draft === "" && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div>
        <label className="text-sm font-semibold text-primary-text">
          {label}
        </label>
        {required && <span className="text-red-500">*</span>}
      </div>

      <div className="flex w-full flex-wrap items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
        {value.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-2 py-1 text-sm font-medium text-primary"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(i)}
              className="text-primary/60 transition-colors hover:text-primary"
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(draft)}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[8rem] bg-transparent py-0.5 outline-none placeholder:text-secondary-text/50"
        />
      </div>
    </div>
  );
}

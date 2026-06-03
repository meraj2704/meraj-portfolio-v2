"use client";

import { ImageField, type UploadedImage } from "./ImageField";
import { MultiImageField } from "./MultiImageField";
import { InputField } from "@/components/inputs/InputField";
import { TextAreaField } from "@/components/inputs/TextAreaField";
import { RichTextField } from "@/components/inputs/RichTextField";
import { ToggleField } from "@/components/inputs/ToggleField";
import { SelectField } from "@/components/inputs/SelectField";
import type { Field } from "./resource-types";

export function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (field.type === "image") {
    return (
      <ImageField
        label={field.label}
        required={field.required}
        value={(value as UploadedImage) ?? null}
        onChange={onChange}
        folder={field.folder}
      />
    );
  }
  if (field.type === "gallery") {
    return (
      <MultiImageField
        label={field.label}
        required={field.required}
        value={(value as UploadedImage[]) ?? []}
        onChange={onChange}
        folder={field.folder}
      />
    );
  }
  if (field.type === "textarea") {
    return (
      <TextAreaField
        label={field.label}
        required={field.required}
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  if (field.type === "richtext") {
    return (
      <RichTextField
        label={field.label}
        required={field.required}
        value={(value as string) ?? ""}
        onChange={onChange}
      />
    );
  }
  if (field.type === "boolean") {
    return (
      <ToggleField
        label={field.label}
        required={field.required}
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
      />
    );
  }
  if (field.type === "select") {
    return (
      <SelectField
        label={field.label}
        required={field.required}
        options={field.options ?? []}
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  if (field.type === "number") {
    return (
      <InputField
        label={field.label}
        required={field.required}
        type="number"
        value={(value as number) ?? 0}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    );
  }
  if (field.type === "tags") {
    const arr = Array.isArray(value) ? (value as string[]) : [];
    return (
      <InputField
        label={`${field.label} (comma separated)`}
        value={arr.join(", ")}
        onChange={(e) =>
          onChange(
            e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          )
        }
      />
    );
  }
  return (
    <InputField
      label={field.label}
      required={field.required}
      type="text"
      value={(value as string) ?? ""}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

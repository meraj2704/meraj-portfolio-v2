export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "number"
  | "boolean"
  | "image"
  | "gallery"
  | "tags"
  | "select";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  folder?: string;
  options?: { label: string; value: string | number }[];
};

export type Item = Record<string, unknown> & { _id?: string };
export type Row = Item & { id: string };

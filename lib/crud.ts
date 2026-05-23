import "server-only";
import type { Model } from "mongoose";
import type { ZodType } from "zod";
import { connectDB } from "./db";
import { requireAdmin } from "./dal";
import { handleError, jsonError, jsonOk, parseJson } from "./api";

type Options = {
  publicRead?: boolean;
  defaultSort?: Record<string, 1 | -1>;
};

export function makeCollectionHandlers<T>(
  ModelRef: Model<T>,
  schema: ZodType<Partial<T>>,
  opts: Options = {}
) {
  const { publicRead = true, defaultSort = { order: 1, createdAt: -1 } } = opts;

  return {
    async GET() {
      try {
        if (!publicRead) {
          const unauthorized = await requireAdmin();
          if (unauthorized) return unauthorized;
        }
        await connectDB();
        const docs = await ModelRef.find().sort(defaultSort).lean();
        return jsonOk(docs);
      } catch (err) {
        return handleError(err);
      }
    },
    async POST(req: Request) {
      try {
        const unauthorized = await requireAdmin();
        if (unauthorized) return unauthorized;
        const parsed = await parseJson(req, schema);
        if (!parsed.ok) return parsed.response;
        await connectDB();
        const doc = await ModelRef.create(parsed.data);
        return jsonOk(doc, 201);
      } catch (err) {
        return handleError(err);
      }
    },
  };
}

export function makeItemHandlers<T>(
  ModelRef: Model<T>,
  schema: ZodType<Partial<T>>,
  opts: { publicRead?: boolean; onDelete?: (doc: T) => Promise<void> } = {}
) {
  const { publicRead = true, onDelete } = opts;

  return {
    async GET(_req: Request, params: { id: string }) {
      try {
        if (!publicRead) {
          const unauthorized = await requireAdmin();
          if (unauthorized) return unauthorized;
        }
        await connectDB();
        const doc = await ModelRef.findById(params.id).lean();
        if (!doc) return jsonError("Not found", 404);
        return jsonOk(doc);
      } catch (err) {
        return handleError(err);
      }
    },
    async PATCH(req: Request, params: { id: string }) {
      try {
        const unauthorized = await requireAdmin();
        if (unauthorized) return unauthorized;
        const parsed = await parseJson(req, schema);
        if (!parsed.ok) return parsed.response;
        await connectDB();
        const doc = await ModelRef.findByIdAndUpdate(params.id, parsed.data, {
          new: true,
          runValidators: true,
        }).lean();
        if (!doc) return jsonError("Not found", 404);
        return jsonOk(doc);
      } catch (err) {
        return handleError(err);
      }
    },
    async DELETE(_req: Request, params: { id: string }) {
      try {
        const unauthorized = await requireAdmin();
        if (unauthorized) return unauthorized;
        await connectDB();
        const doc = await ModelRef.findByIdAndDelete(params.id).lean();
        if (!doc) return jsonError("Not found", 404);
        if (onDelete) await onDelete(doc as T);
        return jsonOk({ id: params.id });
      } catch (err) {
        return handleError(err);
      }
    },
  };
}

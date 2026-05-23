import "server-only";
import { ZodError, type ZodType } from "zod";

export function jsonOk<T>(data: T, status = 200) {
  return Response.json({ data }, { status });
}

export function jsonError(message: string, status = 400, extra?: unknown) {
  return Response.json({ error: message, details: extra }, { status });
}

export async function parseJson<T>(req: Request, schema: ZodType<T>): Promise<
  | { ok: true; data: T }
  | { ok: false; response: Response }
> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return { ok: false, response: jsonError("Invalid JSON body", 400) };
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return {
      ok: false,
      response: jsonError("Validation failed", 422, (parsed.error as ZodError).flatten()),
    };
  }
  return { ok: true, data: parsed.data };
}

export function handleError(err: unknown) {
  console.error(err);
  const message = err instanceof Error ? err.message : "Internal Server Error";
  return jsonError(message, 500);
}

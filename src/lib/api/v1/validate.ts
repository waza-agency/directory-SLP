import { z } from 'zod';

export const paginationSchema = z.object({
  limit: z
    .string()
    .optional()
    .default('20')
    .pipe(
      z.coerce
        .number()
        .int()
        .min(1)
        .transform((n) => Math.min(n, 100))
    ),
});

export const eventsQuerySchema = paginationSchema.extend({
  category: z.string().optional(),
  from: z.string().datetime({ offset: true }).optional(),
  to: z.string().datetime({ offset: true }).optional(),
});

export const placesQuerySchema = paginationSchema.extend({
  category: z.string().optional(),
  sort: z.enum(['newest', 'rating', 'name']).optional().default('newest'),
});

export const guidesQuerySchema = paginationSchema.extend({
  tag: z.string().optional(),
});

export const newsQuerySchema = paginationSchema.extend({
  lang: z.enum(['en', 'es', 'de', 'ja']).optional().default('en'),
});

export const searchQuerySchema = paginationSchema.extend({
  q: z.string().min(2, 'Query must be at least 2 characters'),
  type: z
    .enum(['events', 'places', 'guides', 'outdoor', 'culture', 'all'])
    .optional()
    .default('all'),
});

interface ParseSuccess<T> {
  success: true;
  data: T;
}

interface ParseFailure {
  success: false;
  error: string;
}

export function parseQuery<T>(
  schema: z.ZodSchema<T>,
  query: Record<string, unknown>
): ParseSuccess<T> | ParseFailure {
  const result = schema.safeParse(query);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const message = result.error.issues.map((i) => i.message).join('; ');
  return { success: false, error: message };
}

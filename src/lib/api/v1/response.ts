import type { NextApiResponse } from 'next';

interface ApiMeta {
  total: number;
  limit: number;
}

interface ApiSuccessResponse {
  ok: true;
  data: unknown;
  meta?: ApiMeta;
  source: string;
}

interface ApiErrorResponse {
  ok: false;
  error: { code: string; message: string };
  source: string;
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

export function apiSuccess(data: unknown, meta?: ApiMeta): ApiSuccessResponse {
  const response: ApiSuccessResponse = {
    ok: true,
    data,
    source: 'sanluisway.com',
  };
  if (meta) response.meta = meta;
  return response;
}

export function apiError(code: string, message: string): ApiErrorResponse {
  return {
    ok: false,
    error: { code, message },
    source: 'sanluisway.com',
  };
}

export function setCacheHeaders(res: NextApiResponse, maxAge = 300): void {
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 2}`
  );
}

export function methodNotAllowed(res: NextApiResponse): void {
  res.setHeader('Allow', 'GET');
  res.status(405).json(apiError('METHOD_NOT_ALLOWED', 'Only GET is allowed'));
}

/**
 * Utility helper to resolve paths with Astro's `base` setting.
 * Supports running at root ('/') or under a subpath (e.g. '/sinyalai-news/').
 */
export function withBase(path: string = ''): string {
  const rawBase = (import.meta.env.BASE_URL ?? '/').trim();
  const base = rawBase.replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  if (!cleanPath || cleanPath === '/') {
    return base ? `${base}/` : '/';
  }

  return `${base}${cleanPath}`;
}

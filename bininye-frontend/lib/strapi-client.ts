import { strapi as createStrapiClient } from "@strapi/client";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Attention : ce token doit être utilisé uniquement côté serveur (Server Components, route handlers, etc.)
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// Client Strapi officiel avec authentification (pour les données protégées)
export const strapiClient = createStrapiClient({
  baseURL: `${STRAPI_URL.replace(/\/$/, "")}/api`,
  auth: STRAPI_API_TOKEN,
});

// Client Strapi public sans authentification (pour les formulaires publics)
// Utilise les permissions du rôle "Public" configurées dans Strapi
export const strapiPublicClient = createStrapiClient({
  baseURL: `${STRAPI_URL.replace(/\/$/, "")}/api`,
});

export type StrapiFetchOptions = RequestInit & {
  /** Ajoute automatiquement /api devant le path si true (par défaut) */
  useApiPrefix?: boolean;
  /** Forcer ou désactiver l'envoi du token d'auth (par défaut: true si STRAPI_API_TOKEN est défini) */
  withAuth?: boolean;
};

export function getStrapiUrl(path: string = ""): string {
  const base = STRAPI_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function fetchStrapi<T = unknown>(
  path: string,
  options: StrapiFetchOptions = {},
): Promise<T> {
  const { useApiPrefix = true, headers, withAuth = true, ...rest } = options;

  const url = getStrapiUrl(`${useApiPrefix ? "/api" : ""}${path.startsWith("/") ? path : `/${path}`}`);

  const authHeaders: HeadersInit = STRAPI_API_TOKEN && withAuth
    ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
    : {};

  const res = await fetch(url, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...(headers || {}),
    },
    // Par défaut, on laisse Next décider du cache; on ajustera par page (revalidate, no-store, ...)
  });

  if (!res.ok) {
    // On jette une erreur explicite pour faciliter le debug côté pages
    const text = await res.text().catch(() => "");
    throw new Error(`Strapi fetch failed (${res.status} ${res.statusText}) for ${url}: ${text}`);
  }

  return (await res.json()) as T;
}

/**
 * Helper pour transformer une URL media Strapi potentiellement relative en URL absolue.
 */
export function getStrapiMediaUrl(url?: string | null): string | null {
  if (!url) return null;
  // Si c'est déjà une URL absolue, on la retourne telle quelle
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return getStrapiUrl(url);
}

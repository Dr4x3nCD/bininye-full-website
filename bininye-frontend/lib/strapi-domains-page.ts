import { strapiClient, getStrapiMediaUrl } from "@/lib/strapi-client";

export interface StrapiMedia {
    documentId: string;
    id: number;
    name: string;
    alternativeText?: string;
    url: string;
}

export interface DomainsPageData {
    documentId: string;
    id: number;
    heroTitle?: string;
    heroSubtitle?: string;
    heroBackground?: StrapiMedia;
    introTitle?: string;
    introText?: string;
    ctaTitle?: string;
    ctaText?: string;
    ctaPrimaryLabel?: string;
    ctaPrimaryUrl?: string;
    ctaSecondaryLabel?: string;
    ctaSecondaryUrl?: string;
}

export interface DomainsPageView {
    heroTitle: string;
    heroSubtitle: string;
    heroBackgroundUrl: string | null;
    introTitle: string;
    introText: string;
    ctaTitle: string;
    ctaText: string;
    ctaPrimaryLabel: string;
    ctaPrimaryUrl: string;
    ctaSecondaryLabel: string;
    ctaSecondaryUrl: string;
}

interface DocumentResponse<T> {
    data: T | null;
    meta?: Record<string, unknown>;
}

const PLACEHOLDER_TEXT = (field: string) => `[Donnée non récupérée: ${field}]`;

export async function fetchDomainsPage(): Promise<DomainsPageView> {
    try {
        const res = (await strapiClient.single("domains-page").find({
            populate: ["heroBackground"],
        })) as unknown as DocumentResponse<DomainsPageData>;

        if (!res.data) {
            return getDefaultDomainsPage();
        }

        const doc = res.data;
        return {
            heroTitle: doc.heroTitle || PLACEHOLDER_TEXT("heroTitle"),
            heroSubtitle: doc.heroSubtitle || PLACEHOLDER_TEXT("heroSubtitle"),
            heroBackgroundUrl: doc.heroBackground ? (getStrapiMediaUrl(doc.heroBackground.url) ?? null) : null,
            introTitle: doc.introTitle || PLACEHOLDER_TEXT("introTitle"),
            introText: doc.introText || PLACEHOLDER_TEXT("introText"),
            ctaTitle: doc.ctaTitle || PLACEHOLDER_TEXT("ctaTitle"),
            ctaText: doc.ctaText || PLACEHOLDER_TEXT("ctaText"),
            ctaPrimaryLabel: doc.ctaPrimaryLabel || PLACEHOLDER_TEXT("ctaPrimaryLabel"),
            ctaPrimaryUrl: doc.ctaPrimaryUrl || "/contribuer",
            ctaSecondaryLabel: doc.ctaSecondaryLabel || PLACEHOLDER_TEXT("ctaSecondaryLabel"),
            ctaSecondaryUrl: doc.ctaSecondaryUrl || "/contact",
        };
    } catch (error) {
        console.error("❌ Error fetching domains page:", error);
        return getDefaultDomainsPage();
    }
}

function getDefaultDomainsPage(): DomainsPageView {
    return {
        heroTitle: PLACEHOLDER_TEXT("heroTitle"),
        heroSubtitle: PLACEHOLDER_TEXT("heroSubtitle"),
        heroBackgroundUrl: null,
        introTitle: PLACEHOLDER_TEXT("introTitle"),
        introText: PLACEHOLDER_TEXT("introText"),
        ctaTitle: PLACEHOLDER_TEXT("ctaTitle"),
        ctaText: PLACEHOLDER_TEXT("ctaText"),
        ctaPrimaryLabel: PLACEHOLDER_TEXT("ctaPrimaryLabel"),
        ctaPrimaryUrl: "/contribuer",
        ctaSecondaryLabel: PLACEHOLDER_TEXT("ctaSecondaryLabel"),
        ctaSecondaryUrl: "/contact",
    };
}

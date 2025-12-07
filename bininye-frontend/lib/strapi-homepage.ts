import { strapiClient, getStrapiMediaUrl } from "./strapi-client";

// Types pour la Homepage depuis Strapi
export interface StrapiMedia {
    documentId: string;
    id: number;
    name: string;
    alternativeText?: string;
    caption?: string;
    url: string;
    formats?: any;
}

export interface StrapiValue {
    iconKey?: string;
    title: string;
}

export interface StrapiStat {
    label: string;
    number: string;
    iconKey?: string;
}

export interface StrapiActivityCategory {
    documentId: string;
    id: number;
    name: string;
    slug: string;
}

export interface StrapiActivity {
    documentId: string;
    id: number;
    title: string;
    slug: string;
    description?: string;
    date?: string;
    location?: string;
    activityStatus?: "upcoming" | "past";
    participantsLabel?: string;
    category?: StrapiActivityCategory;
    image?: StrapiMedia;
    tags?: Array<{ label: string }>;
    objectives?: Array<{ text: string }>;
}

export interface StrapiMediaItem {
    documentId: string;
    id: number;
    title: string;
    type: "photo" | "video";
    category?: string;
    date?: string;
    videoUrl?: string;
    thumbnail?: StrapiMedia;
}

export interface StrapiPartner {
    documentId: string;
    id: number;
    name: string;
    order?: number;
    websiteUrl?: string;
    logo?: StrapiMedia;
}

export interface StrapiDomain {
    documentId: string;
    id: number;
    title: string;
    slug: string;
    shortDescription?: string;
    iconKey?: string;
    themeColor?: string;
}

export interface HomepageData {
    documentId: string;
    id: number;
    // Hero Section
    heroTitle?: string;
    heroSubtitle?: string;
    heroDescription?: string;
    heroPrimaryCtaLabel?: string;
    heroPrimaryCtaUrl?: string;
    heroSecondaryCtaLabel?: string;
    heroSecondaryCtaUrl?: string;
    heroBackground?: StrapiMedia;
    // Values Section
    valuesTitle?: string;
    valuesIntro?: string;
    values?: StrapiValue[];
    // About Section
    aboutTitle?: string;
    aboutIntro?: string;
    aboutMissionTitle?: string;
    aboutMissionDescription?: string;
    aboutMissions?: StrapiValue[];
    aboutMainStats?: StrapiStat[];
    aboutImage1?: StrapiMedia;
    aboutImage2?: StrapiMedia;
    aboutCtaLabel?: string;
    aboutCtaUrl?: string;
    // Domains Section
    domainsTitle?: string;
    domainsSubtitle?: string;
    domainsDescription?: string;
    domainsImage?: StrapiMedia;
    highlightedDomains?: StrapiDomain[];
    domainsCtaLabel?: string;
    domainsCtaUrl?: string;
    // Events Section
    eventsTitle?: string;
    eventsSubtitle?: string;
    highlightedEvents?: StrapiActivity[];
    // Contribute Section
    contributeTitle?: string;
    contributeSubtitle?: string;
    contributeDescription?: string;
    contributeStats?: StrapiStat[];
    contributePrimaryCtaLabel?: string;
    contributePrimaryCtaUrl?: string;
    contributeSecondaryCtaLabel?: string;
    contributeSecondaryCtaUrl?: string;
    // Gallery Section
    galleryTitle?: string;
    gallerySubtitle?: string;
    galleryHighlightMedia?: StrapiMediaItem[];
    // Partners Section
    partnersTitle?: string;
    partnersSubtitle?: string;
    highlightedPartners?: StrapiPartner[];
}

// Strapi 5 Document Response format
export interface DocumentResponse<T> {
    data: T | null;
    meta?: Record<string, unknown>;
}

/**
 * Récupère les données de la homepage depuis Strapi avec le SDK client
 */
export async function getHomepage(): Promise<HomepageData | null> {
    try {
        console.log("🔄 Fetching homepage data from Strapi...");

        const response = (await strapiClient.single("homepage").find({
            populate: [
                "heroBackground",
                "values",
                "aboutMainStats",
                "aboutMissions",
                "aboutImage1",
                "aboutImage2",
                "highlightedDomains",
                "domainsImage",
                "highlightedEvents.image",
                "highlightedEvents.category",
                "contributeStats",
                "galleryHighlightMedia.thumbnail",
                "highlightedPartners.logo",
            ],
        })) as unknown as DocumentResponse<HomepageData>;

        console.log("✅ Homepage data received:", response.data ? "Data loaded" : "No data");

        if (response.data) {
            console.log("📊 Homepage data preview:", {
                heroTitle: response.data.heroTitle,
                eventsCount: response.data.highlightedEvents?.length || 0,
                partnersCount: response.data.highlightedPartners?.length || 0,
                galleryCount: response.data.galleryHighlightMedia?.length || 0,
                domainsCount: response.data.highlightedDomains?.length || 0,
            });
        }

        return response.data;
    } catch (error) {
        console.error("❌ Error fetching homepage data from Strapi:", error);
        return null;
    }
}

/**
 * Helper pour obtenir l'URL complète d'une image Strapi
 */
export function getMediaUrl(media?: StrapiMedia | null): string | null {
    if (!media?.url) return null;
    return getStrapiMediaUrl(media.url);
}

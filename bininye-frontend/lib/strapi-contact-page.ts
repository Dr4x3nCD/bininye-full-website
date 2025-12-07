import { strapiClient, getStrapiMediaUrl } from "@/lib/strapi-client";

const PLACEHOLDER_TEXT = (field: string) => `[Donnée non récupérée: ${field}]`;

export interface StrapiMedia {
    documentId?: string;
    id?: number;
    name?: string;
    alternativeText?: string;
    url: string;
}

export interface StrapiContactInfo {
    address?: string;
    email?: string;
    hours?: string;
    phone?: string;
    whatsapp?: string;
}

export interface StrapiFaqItem {
    id?: number;
    question: string;
    answer: string;
}

export interface StrapiContactOption {
    id?: number;
    title: string;
    description?: string;
    iconKey?: string;
    ctaLabel?: string;
    ctaUrl?: string;
}

export interface ContactPageDocument {
    documentId: string;
    id: number;
    heroTitle?: string;
    heroSubtitle?: string;
    heroBackground?: StrapiMedia;
    contactInfo?: StrapiContactInfo;
    faq?: StrapiFaqItem[];
    options?: StrapiContactOption[];
    mapEmbedUrl?: string;
}

export interface ContactPageView {
    heroTitle: string;
    heroSubtitle: string;
    heroBackgroundUrl: string | null;
    contactInfo: {
        address: string;
        email: string;
        hours: string;
        phone: string;
        whatsapp: string;
    };
    faq: Array<{
        id?: number;
        question: string;
        answer: string;
    }>;
    options: Array<{
        id?: number;
        title: string;
        description: string;
        iconKey: string;
        ctaLabel: string;
        ctaUrl: string;
    }>;
    mapEmbedUrl: string;
}

interface DocumentResponse<T> {
    data: T | null;
    meta?: Record<string, unknown>;
}

export async function fetchContactPage(): Promise<ContactPageView> {
    try {
        const res = (await strapiClient.single("contact-page").find({
            populate: [
                "heroBackground",
                "contactInfo",
                "faq",
                "options",
            ],
        })) as unknown as DocumentResponse<ContactPageDocument>;

        if (!res.data) {
            return getDefaultContactPage();
        }

        const doc = res.data;

        return {
            heroTitle: doc.heroTitle || PLACEHOLDER_TEXT("heroTitle"),
            heroSubtitle: doc.heroSubtitle || PLACEHOLDER_TEXT("heroSubtitle"),
            heroBackgroundUrl: doc.heroBackground ? (getStrapiMediaUrl(doc.heroBackground.url) ?? null) : null,
            contactInfo: {
                address: doc.contactInfo?.address || PLACEHOLDER_TEXT("address"),
                email: doc.contactInfo?.email || PLACEHOLDER_TEXT("email"),
                hours: doc.contactInfo?.hours || PLACEHOLDER_TEXT("hours"),
                phone: doc.contactInfo?.phone || PLACEHOLDER_TEXT("phone"),
                whatsapp: doc.contactInfo?.whatsapp || PLACEHOLDER_TEXT("whatsapp"),
            },
            faq: (doc.faq ?? []).map(item => ({
                id: item.id,
                question: item.question || PLACEHOLDER_TEXT("question"),
                answer: item.answer || PLACEHOLDER_TEXT("answer"),
            })),
            options: (doc.options ?? []).map(opt => ({
                id: opt.id,
                title: opt.title || PLACEHOLDER_TEXT("title"),
                description: opt.description || PLACEHOLDER_TEXT("description"),
                iconKey: opt.iconKey || "message-circle",
                ctaLabel: opt.ctaLabel || PLACEHOLDER_TEXT("ctaLabel"),
                ctaUrl: opt.ctaUrl || "#",
            })),
            mapEmbedUrl: doc.mapEmbedUrl || PLACEHOLDER_TEXT("mapEmbedUrl"),
        };
    } catch (error) {
        console.error("❌ Error fetching contact page:", error);
        return getDefaultContactPage();
    }
}

function getDefaultContactPage(): ContactPageView {
    return {
        heroTitle: PLACEHOLDER_TEXT("heroTitle"),
        heroSubtitle: PLACEHOLDER_TEXT("heroSubtitle"),
        heroBackgroundUrl: null,
        contactInfo: {
            address: PLACEHOLDER_TEXT("address"),
            email: PLACEHOLDER_TEXT("email"),
            hours: PLACEHOLDER_TEXT("hours"),
            phone: PLACEHOLDER_TEXT("phone"),
            whatsapp: PLACEHOLDER_TEXT("whatsapp"),
        },
        faq: [],
        options: [],
        mapEmbedUrl: PLACEHOLDER_TEXT("mapEmbedUrl"),
    };
}

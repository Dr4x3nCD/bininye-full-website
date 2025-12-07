import { strapiClient, getStrapiMediaUrl } from "@/lib/strapi-client";

const PLACEHOLDER_TEXT = (field: string) => `[Donnée non récupérée: ${field}]`;

// Types for components
export interface StrapiMedia {
    documentId?: string;
    id?: number;
    name?: string;
    alternativeText?: string;
    url: string;
}

export interface StrapiStatItem {
    number: string;
    label: string;
}

export interface StrapiJoinBenefit {
    title: string;
    description: string;
    iconKey?: string;
}

export interface StrapiMicroTestimonial {
    quote: string;
    personName: string;
    personRole?: string;
    image?: StrapiMedia;
}

export interface StrapiTag {
    id?: number;
    label: string;
}

export interface StrapiJoinOpportunity {
    documentId?: string;
    id?: number;
    title: string;
    type?: string;
    tags?: StrapiTag[];
    image?: StrapiMedia;
    description?: string;
}

export interface StrapiProcessStep {
    title: string;
    description: string;
    iconKey?: string;
}

export interface StrapiTeamMember {
    documentId: string;
    id: number;
    name: string;
    role?: string;
    bio?: string;
    image?: StrapiMedia;
}

export interface JoinPageDocument {
    documentId: string;
    id: number;
    heroTitle?: string;
    heroSubtitle?: string;
    heroBackground?: StrapiMedia;
    heroPrimaryCtaLabel?: string;
    heroSecondaryCtaLabel?: string;
    heroBadgeText?: string;
    heroStats?: StrapiStatItem[];
    whyJoinTitle?: string;
    whyJoinIntro?: string;
    benefits?: StrapiJoinBenefit[];
    microTestimonial?: StrapiMicroTestimonial;
    opportunitiesSectionTitle?: string;
    opportunitiesSectionSubtitle?: string;
    opportunities?: StrapiJoinOpportunity[];
    volunteersSectionTitle?: string;
    volunteersSectionSubtitle?: string;
    featuredVolunteers?: StrapiTeamMember[] | { data: StrapiTeamMember[] };
    processTitle?: string;
    processSubtitle?: string;
    steps?: StrapiProcessStep[];
    applicationIntroTitle?: string;
    applicationIntroText?: string;
}

export interface JoinPageView {
    heroTitle: string;
    heroSubtitle: string;
    heroBackgroundUrl: string | null;
    heroPrimaryCtaLabel: string;
    heroSecondaryCtaLabel: string;
    heroBadgeText: string;
    heroStats: StrapiStatItem[];
    whyJoinTitle: string;
    whyJoinIntro: string;
    benefits: StrapiJoinBenefit[];
    microTestimonial: {
        quote: string;
        authorName: string;
        authorRole: string;
        authorImageUrl: string | null;
    } | null;
    opportunitiesSectionTitle: string;
    opportunitiesSectionSubtitle: string;
    opportunities: Array<{
        id?: number;
        title: string;
        type: string;
        tags: string[];
        imageUrl: string | null;
        description: string;
    }>;
    volunteersSectionTitle: string;
    volunteersSectionSubtitle: string;
    featuredVolunteers: Array<{
        id: number;
        name: string;
        role: string;
        imageUrl: string | null;
        quote?: string;
    }>;
    processTitle: string;
    processSubtitle: string;
    steps: StrapiProcessStep[];
    applicationIntroTitle: string;
    applicationIntroText: string;
}

interface DocumentResponse<T> {
    data: T | null;
    meta?: Record<string, unknown>;
}

export async function fetchJoinPage(): Promise<JoinPageView> {
    try {
        const res = (await strapiClient.single("join-page").find({
            populate: [
                "heroBackground",
                "heroStats",
                "benefits",
                "microTestimonial.image",
                "opportunities.image",
                "opportunities.tags",
                "featuredVolunteers.image",
                "steps",
            ],
        })) as unknown as DocumentResponse<JoinPageDocument>;

        if (!res.data) {
            return getDefaultJoinPage();
        }

        const doc = res.data;

        // Strapi 5: featuredVolunteers peut être direct ou { data: [] }
        const volunteers = Array.isArray(doc.featuredVolunteers)
            ? doc.featuredVolunteers
            : (doc.featuredVolunteers as any)?.data ?? [];

        // Strapi 5: opportunities peut être direct ou { data: [] }
        const opps: StrapiJoinOpportunity[] = Array.isArray(doc.opportunities)
            ? doc.opportunities
            : (doc.opportunities as any)?.data ?? [];

        return {
            heroTitle: doc.heroTitle || PLACEHOLDER_TEXT("heroTitle"),
            heroSubtitle: doc.heroSubtitle || PLACEHOLDER_TEXT("heroSubtitle"),
            heroBackgroundUrl: doc.heroBackground ? (getStrapiMediaUrl(doc.heroBackground.url) ?? null) : null,
            heroPrimaryCtaLabel: doc.heroPrimaryCtaLabel || PLACEHOLDER_TEXT("heroPrimaryCtaLabel"),
            heroSecondaryCtaLabel: doc.heroSecondaryCtaLabel || PLACEHOLDER_TEXT("heroSecondaryCtaLabel"),
            heroBadgeText: doc.heroBadgeText || PLACEHOLDER_TEXT("heroBadgeText"),
            heroStats: doc.heroStats ?? [],

            whyJoinTitle: doc.whyJoinTitle || PLACEHOLDER_TEXT("whyJoinTitle"),
            whyJoinIntro: doc.whyJoinIntro || PLACEHOLDER_TEXT("whyJoinIntro"),
            benefits: doc.benefits ?? [],
            microTestimonial: doc.microTestimonial ? {
                quote: doc.microTestimonial.quote || PLACEHOLDER_TEXT("quote"),
                authorName: doc.microTestimonial.personName || PLACEHOLDER_TEXT("personName"),
                authorRole: doc.microTestimonial.personRole || PLACEHOLDER_TEXT("personRole"),
                authorImageUrl: doc.microTestimonial.image ? (getStrapiMediaUrl(doc.microTestimonial.image.url) ?? null) : null,
            } : null,

            opportunitiesSectionTitle: doc.opportunitiesSectionTitle || PLACEHOLDER_TEXT("opportunitiesSectionTitle"),
            opportunitiesSectionSubtitle: doc.opportunitiesSectionSubtitle || PLACEHOLDER_TEXT("opportunitiesSectionSubtitle"),
            opportunities: opps.map(opp => ({
                id: opp.id,
                title: opp.title || PLACEHOLDER_TEXT("title"),
                type: opp.type || PLACEHOLDER_TEXT("type"),
                tags: (opp.tags ?? []).map((t: StrapiTag) => t.label),
                imageUrl: opp.image ? (getStrapiMediaUrl(opp.image.url) ?? null) : null,
                description: opp.description || PLACEHOLDER_TEXT("description"),
            })),

            volunteersSectionTitle: doc.volunteersSectionTitle || PLACEHOLDER_TEXT("volunteersSectionTitle"),
            volunteersSectionSubtitle: doc.volunteersSectionSubtitle || PLACEHOLDER_TEXT("volunteersSectionSubtitle"),
            featuredVolunteers: volunteers.map((v: StrapiTeamMember) => ({
                id: v.id,
                name: v.name || PLACEHOLDER_TEXT("name"),
                role: v.role || PLACEHOLDER_TEXT("role"),
                imageUrl: v.image ? (getStrapiMediaUrl(v.image.url) ?? null) : null,
            })),

            processTitle: doc.processTitle || PLACEHOLDER_TEXT("processTitle"),
            processSubtitle: doc.processSubtitle || PLACEHOLDER_TEXT("processSubtitle"),
            steps: doc.steps ?? [],

            applicationIntroTitle: doc.applicationIntroTitle || PLACEHOLDER_TEXT("applicationIntroTitle"),
            applicationIntroText: doc.applicationIntroText || PLACEHOLDER_TEXT("applicationIntroText"),
        };
    } catch (error) {
        console.error("❌ Error fetching join page:", error);
        return getDefaultJoinPage();
    }
}

function getDefaultJoinPage(): JoinPageView {
    return {
        heroTitle: PLACEHOLDER_TEXT("heroTitle"),
        heroSubtitle: PLACEHOLDER_TEXT("heroSubtitle"),
        heroBackgroundUrl: null,
        heroPrimaryCtaLabel: PLACEHOLDER_TEXT("heroPrimaryCtaLabel"),
        heroSecondaryCtaLabel: PLACEHOLDER_TEXT("heroSecondaryCtaLabel"),
        heroBadgeText: PLACEHOLDER_TEXT("heroBadgeText"),
        heroStats: [],
        whyJoinTitle: PLACEHOLDER_TEXT("whyJoinTitle"),
        whyJoinIntro: PLACEHOLDER_TEXT("whyJoinIntro"),
        benefits: [],
        microTestimonial: null,
        opportunitiesSectionTitle: PLACEHOLDER_TEXT("opportunitiesSectionTitle"),
        opportunitiesSectionSubtitle: PLACEHOLDER_TEXT("opportunitiesSectionSubtitle"),
        opportunities: [],
        volunteersSectionTitle: PLACEHOLDER_TEXT("volunteersSectionTitle"),
        volunteersSectionSubtitle: PLACEHOLDER_TEXT("volunteersSectionSubtitle"),
        featuredVolunteers: [],
        processTitle: PLACEHOLDER_TEXT("processTitle"),
        processSubtitle: PLACEHOLDER_TEXT("processSubtitle"),
        steps: [],
        applicationIntroTitle: PLACEHOLDER_TEXT("applicationIntroTitle"),
        applicationIntroText: PLACEHOLDER_TEXT("applicationIntroText"),
    };
}

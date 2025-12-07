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

export interface StrapiDonationTier {
    amountLabel: string;
    title: string;
    description: string;
    isPopular?: boolean;
}

export interface StrapiContributionWay {
    title: string;
    description: string;
    iconKey?: string;
    type?: string;
}

export interface StrapiTransparencyItem {
    title: string;
    iconKey?: string;
}

export interface StrapiFundAllocation {
    label: string;
    percentage: number;
    color: string;
}

export interface StrapiPaymentMethod {
    name: string;
    image?: StrapiMedia;
}

export interface StrapiFaqItem {
    question: string;
    answer: string;
}

export interface StrapiActivity {
    documentId: string;
    id: number;
    title: string;
    slug: string;
    description?: string;
    image?: StrapiMedia;
    date?: string;
    activityStatus?: "upcoming" | "past";
}

export interface ContributePageDocument {
    documentId: string;
    id: number;
    heroTitle?: string;
    heroSubtitle?: string;
    heroBackground?: StrapiMedia;
    heroPrimaryCtaLabel?: string;
    heroSecondaryCtaLabel?: string;
    heroBadges?: string;
    storyTitle?: string;
    storyText?: string;
    storyImages?: StrapiMedia[];
    impactStats?: StrapiStatItem[];
    donationSectionTitle?: string;
    donationSectionSubtitle?: string;
    donationTiers?: StrapiDonationTier[];
    achievementsSectionTitle?: string;
    achievementsSectionSubtitle?: string;
    featuredActivities?: StrapiActivity[] | { data: StrapiActivity[] };
    contributionWaysSectionTitle?: string;
    contributionWaysSectionSubtitle?: string;
    contributionWays?: StrapiContributionWay[];
    transparencyBadgeLabel?: string;
    transparencyTitle?: string;
    transparencyText?: string;
    transparencyItems?: StrapiTransparencyItem[];
    transparencyCtaLabel?: string;
    transparencyCtaUrl?: string;
    fundAllocations?: StrapiFundAllocation[];
    paymentSectionTitle?: string;
    paymentSectionSubtitle?: string;
    paymentMethods?: StrapiPaymentMethod[];
    faqSectionTitle?: string;
    faqSectionSubtitle?: string;
    faqs?: StrapiFaqItem[];
}

export interface ContributePageView {
    heroTitle: string;
    heroSubtitle: string;
    heroBackgroundUrl: string | null;
    heroPrimaryCtaLabel: string;
    heroSecondaryCtaLabel: string;
    heroBadges: string[];
    storyTitle: string;
    storyText: string;
    storyImages: string[];
    impactStats: StrapiStatItem[];
    donationSectionTitle: string;
    donationSectionSubtitle: string;
    donationTiers: StrapiDonationTier[];
    achievementsSectionTitle: string;
    achievementsSectionSubtitle: string;
    featuredActivities: Array<{
        id: number;
        title: string;
        slug: string;
        description: string;
        imageUrl: string | null;
    }>;
    contributionWaysSectionTitle: string;
    contributionWaysSectionSubtitle: string;
    contributionWays: StrapiContributionWay[];
    transparencyBadgeLabel: string;
    transparencyTitle: string;
    transparencyText: string;
    transparencyItems: StrapiTransparencyItem[];
    transparencyCtaLabel: string;
    transparencyCtaUrl: string;
    fundAllocations: StrapiFundAllocation[];
    paymentSectionTitle: string;
    paymentSectionSubtitle: string;
    paymentMethods: Array<{
        name: string;
        imageUrl: string | null;
    }>;
    faqSectionTitle: string;
    faqSectionSubtitle: string;
    faqs: StrapiFaqItem[];
}

interface DocumentResponse<T> {
    data: T | null;
    meta?: Record<string, unknown>;
}

async function fetchPastActivities(limit: number = 3): Promise<StrapiActivity[]> {
    try {
        const res = await strapiClient.collection("activities").find({
            filters: { activityStatus: { $eq: "past" } },
            sort: ["date:desc"],
            pagination: { limit },
            populate: ["image"],
        });
        return (res as any).data ?? [];
    } catch (error) {
        console.error("❌ Error fetching past activities:", error);
        return [];
    }
}

export async function fetchContributePage(): Promise<ContributePageView> {
    try {
        const res = (await strapiClient.single("contribute-page").find({
            populate: [
                "heroBackground",
                "storyImages",
                "impactStats",
                "donationTiers",
                "featuredActivities.image",
                "contributionWays",
                "transparencyItems",
                "fundAllocations",
                "paymentMethods.image",
                "faqs",
            ],
        })) as unknown as DocumentResponse<ContributePageDocument>;

        if (!res.data) {
            return getDefaultContributePage();
        }

        const doc = res.data;

        // Strapi 5: featuredActivities peut être direct ou { data: [] }
        let activitiesData = Array.isArray(doc.featuredActivities)
            ? doc.featuredActivities
            : (doc.featuredActivities as any)?.data ?? [];

        let activities: Array<{ id: number; title: string; slug: string; description: string; imageUrl: string | null }> = [];

        if (activitiesData.length > 0) {
            activities = activitiesData.map((a: StrapiActivity) => ({
                id: a.id,
                title: a.title || PLACEHOLDER_TEXT("title"),
                slug: a.slug,
                description: a.description || PLACEHOLDER_TEXT("description"),
                imageUrl: a.image ? (getStrapiMediaUrl(a.image.url) ?? null) : null,
            }));
        } else {
            const pastActivities = await fetchPastActivities(3);
            activities = pastActivities.map(a => ({
                id: a.id,
                title: a.title || PLACEHOLDER_TEXT("title"),
                slug: a.slug,
                description: a.description || PLACEHOLDER_TEXT("description"),
                imageUrl: a.image ? (getStrapiMediaUrl(a.image.url) ?? null) : null,
            }));
        }

        return {
            heroTitle: doc.heroTitle || PLACEHOLDER_TEXT("heroTitle"),
            heroSubtitle: doc.heroSubtitle || PLACEHOLDER_TEXT("heroSubtitle"),
            heroBackgroundUrl: doc.heroBackground ? (getStrapiMediaUrl(doc.heroBackground.url) ?? null) : null,
            heroPrimaryCtaLabel: doc.heroPrimaryCtaLabel || PLACEHOLDER_TEXT("heroPrimaryCtaLabel"),
            heroSecondaryCtaLabel: doc.heroSecondaryCtaLabel || PLACEHOLDER_TEXT("heroSecondaryCtaLabel"),
            heroBadges: doc.heroBadges ? doc.heroBadges.split(",").map(b => b.trim()) : [],

            storyTitle: doc.storyTitle || PLACEHOLDER_TEXT("storyTitle"),
            storyText: doc.storyText || PLACEHOLDER_TEXT("storyText"),
            storyImages: (doc.storyImages ?? []).map(img => getStrapiMediaUrl(img.url) ?? "/placeholder.svg"),
            impactStats: doc.impactStats ?? [],

            donationSectionTitle: doc.donationSectionTitle || PLACEHOLDER_TEXT("donationSectionTitle"),
            donationSectionSubtitle: doc.donationSectionSubtitle || PLACEHOLDER_TEXT("donationSectionSubtitle"),
            donationTiers: doc.donationTiers ?? [],

            achievementsSectionTitle: doc.achievementsSectionTitle || PLACEHOLDER_TEXT("achievementsSectionTitle"),
            achievementsSectionSubtitle: doc.achievementsSectionSubtitle || PLACEHOLDER_TEXT("achievementsSectionSubtitle"),
            featuredActivities: activities,

            contributionWaysSectionTitle: doc.contributionWaysSectionTitle || PLACEHOLDER_TEXT("contributionWaysSectionTitle"),
            contributionWaysSectionSubtitle: doc.contributionWaysSectionSubtitle || PLACEHOLDER_TEXT("contributionWaysSectionSubtitle"),
            contributionWays: doc.contributionWays ?? [],

            transparencyBadgeLabel: doc.transparencyBadgeLabel || PLACEHOLDER_TEXT("transparencyBadgeLabel"),
            transparencyTitle: doc.transparencyTitle || PLACEHOLDER_TEXT("transparencyTitle"),
            transparencyText: doc.transparencyText || PLACEHOLDER_TEXT("transparencyText"),
            transparencyItems: doc.transparencyItems ?? [],
            transparencyCtaLabel: doc.transparencyCtaLabel || PLACEHOLDER_TEXT("transparencyCtaLabel"),
            transparencyCtaUrl: doc.transparencyCtaUrl || "/rapports",
            fundAllocations: doc.fundAllocations ?? [],

            paymentSectionTitle: doc.paymentSectionTitle || PLACEHOLDER_TEXT("paymentSectionTitle"),
            paymentSectionSubtitle: doc.paymentSectionSubtitle || PLACEHOLDER_TEXT("paymentSectionSubtitle"),
            paymentMethods: (doc.paymentMethods ?? []).map(pm => ({
                name: pm.name || PLACEHOLDER_TEXT("name"),
                imageUrl: pm.image ? (getStrapiMediaUrl(pm.image.url) ?? null) : null,
            })),

            faqSectionTitle: doc.faqSectionTitle || PLACEHOLDER_TEXT("faqSectionTitle"),
            faqSectionSubtitle: doc.faqSectionSubtitle || PLACEHOLDER_TEXT("faqSectionSubtitle"),
            faqs: doc.faqs ?? [],
        };
    } catch (error) {
        console.error("❌ Error fetching contribute page:", error);
        return getDefaultContributePage();
    }
}

function getDefaultContributePage(): ContributePageView {
    return {
        heroTitle: PLACEHOLDER_TEXT("heroTitle"),
        heroSubtitle: PLACEHOLDER_TEXT("heroSubtitle"),
        heroBackgroundUrl: null,
        heroPrimaryCtaLabel: PLACEHOLDER_TEXT("heroPrimaryCtaLabel"),
        heroSecondaryCtaLabel: PLACEHOLDER_TEXT("heroSecondaryCtaLabel"),
        heroBadges: [],
        storyTitle: PLACEHOLDER_TEXT("storyTitle"),
        storyText: PLACEHOLDER_TEXT("storyText"),
        storyImages: [],
        impactStats: [],
        donationSectionTitle: PLACEHOLDER_TEXT("donationSectionTitle"),
        donationSectionSubtitle: PLACEHOLDER_TEXT("donationSectionSubtitle"),
        donationTiers: [],
        achievementsSectionTitle: PLACEHOLDER_TEXT("achievementsSectionTitle"),
        achievementsSectionSubtitle: PLACEHOLDER_TEXT("achievementsSectionSubtitle"),
        featuredActivities: [],
        contributionWaysSectionTitle: PLACEHOLDER_TEXT("contributionWaysSectionTitle"),
        contributionWaysSectionSubtitle: PLACEHOLDER_TEXT("contributionWaysSectionSubtitle"),
        contributionWays: [],
        transparencyBadgeLabel: PLACEHOLDER_TEXT("transparencyBadgeLabel"),
        transparencyTitle: PLACEHOLDER_TEXT("transparencyTitle"),
        transparencyText: PLACEHOLDER_TEXT("transparencyText"),
        transparencyItems: [],
        transparencyCtaLabel: PLACEHOLDER_TEXT("transparencyCtaLabel"),
        transparencyCtaUrl: "/rapports",
        fundAllocations: [],
        paymentSectionTitle: PLACEHOLDER_TEXT("paymentSectionTitle"),
        paymentSectionSubtitle: PLACEHOLDER_TEXT("paymentSectionSubtitle"),
        paymentMethods: [],
        faqSectionTitle: PLACEHOLDER_TEXT("faqSectionTitle"),
        faqSectionSubtitle: PLACEHOLDER_TEXT("faqSectionSubtitle"),
        faqs: [],
    };
}

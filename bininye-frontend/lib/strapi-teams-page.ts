import { strapiClient, getStrapiMediaUrl } from "@/lib/strapi-client";
import { mapTeamMembers, type StrapiTeamMemberEntity, type TeamMemberView } from "@/lib/strapi-team";

const PLACEHOLDER_TEXT = (field: string) => `[Donnée non récupérée: ${field}]`;

export interface StrapiMedia {
    documentId: string;
    id: number;
    name: string;
    alternativeText?: string;
    url: string;
}

export interface TeamsPageData {
    documentId: string;
    id: number;
    heroTitle?: string;
    heroSubtitle?: string;
    heroBackground?: StrapiMedia;
    introTitle?: string;
    introText?: string;
    joinCtaTitle?: string;
    joinCtaText?: string;
    joinCtaButtonLabel?: string;
    joinCtaButtonUrl?: string;
    members?: StrapiTeamMemberEntity[] | { data: StrapiTeamMemberEntity[] };
}

export interface TeamsPageView {
    heroTitle: string;
    heroSubtitle: string;
    heroBackgroundUrl: string | null;
    introTitle: string;
    introText: string;
    joinCtaTitle: string;
    joinCtaText: string;
    joinCtaButtonLabel: string;
    joinCtaButtonUrl: string;
    members: TeamMemberView[];
}

interface DocumentResponse<T> {
    data: T | null;
    meta?: Record<string, unknown>;
}

export async function fetchTeamsPage(): Promise<TeamsPageView> {
    try {
        const res = (await strapiClient.single("teams-page").find({
            populate: ["heroBackground", "members.image"],
        })) as unknown as DocumentResponse<TeamsPageData>;

        if (!res.data) {
            return getDefaultTeamsPage();
        }

        const doc = res.data;
        // Strapi 5: members peut être direct ou { data: [] }
        const membersData = Array.isArray(doc.members)
            ? doc.members
            : (doc.members as any)?.data ?? [];
        const members = mapTeamMembers({ data: membersData });

        return {
            heroTitle: doc.heroTitle || PLACEHOLDER_TEXT("heroTitle"),
            heroSubtitle: doc.heroSubtitle || PLACEHOLDER_TEXT("heroSubtitle"),
            heroBackgroundUrl: doc.heroBackground ? (getStrapiMediaUrl(doc.heroBackground.url) ?? null) : null,
            introTitle: doc.introTitle || PLACEHOLDER_TEXT("introTitle"),
            introText: doc.introText || PLACEHOLDER_TEXT("introText"),
            joinCtaTitle: doc.joinCtaTitle || PLACEHOLDER_TEXT("joinCtaTitle"),
            joinCtaText: doc.joinCtaText || PLACEHOLDER_TEXT("joinCtaText"),
            joinCtaButtonLabel: doc.joinCtaButtonLabel || PLACEHOLDER_TEXT("joinCtaButtonLabel"),
            joinCtaButtonUrl: doc.joinCtaButtonUrl || "/nous-rejoindre",
            members,
        };
    } catch (error) {
        console.error("❌ Error fetching teams page:", error);
        return getDefaultTeamsPage();
    }
}

function getDefaultTeamsPage(): TeamsPageView {
    return {
        heroTitle: PLACEHOLDER_TEXT("heroTitle"),
        heroSubtitle: PLACEHOLDER_TEXT("heroSubtitle"),
        heroBackgroundUrl: null,
        introTitle: PLACEHOLDER_TEXT("introTitle"),
        introText: PLACEHOLDER_TEXT("introText"),
        joinCtaTitle: PLACEHOLDER_TEXT("joinCtaTitle"),
        joinCtaText: PLACEHOLDER_TEXT("joinCtaText"),
        joinCtaButtonLabel: PLACEHOLDER_TEXT("joinCtaButtonLabel"),
        joinCtaButtonUrl: "/nous-rejoindre",
        members: [],
    };
}

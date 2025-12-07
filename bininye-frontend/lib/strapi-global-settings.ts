import { strapiClient } from "./strapi-client"

export interface GlobalSettings {
    id: number
    documentId: string
    siteName: string
    siteTagline: string | null
    siteDescription: string | null
    logoUrl: string | null
    logoAlt: string | null
    address: string | null
    contactEmail: string | null
    contactPhone: string | null
    facebookUrl: string | null
    twitterUrl: string | null
    instagramUrl: string | null
    linkedinUrl: string | null
    youtubeUrl: string | null
    footerText: string | null
    copyrightText: string | null
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"

export async function getGlobalSettings(): Promise<GlobalSettings> {
    try {
        const response = await strapiClient.single("global-setting").find({
            populate: ["logo"],
        })

        const data = response?.data
        if (!data) {
            console.warn("Global settings not found, using defaults")
            return getDefaultSettings()
        }

        // Extract logo URL
        let logoUrl: string | null = null
        if (data.logo) {
            const logoData = data.logo as { url?: string }
            logoUrl = logoData.url ? `${STRAPI_URL}${logoData.url}` : null
        }

        return {
            id: data.id,
            documentId: data.documentId,
            siteName: data.siteName || "Binin Yé",
            siteTagline: data.siteTagline || null,
            siteDescription: data.siteDescription || null,
            logoUrl,
            logoAlt: data.logoAlt || data.siteName || "Logo",
            address: data.address || null,
            contactEmail: data.contactEmail || null,
            contactPhone: data.contactPhone || null,
            facebookUrl: data.facebookUrl || null,
            twitterUrl: data.twitterUrl || null,
            instagramUrl: data.instagramUrl || null,
            linkedinUrl: data.linkedinUrl || null,
            youtubeUrl: data.youtubeUrl || null,
            footerText: data.footerText || null,
            copyrightText: data.copyrightText || null,
        }
    } catch (error) {
        console.error("Failed to fetch global settings:", error)
        return getDefaultSettings()
    }
}

function getDefaultSettings(): GlobalSettings {
    return {
        id: 0,
        documentId: "",
        siteName: "Binin Yé",
        siteTagline: "Pour un avenir durable",
        siteDescription: "[Description non récupérée]",
        logoUrl: null,
        logoAlt: "Logo Binin Yé",
        address: "[Adresse non récupérée]",
        contactEmail: "[Email non récupéré]",
        contactPhone: "[Téléphone non récupéré]",
        facebookUrl: null,
        twitterUrl: null,
        instagramUrl: null,
        linkedinUrl: null,
        youtubeUrl: null,
        footerText: "[Texte du footer non récupéré]",
        copyrightText: "[Copyright non récupéré]",
    }
}

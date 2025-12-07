"use client"

import { Facebook, Twitter, Linkedin, LinkIcon, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ShareButtonsProps {
    title?: string
    url?: string
    label?: string
    variant?: "horizontal" | "compact"
}

export function ShareButtons({
    title,
    url,
    label = "Partager :",
    variant = "horizontal"
}: ShareButtonsProps) {
    const [copied, setCopied] = useState(false)

    // Utiliser l'URL actuelle si non fournie
    const shareUrl = typeof window !== "undefined" ? (url || window.location.href) : ""
    const shareTitle = title || ""

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    }

    const handleShare = (platform: keyof typeof shareLinks) => {
        window.open(shareLinks[platform], "_blank", "width=600,height=400,noopener,noreferrer")
    }

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (error) {
            console.error("Failed to copy link:", error)
        }
    }

    if (variant === "compact") {
        return (
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare("facebook")}
                    className="rounded-full hover:text-[#1877F2] hover:border-[#1877F2] bg-transparent"
                >
                    <Facebook className="w-4 h-4" />
                    <span className="sr-only">Partager sur Facebook</span>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare("twitter")}
                    className="rounded-full hover:text-[#1DA1F2] hover:border-[#1DA1F2] bg-transparent"
                >
                    <Twitter className="w-4 h-4" />
                    <span className="sr-only">Partager sur Twitter</span>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare("linkedin")}
                    className="rounded-full hover:text-[#0A66C2] hover:border-[#0A66C2] bg-transparent"
                >
                    <Linkedin className="w-4 h-4" />
                    <span className="sr-only">Partager sur LinkedIn</span>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyLink}
                    className="rounded-full hover:text-primary hover:border-primary bg-transparent"
                >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                    <span className="sr-only">{copied ? "Lien copié" : "Copier le lien"}</span>
                </Button>
            </div>
        )
    }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-muted/20 rounded-2xl">
            <span className="font-semibold text-lg">{label}</span>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare("facebook")}
                    className="rounded-full hover:text-[#1877F2] hover:border-[#1877F2] bg-transparent"
                >
                    <Facebook className="w-5 h-5" />
                    <span className="sr-only">Partager sur Facebook</span>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare("twitter")}
                    className="rounded-full hover:text-[#1DA1F2] hover:border-[#1DA1F2] bg-transparent"
                >
                    <Twitter className="w-5 h-5" />
                    <span className="sr-only">Partager sur Twitter</span>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare("linkedin")}
                    className="rounded-full hover:text-[#0A66C2] hover:border-[#0A66C2] bg-transparent"
                >
                    <Linkedin className="w-5 h-5" />
                    <span className="sr-only">Partager sur LinkedIn</span>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyLink}
                    className="rounded-full hover:text-primary hover:border-primary bg-transparent"
                >
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <LinkIcon className="w-5 h-5" />}
                    <span className="sr-only">{copied ? "Lien copié" : "Copier le lien"}</span>
                </Button>
            </div>
        </div>
    )
}

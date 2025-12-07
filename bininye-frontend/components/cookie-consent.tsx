"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Cookie, X, Settings, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const COOKIE_CONSENT_KEY = "bininye-cookie-consent"

type CookiePreferences = {
    necessary: boolean // Toujours true
    analytics: boolean
    marketing: boolean
}

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [preferences, setPreferences] = useState<CookiePreferences>({
        necessary: true,
        analytics: false,
        marketing: false,
    })

    useEffect(() => {
        // Vérifier si le consentement a déjà été donné
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
        if (!consent) {
            // Afficher le popup après un court délai
            const timer = setTimeout(() => setIsVisible(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [])

    const saveConsent = (prefs: CookiePreferences) => {
        localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
            ...prefs,
            timestamp: new Date().toISOString(),
        }))
        setIsVisible(false)
    }

    const acceptAll = () => {
        saveConsent({
            necessary: true,
            analytics: true,
            marketing: true,
        })
    }

    const acceptNecessaryOnly = () => {
        saveConsent({
            necessary: true,
            analytics: false,
            marketing: false,
        })
    }

    const savePreferences = () => {
        saveConsent(preferences)
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-5 duration-500">
            <div className="container mx-auto max-w-4xl">
                <div className="relative overflow-hidden rounded-2xl border bg-background/95 backdrop-blur-lg shadow-2xl">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 p-6 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                <Cookie className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Nous respectons votre vie privée</h3>
                                <p className="text-sm text-muted-foreground">
                                    Ce site utilise des cookies pour améliorer votre expérience
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={acceptNecessaryOnly}
                            className="rounded-full p-2 hover:bg-muted transition-colors"
                            aria-label="Fermer"
                        >
                            <X className="h-5 w-5 text-muted-foreground" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="px-6 pb-4">
                        {!showDetails ? (
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Nous utilisons des cookies pour analyser notre trafic et améliorer nos services.
                                En cliquant sur "Tout accepter", vous consentez à l'utilisation de tous les cookies.{" "}
                                <Link href="/politique-confidentialite" className="text-primary hover:underline">
                                    En savoir plus
                                </Link>
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {/* Cookie nécessaires */}
                                <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/30">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">Cookies essentiels</span>
                                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                                                Requis
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Nécessaires au fonctionnement du site
                                        </p>
                                    </div>
                                    <div className="flex h-6 w-10 items-center justify-center rounded-full bg-primary">
                                        <Check className="h-4 w-4 text-primary-foreground" />
                                    </div>
                                </div>

                                {/* Analytics */}
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="flex-1">
                                        <span className="font-medium">Cookies analytiques</span>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Nous aident à comprendre comment vous utilisez le site
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                                        className={cn(
                                            "relative h-6 w-10 rounded-full transition-colors",
                                            preferences.analytics ? "bg-primary" : "bg-muted"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                                                preferences.analytics && "translate-x-4"
                                            )}
                                        />
                                    </button>
                                </div>

                                {/* Marketing */}
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="flex-1">
                                        <span className="font-medium">Cookies marketing</span>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Personnalisent le contenu et les publicités
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                                        className={cn(
                                            "relative h-6 w-10 rounded-full transition-colors",
                                            preferences.marketing ? "bg-primary" : "bg-muted"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                                                preferences.marketing && "translate-x-4"
                                            )}
                                        />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse gap-3 border-t bg-muted/30 p-4 sm:flex-row sm:justify-between">
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowDetails(!showDetails)}
                                className="gap-2"
                            >
                                <Settings className="h-4 w-4" />
                                {showDetails ? "Masquer" : "Personnaliser"}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                asChild
                            >
                                <Link href="/politique-protection-donnees">
                                    En savoir plus
                                </Link>
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            {showDetails ? (
                                <Button onClick={savePreferences} className="flex-1 sm:flex-none">
                                    Enregistrer mes choix
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        variant="outline"
                                        onClick={acceptNecessaryOnly}
                                        className="flex-1 sm:flex-none"
                                    >
                                        Refuser
                                    </Button>
                                    <Button
                                        onClick={acceptAll}
                                        className="flex-1 sm:flex-none"
                                    >
                                        Tout accepter
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

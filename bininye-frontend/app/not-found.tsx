"use client"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Home, ArrowLeft, Search, Heart } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function NotFound() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 -z-10">
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />

                    {/* Floating decorative circles */}
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />

                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-[0.02]" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }} />
                </div>

                <div className="container mx-auto px-4 py-16 lg:py-24">
                    <div
                        className={`mx-auto max-w-2xl text-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                            }`}
                    >
                        {/* 404 Number with creative styling */}
                        <div className="relative mb-8">
                            <span className="absolute inset-0 flex items-center justify-center text-[200px] sm:text-[280px] font-black text-primary/5 select-none leading-none">
                                404
                            </span>
                            <div className="relative flex items-center justify-center gap-4 py-12">
                                <span className="text-8xl sm:text-9xl font-black text-primary">4</span>
                                <div className="relative">
                                    <Heart className="w-20 h-20 sm:w-28 sm:h-28 text-secondary fill-secondary animate-pulse" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-white font-bold text-2xl sm:text-3xl">?</span>
                                    </div>
                                </div>
                                <span className="text-8xl sm:text-9xl font-black text-primary">4</span>
                            </div>
                        </div>

                        {/* Message */}
                        <h1 className="font-serif mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
                            Oups ! Page introuvable
                        </h1>
                        <p className="mb-8 text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
                            La page que vous recherchez semble avoir pris un autre chemin.
                            Pas d'inquiétude, ensemble nous pouvons retrouver notre route vers l'impact !
                        </p>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                            <Button asChild size="lg" className="rounded-full min-w-[180px] shadow-lg shadow-primary/25 transition-transform hover:scale-105">
                                <Link href="/">
                                    <Home className="mr-2 h-5 w-5" />
                                    Retour à l'accueil
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-full min-w-[180px] bg-transparent transition-transform hover:scale-105">
                                <Link href="/activites">
                                    <Search className="mr-2 h-5 w-5" />
                                    Voir nos activités
                                </Link>
                            </Button>
                        </div>

                        {/* Quick links */}
                        <div className="pt-8 border-t border-border">
                            <p className="text-sm text-muted-foreground mb-4">Ou explorez ces pages populaires :</p>
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                <Link
                                    href="/qui-sommes-nous"
                                    className="text-sm font-medium text-primary hover:underline underline-offset-4 transition-colors"
                                >
                                    Qui sommes-nous
                                </Link>
                                <span className="text-muted-foreground/50">•</span>
                                <Link
                                    href="/nos-domaines"
                                    className="text-sm font-medium text-primary hover:underline underline-offset-4 transition-colors"
                                >
                                    Nos domaines
                                </Link>
                                <span className="text-muted-foreground/50">•</span>
                                <Link
                                    href="/contribuer"
                                    className="text-sm font-medium text-primary hover:underline underline-offset-4 transition-colors"
                                >
                                    Contribuer
                                </Link>
                                <span className="text-muted-foreground/50">•</span>
                                <Link
                                    href="/contact"
                                    className="text-sm font-medium text-primary hover:underline underline-offset-4 transition-colors"
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>

                        {/* Motivational quote */}
                        <div className="mt-12 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg">
                            <blockquote className="text-muted-foreground italic">
                                "Chaque chemin perdu est une opportunité de découvrir de nouvelles voies vers le changement."
                            </blockquote>
                            <p className="mt-2 text-sm font-medium text-primary">— L'équipe Binin Yé</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

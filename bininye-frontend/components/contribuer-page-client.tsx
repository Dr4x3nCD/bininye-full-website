"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
    Heart,
    Users,
    Briefcase,
    Gift,
    CheckCircle2,
    ArrowRight,
    School,
    Utensils,
    Sprout,
    ShieldCheck,
    FileText,
    ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { DonationModal } from "@/components/donation-modal"
import type { ContributePageView } from "@/lib/strapi-contribute-page"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    heart: Heart,
    users: Users,
    briefcase: Briefcase,
    gift: Gift,
    school: School,
    utensils: Utensils,
    sprout: Sprout,
    "file-text": FileText,
    "check-circle": CheckCircle2,
    "shield-check": ShieldCheck,
}

const tierIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    "Éducation": School,
    "Nutrition": Utensils,
    "Entrepreneuriat": Briefcase,
    "Communauté": Sprout,
}

const tierColorMap: Record<string, { color: string; bg: string }> = {
    "Éducation": { color: "text-blue-500", bg: "bg-blue-50" },
    "Nutrition": { color: "text-green-500", bg: "bg-green-50" },
    "Entrepreneuriat": { color: "text-purple-500", bg: "bg-purple-50" },
    "Communauté": { color: "text-orange-500", bg: "bg-orange-50" },
}

const wayColorMap: Record<string, { color: string; borderColor: string }> = {
    donation: { color: "bg-red-100 text-red-600", borderColor: "border-red-200" },
    volunteer: { color: "bg-blue-100 text-blue-600", borderColor: "border-blue-200" },
    partnership: { color: "bg-green-100 text-green-600", borderColor: "border-green-200" },
    "in-kind": { color: "bg-purple-100 text-purple-600", borderColor: "border-purple-200" },
}

interface ContribuerPageClientProps {
    data: ContributePageView
}

export default function ContribuerPageClient({ data }: ContribuerPageClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedAmount, setSelectedAmount] = useState<string | undefined>(undefined)

    const openDonationModal = (amount?: string) => {
        setSelectedAmount(amount)
        setIsModalOpen(true)
    }

    const heroBackground = data.heroBackgroundUrl || "/placeholder.svg?height=1080&width=1920"

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                {/* 1. Hero Section */}
                <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-black/60 py-20 text-white lg:min-h-[600px]">
                    <div className="absolute inset-0 -z-10">
                        <Image
                            src={heroBackground}
                            alt="Contribuer background"
                            fill
                            className="object-cover opacity-50"
                            priority
                        />
                    </div>
                    <div className="container relative z-10 mx-auto px-4 text-center">
                        <h1 className="mx-auto mb-6 max-w-4xl text-balance text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                            {data.heroTitle.includes(".") ? (
                                <>
                                    {data.heroTitle.split(".")[0]}.<br />
                                    <span className="text-primary">{data.heroTitle.split(".").slice(1).join(".")}</span>
                                </>
                            ) : (
                                data.heroTitle
                            )}
                        </h1>
                        <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-gray-200 md:text-xl">
                            {data.heroSubtitle}
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="h-14 rounded-full bg-primary px-8 text-lg font-bold hover:bg-primary/90"
                                onClick={() => openDonationModal()}
                            >
                                {data.heroPrimaryCtaLabel}
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 rounded-full border-white bg-transparent px-8 text-lg text-white hover:bg-white hover:text-black"
                            >
                                {data.heroSecondaryCtaLabel}
                            </Button>
                        </div>
                        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-300 md:gap-12">
                            {data.heroBadges.map((badge) => (
                                <div key={badge} className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                    <span>{badge}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 2. Storytelling Section */}
                <section className="bg-muted/30 py-16 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                    Notre mission
                                </div>
                                <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                                    {data.storyTitle}
                                </h2>
                                <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                                    {data.storyText}
                                </p>
                                <div className="grid grid-cols-2 gap-6 pt-4">
                                    {data.impactStats.map((stat) => (
                                        <div key={stat.label}>
                                            <div className="mb-2 text-3xl font-bold text-primary">{stat.number}</div>
                                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                                {data.storyImages.length > 0 ? (
                                    <Carousel className="w-full">
                                        <CarouselContent>
                                            {data.storyImages.map((imageUrl, index) => (
                                                <CarouselItem key={index}>
                                                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                                                        <Image
                                                            src={imageUrl}
                                                            alt={`Impact sur le terrain ${index + 1}`}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="left-4 bg-white/80 hover:bg-white" />
                                        <CarouselNext className="right-4 bg-white/80 hover:bg-white" />
                                    </Carousel>
                                ) : (
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                                        <Image
                                            src="/placeholder.svg?height=600&width=800"
                                            alt="Impact sur le terrain"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl bg-primary/5" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Donation Amounts */}
                <section className="py-16 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
                                {data.donationSectionTitle}
                            </h2>
                            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
                                {data.donationSectionSubtitle}
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {data.donationTiers.map((tier) => {
                                const TierIcon = tierIconMap[tier.title] ?? School
                                const colors = tierColorMap[tier.title] ?? { color: "text-blue-500", bg: "bg-blue-50" }
                                return (
                                    <Card
                                        key={tier.amountLabel}
                                        className={`relative flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl ${tier.isPopular ? "border-primary shadow-md ring-1 ring-primary" : "border-border"
                                            }`}
                                    >
                                        {tier.isPopular && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-sm">
                                                Don le plus fréquent
                                            </div>
                                        )}
                                        <CardHeader className={`${colors.bg} rounded-t-xl pb-8`}>
                                            <div
                                                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ${colors.color}`}
                                            >
                                                <TierIcon className="h-6 w-6" />
                                            </div>
                                            <CardTitle className="text-3xl font-bold">{tier.amountLabel}</CardTitle>
                                            <div className="mt-1 font-medium text-muted-foreground">{tier.title}</div>
                                        </CardHeader>
                                        <CardContent className="flex-1 pt-6">
                                            <p className="text-pretty text-muted-foreground">{tier.description}</p>
                                        </CardContent>
                                        <CardFooter className="pt-0">
                                            <Button
                                                className={`w-full ${tier.isPopular ? "bg-primary" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                                                onClick={() => openDonationModal(tier.amountLabel)}
                                            >
                                                Soutenez avec {tier.amountLabel}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* 4. Achievements / Featured Past Activities */}
                <section className="bg-muted/30 py-16 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
                                {data.achievementsSectionTitle}
                            </h2>
                            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
                                {data.achievementsSectionSubtitle}
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            {data.featuredActivities.map((activity) => (
                                <Link
                                    key={activity.id}
                                    href={`/activites/${activity.slug}`}
                                    className="group overflow-hidden rounded-2xl bg-background shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image
                                            src={activity.imageUrl || "/placeholder.svg?height=400&width=600"}
                                            alt={activity.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="mb-2 text-xl font-bold">{activity.title}</h3>
                                        <p className="text-muted-foreground line-clamp-2">{activity.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. Contribution Ways */}
                <section className="bg-slate-50 py-16 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">{data.contributionWaysSectionTitle}</h2>
                            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
                                {data.contributionWaysSectionSubtitle}
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {data.contributionWays.map((way) => {
                                const WayIcon = iconMap[way.iconKey || "heart"] ?? Heart
                                const colors = wayColorMap[way.type || "donation"] ?? { color: "bg-red-100 text-red-600", borderColor: "border-red-200" }
                                return (
                                    <Card
                                        key={way.title}
                                        className={`group flex flex-col border-2 transition-all hover:border-primary/50 hover:shadow-lg ${colors.borderColor}`}
                                    >
                                        <CardHeader>
                                            <div
                                                className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 ${colors.color}`}
                                            >
                                                <WayIcon className="h-7 w-7" />
                                            </div>
                                            <CardTitle className="text-xl">{way.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-1">
                                            <p className="text-muted-foreground">{way.description}</p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button
                                                variant="ghost"
                                                className="group/btn w-full justify-between hover:bg-transparent hover:text-primary pl-0"
                                                onClick={() => openDonationModal()}
                                            >
                                                En savoir plus <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* 6. Transparency Section */}
                <section className="py-16 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                            <div className="order-2 lg:order-1">
                                <div className="relative mx-auto aspect-square max-w-md">
                                    {data.fundAllocations.length > 0 ? (
                                        <>
                                            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90 transform">
                                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f3f4f6" strokeWidth="20" />
                                                {(() => {
                                                    const circumference = 2 * Math.PI * 40; // ~251.2
                                                    let offset = 0;
                                                    return data.fundAllocations.map((allocation, index) => {
                                                        const dashLength = (allocation.percentage / 100) * circumference;
                                                        const currentOffset = offset;
                                                        offset += dashLength;
                                                        return (
                                                            <circle
                                                                key={index}
                                                                cx="50"
                                                                cy="50"
                                                                r="40"
                                                                fill="transparent"
                                                                stroke={allocation.color}
                                                                strokeWidth="20"
                                                                strokeDasharray={`${dashLength} ${circumference}`}
                                                                strokeDashoffset={-currentOffset}
                                                                className="transition-all duration-1000 ease-out hover:opacity-80"
                                                            />
                                                        );
                                                    });
                                                })()}
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                                <span className="text-4xl font-bold" style={{ color: data.fundAllocations[0]?.color || '#10b981' }}>
                                                    {data.fundAllocations[0]?.percentage || 0}%
                                                </span>
                                                <span className="text-xs font-medium text-muted-foreground">
                                                    {data.fundAllocations[0]?.label || 'Programmes'}
                                                </span>
                                            </div>
                                            <div className="absolute -bottom-8 left-0 right-0 flex flex-wrap justify-center gap-4 text-xs font-medium">
                                                {data.fundAllocations.map((allocation, index) => (
                                                    <div key={index} className="flex items-center gap-1">
                                                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: allocation.color }} />
                                                        {allocation.label}
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-muted-foreground">
                                            Données de répartition non disponibles
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="order-1 space-y-8 lg:order-2">
                                <div>
                                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                        <ShieldCheck className="h-4 w-4" />
                                        {data.transparencyBadgeLabel}
                                    </div>
                                    <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">{data.transparencyTitle}</h2>
                                    <p className="text-pretty text-lg text-muted-foreground">
                                        {data.transparencyText}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {data.transparencyItems.map((item, index) => {
                                        const ItemIcon = iconMap[item.iconKey || "check-circle"] ?? CheckCircle2
                                        return (
                                            <div key={index} className="flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-muted/50">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <ItemIcon className="h-5 w-5" />
                                                </div>
                                                <h3 className="font-semibold">{item.title}</h3>
                                            </div>
                                        )
                                    })}
                                </div>

                                <Button variant="outline" className="gap-2 bg-transparent" asChild>
                                    <Link href={data.transparencyCtaUrl}>
                                        {data.transparencyCtaLabel} <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7. Payment Methods */}
                <section className="bg-muted/30 py-16 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">{data.paymentSectionTitle}</h2>
                            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
                                {data.paymentSectionSubtitle}
                            </p>
                        </div>

                        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6">
                            {data.paymentMethods.map((method) => (
                                <div
                                    key={method.name}
                                    className="flex items-center justify-center rounded-xl border bg-background p-4 shadow-sm transition-shadow hover:shadow-md min-w-[120px]"
                                >
                                    {method.imageUrl ? (
                                        <div className="relative h-10 w-20">
                                            <Image
                                                src={method.imageUrl}
                                                alt={method.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <span className="font-semibold text-muted-foreground">{method.name}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 8. FAQ */}
                <section className="py-16 lg:py-24">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="font-serif mb-4 text-balance text-3xl font-bold md:text-4xl">
                                {data.faqSectionTitle}
                            </h2>
                            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
                                {data.faqSectionSubtitle}
                            </p>
                        </div>

                        <div className="mx-auto max-w-3xl space-y-4">
                            {data.faqs.map((faq, index) => (
                                <details
                                    key={index}
                                    className="group rounded-2xl bg-card p-6 shadow-md transition-shadow hover:shadow-lg"
                                >
                                    <summary className="flex cursor-pointer items-center justify-between font-semibold">
                                        <span className="text-pretty pr-4">{faq.question}</span>
                                        <ChevronDown className="h-5 w-5 flex-shrink-0 text-primary transition-transform group-open:rotate-180" />
                                    </summary>
                                    <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Sticky CTA */}
                <div className="fixed bottom-6 right-6 z-50 hidden md:block">
                    <Button
                        size="lg"
                        className="h-14 rounded-full bg-primary px-8 text-lg font-bold shadow-xl hover:bg-primary/90 hover:scale-105 transition-all"
                        onClick={() => openDonationModal()}
                    >
                        {data.heroPrimaryCtaLabel}
                    </Button>
                </div>
            </main>
            <Footer />
            <DonationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} defaultAmount={selectedAmount} />
        </div>
    )
}

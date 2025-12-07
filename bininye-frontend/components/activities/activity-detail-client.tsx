"use client"

import { Calendar, MapPin, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShareButtons } from "@/components/ui/share-buttons"
import type { ActivityDetail, Activity } from "@/lib/strapi-activities"

interface ActivityDetailClientProps {
    activity: ActivityDetail
    relatedActivities: Activity[]
}

export function ActivityDetailClient({ activity, relatedActivities }: ActivityDetailClientProps) {
    const hasObjectives = activity.objectives && activity.objectives.length > 0
    const hasProgramItems = activity.programItems && activity.programItems.length > 0
    const hasTags = activity.tags && activity.tags.length > 0

    return (
        <>
            {/* Contenu principal */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-3">
                        {/* Contenu principal */}
                        <div className="lg:col-span-2">
                            <div className="space-y-8">
                                {/* Description */}
                                <div>
                                    <h2 className="font-serif mb-4 text-2xl font-bold">À propos de cette activité</h2>
                                    <div
                                        className="text-pretty leading-relaxed text-muted-foreground prose prose-muted max-w-none"
                                        dangerouslySetInnerHTML={{
                                            __html: activity.description || "[Donnée non récupérée: description]"
                                        }}
                                    />
                                </div>

                                {/* Objectifs - Affiché seulement si défini */}
                                {hasObjectives && (
                                    <div>
                                        <h2 className="font-serif mb-4 text-2xl font-bold">Objectifs</h2>
                                        <ul className="space-y-3">
                                            {activity.objectives.map((objective, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                                                    <span className="text-pretty leading-relaxed text-muted-foreground">{objective}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Programme - Affiché seulement si défini */}
                                {hasProgramItems && (
                                    <div>
                                        <h2 className="font-serif mb-4 text-2xl font-bold">Programme</h2>
                                        <div className="space-y-4">
                                            {activity.programItems.map((item, index) => (
                                                <div key={index} className="flex gap-4 rounded-2xl bg-muted/50 p-4">
                                                    <div className="flex-shrink-0 font-semibold text-primary">{item.time}</div>
                                                    <div className="text-muted-foreground">{item.title}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tags - Affiché seulement si défini */}
                                {hasTags && (
                                    <div>
                                        <h2 className="font-serif mb-4 text-2xl font-bold">Thématiques</h2>
                                        <div className="flex flex-wrap gap-3">
                                            {activity.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 font-medium text-primary"
                                                >
                                                    <Tag className="h-4 w-4" />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Carte d'information */}
                            <div className="rounded-3xl bg-card p-6 shadow-lg">
                                <h3 className="font-serif mb-4 text-xl font-bold">Informations pratiques</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="mb-1 text-sm font-medium text-muted-foreground">Date</p>
                                        <p className="font-semibold">{activity.date || "[Donnée non récupérée: date]"}</p>
                                    </div>
                                    <div>
                                        <p className="mb-1 text-sm font-medium text-muted-foreground">Lieu</p>
                                        <p className="font-semibold">{activity.location || "[Donnée non récupérée: location]"}</p>
                                    </div>
                                    <div>
                                        <p className="mb-1 text-sm font-medium text-muted-foreground">Participants</p>
                                        <p className="font-semibold">{activity.participants} personnes</p>
                                    </div>
                                    {activity.category && (
                                        <div>
                                            <p className="mb-1 text-sm font-medium text-muted-foreground">Catégorie</p>
                                            <p className="font-semibold">{activity.category}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="rounded-3xl bg-primary p-6 text-center text-primary-foreground">
                                <h3 className="font-serif mb-3 text-xl font-bold">Intéressé par cette activité ?</h3>
                                <p className="mb-6 text-sm leading-relaxed">
                                    {activity.status === "à venir"
                                        ? "Inscrivez-vous dès maintenant pour participer à cette activité."
                                        : "Découvrez nos prochaines activités similaires."}
                                </p>
                                <Button
                                    asChild
                                    size="lg"
                                    className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
                                >
                                    <Link href={activity.status === "à venir" ? "/nous-rejoindre" : "/activites"}>
                                        {activity.status === "à venir" ? "S'inscrire" : "Voir les activités"}
                                    </Link>
                                </Button>
                            </div>

                            {/* Partage */}
                            <div className="rounded-3xl bg-card p-6 shadow-lg">
                                <h3 className="font-serif mb-4 text-xl font-bold">Partager</h3>
                                <ShareButtons title={activity.title} variant="compact" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Activités similaires */}
            {relatedActivities.length > 0 && (
                <section className="bg-muted/30 py-16 lg:py-24">
                    <div className="container mx-auto px-4 lg:px-8">
                        <h2 className="font-serif mb-12 text-center text-3xl font-bold md:text-4xl">Activités similaires</h2>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {relatedActivities.map((relatedActivity) => (
                                <Link
                                    key={relatedActivity.id}
                                    href={`/activites/${relatedActivity.slug}`}
                                    className="group overflow-hidden rounded-3xl bg-card shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={relatedActivity.image || "/placeholder.svg"}
                                            alt={relatedActivity.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute bottom-4 left-4">
                                            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                                                {relatedActivity.category || "[Catégorie]"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-3 p-6">
                                        <h3 className="font-serif line-clamp-2 text-balance text-lg font-bold leading-tight transition-colors group-hover:text-primary">
                                            {relatedActivity.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4 text-primary" />
                                                {relatedActivity.date || "[Date]"}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="h-4 w-4 text-accent" />
                                                {relatedActivity.location || "[Lieu]"}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

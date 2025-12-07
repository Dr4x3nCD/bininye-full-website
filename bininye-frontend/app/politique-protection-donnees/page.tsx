import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Database, FileText, Clock, Globe, Users, AlertTriangle, Server, Shield, Scale, CheckCircle, FileCheck, Target, Mail, Phone, CreditCard, Building2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
    title: "Politique de Protection des Données | Binin Yé",
    description: "Informations complètes sur la protection de vos données personnelles par l'ONG Binin Yé, conformément au RGPD.",
}

export default function PolitiqueProtectionDonneesPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-background">
                {/* Hero */}
                <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-12 sm:py-16 lg:py-24 text-primary-foreground">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }} />
                    </div>

                    <div className="container relative mx-auto px-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-6 sm:mb-8"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Retour à l'accueil
                        </Link>

                        <div className="flex flex-col items-start gap-4 sm:gap-6 max-w-3xl">
                            <div className="flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm">
                                <Database className="h-7 w-7 sm:h-10 sm:w-10 text-secondary" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                                    Politique de Protection des Données
                                </h1>
                                <p className="text-base sm:text-lg lg:text-xl text-primary-foreground/80 leading-relaxed">
                                    Conformité RGPD et réglementation ivoirienne - Tout savoir sur la protection
                                    de vos données personnelles.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-primary-foreground/70">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    <span>Dernière mise à jour : Décembre 2025</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Scale className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    <span>Conforme RGPD</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-8 sm:py-12 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">

                            {/* Introduction Card */}
                            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-8 sm:mb-12 border border-border/50">
                                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">À propos de ce document</h2>
                                <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                                    Ce document détaille nos pratiques en matière de protection des données personnelles,
                                    conformément au <strong className="text-foreground">Règlement Général sur la Protection des Données (RGPD)</strong> européen
                                    et à la législation ivoirienne sur la protection des données. Il complète notre{" "}
                                    <Link href="/politique-confidentialite" className="text-primary hover:underline">
                                        Politique de Confidentialité
                                    </Link>.
                                </p>
                            </div>

                            {/* Sections */}
                            <div className="space-y-8 sm:space-y-12">

                                {/* Responsable de traitement */}
                                <div className="group">
                                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                                        <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <Users className="h-6 w-6 sm:h-7 sm:w-7" />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">Responsable du Traitement</h2>
                                            <p className="text-sm sm:text-base text-muted-foreground mb-4">
                                                Le responsable du traitement des données personnelles collectées via ce site est :
                                            </p>

                                            <div className="rounded-xl sm:rounded-2xl border bg-card p-4 sm:p-6">
                                                <div className="flex flex-col sm:flex-row items-start gap-4">
                                                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10">
                                                        <span className="text-base sm:text-lg font-bold text-primary">BY</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">ONG Binin Yé</h3>
                                                        <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground">
                                                            <div className="flex items-center gap-2">
                                                                <Building2 className="h-4 w-4 text-primary shrink-0" />
                                                                <span>Siège social : Abidjan, Côte d'Ivoire</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Mail className="h-4 w-4 text-primary shrink-0" />
                                                                <span>Email : contact@bininye.org</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Phone className="h-4 w-4 text-primary shrink-0" />
                                                                <span>Téléphone : +225 07 02 03 97</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bases légales */}
                                <div className="group">
                                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                                        <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <Scale className="h-6 w-6 sm:h-7 sm:w-7" />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">Bases Légales du Traitement</h2>
                                            <p className="text-sm sm:text-base text-muted-foreground mb-4">
                                                Conformément au RGPD (article 6), nous traitons vos données sur les bases légales suivantes :
                                            </p>

                                            <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
                                                <div className="rounded-lg sm:rounded-xl border bg-card p-3 sm:p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                                                        <h4 className="font-semibold text-sm sm:text-base text-foreground">Consentement</h4>
                                                    </div>
                                                    <p className="text-xs sm:text-sm text-muted-foreground">Pour l'envoi de newsletters, communications marketing et cookies non essentiels</p>
                                                </div>
                                                <div className="rounded-lg sm:rounded-xl border bg-card p-3 sm:p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <FileCheck className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                                        <h4 className="font-semibold text-sm sm:text-base text-foreground">Exécution d'un contrat</h4>
                                                    </div>
                                                    <p className="text-xs sm:text-sm text-muted-foreground">Pour le traitement des dons, candidatures et demandes de partenariat</p>
                                                </div>
                                                <div className="rounded-lg sm:rounded-xl border bg-card p-3 sm:p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Scale className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                                                        <h4 className="font-semibold text-sm sm:text-base text-foreground">Obligation légale</h4>
                                                    </div>
                                                    <p className="text-xs sm:text-sm text-muted-foreground">Pour la conservation des données fiscales, comptables et de facturation</p>
                                                </div>
                                                <div className="rounded-lg sm:rounded-xl border bg-card p-3 sm:p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Target className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                                                        <h4 className="font-semibold text-sm sm:text-base text-foreground">Intérêt légitime</h4>
                                                    </div>
                                                    <p className="text-xs sm:text-sm text-muted-foreground">Pour l'amélioration de nos services, la sécurité du site et les statistiques</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Durée de conservation */}
                                <div className="group">
                                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                                        <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <Clock className="h-6 w-6 sm:h-7 sm:w-7" />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">Durée de Conservation des Données</h2>
                                            <p className="text-sm sm:text-base text-muted-foreground mb-4">
                                                Nous conservons vos données uniquement pendant la durée nécessaire aux finalités
                                                pour lesquelles elles ont été collectées :
                                            </p>

                                            {/* Mobile: Cards */}
                                            <div className="block sm:hidden space-y-3">
                                                {[
                                                    { type: "Messages de contact", duree: "3 ans" },
                                                    { type: "Données de donateurs", duree: "10 ans" },
                                                    { type: "Reçus fiscaux", duree: "10 ans" },
                                                    { type: "Candidatures bénévoles", duree: "2 ans" },
                                                    { type: "Données newsletter", duree: "Jusqu'au retrait" },
                                                    { type: "Cookies analytiques", duree: "13 mois max" },
                                                    { type: "Logs de sécurité", duree: "1 an" },
                                                ].map((item, index) => (
                                                    <div key={index} className="flex justify-between items-center rounded-lg border bg-card p-3">
                                                        <span className="text-sm font-medium text-foreground">{item.type}</span>
                                                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{item.duree}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Desktop: Table */}
                                            <div className="hidden sm:block overflow-hidden rounded-xl sm:rounded-2xl border">
                                                <table className="w-full text-sm">
                                                    <thead className="bg-muted/50">
                                                        <tr>
                                                            <th className="text-left p-3 sm:p-4 font-semibold text-foreground">Type de données</th>
                                                            <th className="text-left p-3 sm:p-4 font-semibold text-foreground">Durée de conservation</th>
                                                            <th className="text-left p-3 sm:p-4 font-semibold text-foreground hidden md:table-cell">Base légale</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {[
                                                            { type: "Messages de contact", duree: "3 ans", base: "Intérêt légitime" },
                                                            { type: "Données de donateurs", duree: "10 ans", base: "Obligation légale" },
                                                            { type: "Reçus fiscaux", duree: "10 ans", base: "Obligation légale" },
                                                            { type: "Candidatures bénévoles", duree: "2 ans", base: "Consentement" },
                                                            { type: "Données newsletter", duree: "Jusqu'au retrait", base: "Consentement" },
                                                            { type: "Cookies analytiques", duree: "13 mois max", base: "Consentement" },
                                                            { type: "Logs de sécurité", duree: "1 an", base: "Intérêt légitime" },
                                                        ].map((item, index) => (
                                                            <tr key={index} className="border-t">
                                                                <td className="p-3 sm:p-4 font-medium text-foreground">{item.type}</td>
                                                                <td className="p-3 sm:p-4 text-muted-foreground">{item.duree}</td>
                                                                <td className="p-3 sm:p-4 text-muted-foreground hidden md:table-cell">{item.base}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Transferts internationaux */}
                                <div className="group">
                                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                                        <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <Globe className="h-6 w-6 sm:h-7 sm:w-7" />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">Transferts Internationaux</h2>
                                            <p className="text-sm sm:text-base text-muted-foreground mb-4">
                                                Vos données sont principalement stockées et traitées en Côte d'Ivoire et dans
                                                l'Union Européenne. En cas de transfert vers des pays tiers (hors UE), nous
                                                nous assurons que des garanties appropriées sont en place :
                                            </p>

                                            <ul className="space-y-2 sm:space-y-3">
                                                {[
                                                    "Clauses Contractuelles Types (CCT) approuvées par la Commission Européenne",
                                                    "Décisions d'adéquation pour les pays reconnus comme offrant un niveau de protection suffisant",
                                                    "Règles d'entreprise contraignantes (BCR) le cas échéant",
                                                    "Consentement explicite pour les transferts exceptionnels",
                                                ].map((item, index) => (
                                                    <li key={index} className="flex items-start gap-3 rounded-lg bg-muted/30 p-2.5 sm:p-3">
                                                        <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5" />
                                                        <span className="text-xs sm:text-sm text-muted-foreground">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Sous-traitants */}
                                <div className="group">
                                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                                        <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <Server className="h-6 w-6 sm:h-7 sm:w-7" />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">Nos Prestataires et Sous-traitants</h2>
                                            <p className="text-sm sm:text-base text-muted-foreground mb-4">
                                                Pour fournir nos services, nous faisons appel à des prestataires de confiance,
                                                tous liés par des contrats de sous-traitance conformes au RGPD :
                                            </p>

                                            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
                                                <div className="rounded-lg sm:rounded-xl border bg-card p-3 sm:p-4 text-center">
                                                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10 mx-auto mb-2 sm:mb-3">
                                                        <Server className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                                                    </div>
                                                    <h4 className="font-semibold text-sm sm:text-base text-foreground mb-1 sm:mb-2">Hébergement Web</h4>
                                                    <p className="text-xs text-muted-foreground">Serveurs sécurisés conformes RGPD</p>
                                                </div>
                                                <div className="rounded-lg sm:rounded-xl border bg-card p-3 sm:p-4 text-center">
                                                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10 mx-auto mb-2 sm:mb-3">
                                                        <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                                                    </div>
                                                    <h4 className="font-semibold text-sm sm:text-base text-foreground mb-1 sm:mb-2">Paiements</h4>
                                                    <p className="text-xs text-muted-foreground">Partenaires certifiés PCI-DSS</p>
                                                </div>
                                                <div className="rounded-lg sm:rounded-xl border bg-card p-3 sm:p-4 text-center">
                                                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10 mx-auto mb-2 sm:mb-3">
                                                        <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                                                    </div>
                                                    <h4 className="font-semibold text-sm sm:text-base text-foreground mb-1 sm:mb-2">Emailing</h4>
                                                    <p className="text-xs text-muted-foreground">Plateforme conforme RGPD</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Notification des violations */}
                                <div className="rounded-2xl sm:rounded-3xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-5 sm:p-8">
                                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                                        <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-amber-100 dark:bg-amber-900/50">
                                            <AlertTriangle className="h-6 w-6 sm:h-7 sm:w-7 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-amber-800 dark:text-amber-200">
                                                Notification des Violations de Données
                                            </h2>
                                            <p className="text-sm sm:text-base text-amber-800/80 dark:text-amber-200/80 mb-3 sm:mb-4">
                                                Conformément à l'article 33 du RGPD, en cas de violation de données personnelles
                                                susceptible d'engendrer un risque pour vos droits et libertés, nous nous engageons à :
                                            </p>
                                            <ul className="space-y-2 text-sm sm:text-base text-amber-800/80 dark:text-amber-200/80">
                                                <li className="flex items-start gap-2">
                                                    <Clock className="h-4 w-4 shrink-0 mt-1" />
                                                    <span>Notifier l'autorité de protection des données dans les <strong>72 heures</strong></span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <AlertTriangle className="h-4 w-4 shrink-0 mt-1" />
                                                    <span>Vous informer directement si le risque est <strong>élevé</strong></span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <FileText className="h-4 w-4 shrink-0 mt-1" />
                                                    <span>Documenter toute violation et les mesures correctives</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Liens connexes */}
                                <div className="rounded-2xl sm:rounded-3xl bg-muted/30 p-5 sm:p-8 border border-border/50">
                                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-foreground">Documents associés</h3>
                                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                                        <Link
                                            href="/politique-confidentialite"
                                            className="inline-flex items-center justify-center sm:justify-start gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                                        >
                                            <FileText className="h-4 w-4" />
                                            Politique de Confidentialité
                                        </Link>
                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center justify-center sm:justify-start gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                                        >
                                            <Users className="h-4 w-4" />
                                            Nous Contacter
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

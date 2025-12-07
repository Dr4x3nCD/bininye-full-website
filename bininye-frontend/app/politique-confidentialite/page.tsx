import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Mail, FileText, Clock, Globe, Heart, MessageSquare, Handshake, BarChart3, Scale, ClipboardList, MapPin, CreditCard, Ban, Download, Pause } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
    title: "Politique de Confidentialité | Binin Yé",
    description: "Découvrez comment Binin Yé protège vos données personnelles et respecte votre vie privée.",
}

export default function PolitiqueConfidentialitePage() {
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
                                <Shield className="h-7 w-7 sm:h-10 sm:w-10 text-secondary" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                                    Politique de Confidentialité
                                </h1>
                                <p className="text-base sm:text-lg lg:text-xl text-primary-foreground/80 leading-relaxed">
                                    Nous nous engageons à protéger votre vie privée et à traiter vos données personnelles
                                    de manière transparente et sécurisée.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-primary-foreground/70">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    <span>Dernière mise à jour : Décembre 2025</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    <span>Temps de lecture : 5 min</span>
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
                                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">Notre engagement envers vous</h2>
                                <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                                    L'ONG <strong className="text-foreground">Binin Yé</strong> s'engage à protéger la vie privée de ses utilisateurs,
                                    donateurs, bénévoles et partenaires. Cette politique de confidentialité vous explique
                                    de manière claire et transparente comment nous collectons, utilisons et protégeons
                                    vos informations personnelles lorsque vous interagissez avec notre site web et nos services.
                                </p>
                            </div>

                            {/* Sections */}
                            <div className="space-y-8 sm:space-y-12">

                                {/* Section 1 - Données collectées */}
                                <div className="group">
                                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                                        <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <Database className="h-6 w-6 sm:h-7 sm:w-7" />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">1. Quelles données collectons-nous ?</h2>
                                            <p className="text-sm sm:text-base text-muted-foreground mb-4">
                                                Dans le cadre de nos activités, nous sommes amenés à collecter différents types
                                                d'informations vous concernant :
                                            </p>

                                            <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
                                                <div className="rounded-lg sm:rounded-xl border bg-card p-3 sm:p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <ClipboardList className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                                        <h4 className="font-semibold text-sm sm:text-base text-foreground">Données d'identification</h4>
                                                    </div>
                                                    <p className="text-xs sm:text-sm text-muted-foreground">
                                                        Nom, prénom, adresse email, numéro de téléphone que vous nous fournissez
                                                        lors d'un contact ou d'une inscription.
                                                    </p>
                                                </div>
                                                <div className="rounded-lg sm:rounded-xl border bg-card p-3 sm:p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                                        <h4 className="font-semibold text-sm sm:text-base text-foreground">Données de contact</h4>
                                                    </div>
                                                    <p className="text-xs sm:text-sm text-muted-foreground">
                                                        Adresse postale si vous souhaitez recevoir des correspondances physiques
                                                        ou des reçus fiscaux.
                                                    </p>
                                                </div>
                                                <div className="rounded-lg sm:rounded-xl border bg-card p-3 sm:p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                                        <h4 className="font-semibold text-sm sm:text-base text-foreground">Données de navigation</h4>
                                                    </div>
                                                    <p className="text-xs sm:text-sm text-muted-foreground">
                                                        Cookies, adresse IP, type de navigateur et pages visitées pour améliorer
                                                        votre expérience utilisateur.
                                                    </p>
                                                </div>
                                                <div className="rounded-lg sm:rounded-xl border bg-card p-3 sm:p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                                        <h4 className="font-semibold text-sm sm:text-base text-foreground">Données de transaction</h4>
                                                    </div>
                                                    <p className="text-xs sm:text-sm text-muted-foreground">
                                                        Historique des dons (montants, dates). Les données de paiement sont traitées
                                                        par nos partenaires certifiés.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2 - Utilisation */}
                                <div className="group">
                                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                                        <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <Eye className="h-6 w-6 sm:h-7 sm:w-7" />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">2. Comment utilisons-nous vos données ?</h2>
                                            <p className="text-sm sm:text-base text-muted-foreground mb-4">
                                                Vos données personnelles sont utilisées exclusivement pour les finalités suivantes :
                                            </p>

                                            <ul className="space-y-2 sm:space-y-3">
                                                <li className="flex items-start gap-3 rounded-lg bg-muted/30 p-2.5 sm:p-3">
                                                    <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5" />
                                                    <span className="text-xs sm:text-sm text-muted-foreground">Traiter vos dons et émettre des reçus fiscaux conformément à la réglementation</span>
                                                </li>
                                                <li className="flex items-start gap-3 rounded-lg bg-muted/30 p-2.5 sm:p-3">
                                                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5" />
                                                    <span className="text-xs sm:text-sm text-muted-foreground">Répondre à vos demandes de contact et vous fournir les informations demandées</span>
                                                </li>
                                                <li className="flex items-start gap-3 rounded-lg bg-muted/30 p-2.5 sm:p-3">
                                                    <Handshake className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5" />
                                                    <span className="text-xs sm:text-sm text-muted-foreground">Gérer les candidatures de bénévolat et vous accompagner dans votre engagement</span>
                                                </li>
                                                <li className="flex items-start gap-3 rounded-lg bg-muted/30 p-2.5 sm:p-3">
                                                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5" />
                                                    <span className="text-xs sm:text-sm text-muted-foreground">Vous informer de nos activités, projets et actualités (uniquement si vous avez consenti)</span>
                                                </li>
                                                <li className="flex items-start gap-3 rounded-lg bg-muted/30 p-2.5 sm:p-3">
                                                    <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5" />
                                                    <span className="text-xs sm:text-sm text-muted-foreground">Améliorer nos services, notre site web et l'expérience utilisateur</span>
                                                </li>
                                                <li className="flex items-start gap-3 rounded-lg bg-muted/30 p-2.5 sm:p-3">
                                                    <Scale className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5" />
                                                    <span className="text-xs sm:text-sm text-muted-foreground">Respecter nos obligations légales et réglementaires</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3 - Protection */}
                                <div className="group">
                                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                                        <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <Lock className="h-6 w-6 sm:h-7 sm:w-7" />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">3. Comment protégeons-nous vos données ?</h2>
                                            <p className="text-sm sm:text-base text-muted-foreground mb-4">
                                                La sécurité de vos données est notre priorité. Nous mettons en œuvre des mesures
                                                techniques et organisationnelles appropriées :
                                            </p>

                                            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                                                <div className="flex items-start gap-3 rounded-lg sm:rounded-xl border bg-card p-3 sm:p-4">
                                                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                                                        <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-sm sm:text-base text-foreground">Chiffrement SSL/TLS</h4>
                                                        <p className="text-xs sm:text-sm text-muted-foreground">Communications cryptées pour protéger vos données</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3 rounded-lg sm:rounded-xl border bg-card p-3 sm:p-4">
                                                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                                                        <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-sm sm:text-base text-foreground">Accès restreint</h4>
                                                        <p className="text-xs sm:text-sm text-muted-foreground">Seul le personnel autorisé accède aux données</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3 rounded-lg sm:rounded-xl border bg-card p-3 sm:p-4">
                                                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                                                        <Database className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-sm sm:text-base text-foreground">Sauvegardes sécurisées</h4>
                                                        <p className="text-xs sm:text-sm text-muted-foreground">Données sauvegardées sur serveurs sécurisés</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3 rounded-lg sm:rounded-xl border bg-card p-3 sm:p-4">
                                                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                                                        <UserCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-sm sm:text-base text-foreground">Formation continue</h4>
                                                        <p className="text-xs sm:text-sm text-muted-foreground">Équipe formée à la protection des données</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 4 - Vos droits */}
                                <div className="group">
                                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                                        <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <UserCheck className="h-6 w-6 sm:h-7 sm:w-7" />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">4. Quels sont vos droits ?</h2>
                                            <p className="text-sm sm:text-base text-muted-foreground mb-4">
                                                Conformément à la réglementation applicable, vous disposez de plusieurs droits
                                                concernant vos données personnelles :
                                            </p>

                                            {/* Mobile: Cards, Desktop: Table */}
                                            <div className="block sm:hidden space-y-3">
                                                <div className="rounded-lg border bg-card p-3">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Eye className="h-4 w-4 text-primary" />
                                                        <span className="font-medium text-sm">Droit d'accès</span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">Obtenir une copie de vos données</p>
                                                </div>
                                                <div className="rounded-lg border bg-card p-3">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <FileText className="h-4 w-4 text-primary" />
                                                        <span className="font-medium text-sm">Droit de rectification</span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">Corriger les informations inexactes</p>
                                                </div>
                                                <div className="rounded-lg border bg-card p-3">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Ban className="h-4 w-4 text-primary" />
                                                        <span className="font-medium text-sm">Droit à l'effacement</span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">Demander la suppression de vos données</p>
                                                </div>
                                                <div className="rounded-lg border bg-card p-3">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Ban className="h-4 w-4 text-primary" />
                                                        <span className="font-medium text-sm">Droit d'opposition</span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">Refuser certains traitements</p>
                                                </div>
                                                <div className="rounded-lg border bg-card p-3">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Download className="h-4 w-4 text-primary" />
                                                        <span className="font-medium text-sm">Droit à la portabilité</span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">Recevoir vos données dans un format réutilisable</p>
                                                </div>
                                                <div className="rounded-lg border bg-card p-3">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Pause className="h-4 w-4 text-primary" />
                                                        <span className="font-medium text-sm">Droit de limitation</span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">Restreindre temporairement le traitement</p>
                                                </div>
                                            </div>

                                            <div className="hidden sm:block overflow-hidden rounded-xl sm:rounded-2xl border">
                                                <table className="w-full text-sm">
                                                    <thead className="bg-muted/50">
                                                        <tr>
                                                            <th className="text-left p-3 sm:p-4 font-semibold text-foreground">Droit</th>
                                                            <th className="text-left p-3 sm:p-4 font-semibold text-foreground">Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="border-t">
                                                            <td className="p-3 sm:p-4 font-medium text-foreground">
                                                                <div className="flex items-center gap-2">
                                                                    <Eye className="h-4 w-4 text-primary" />
                                                                    Droit d'accès
                                                                </div>
                                                            </td>
                                                            <td className="p-3 sm:p-4 text-muted-foreground">Obtenir une copie de toutes les données que nous détenons sur vous</td>
                                                        </tr>
                                                        <tr className="border-t">
                                                            <td className="p-3 sm:p-4 font-medium text-foreground">
                                                                <div className="flex items-center gap-2">
                                                                    <FileText className="h-4 w-4 text-primary" />
                                                                    Droit de rectification
                                                                </div>
                                                            </td>
                                                            <td className="p-3 sm:p-4 text-muted-foreground">Corriger les informations inexactes ou incomplètes</td>
                                                        </tr>
                                                        <tr className="border-t">
                                                            <td className="p-3 sm:p-4 font-medium text-foreground">
                                                                <div className="flex items-center gap-2">
                                                                    <Ban className="h-4 w-4 text-primary" />
                                                                    Droit à l'effacement
                                                                </div>
                                                            </td>
                                                            <td className="p-3 sm:p-4 text-muted-foreground">Demander la suppression de vos données personnelles</td>
                                                        </tr>
                                                        <tr className="border-t">
                                                            <td className="p-3 sm:p-4 font-medium text-foreground">
                                                                <div className="flex items-center gap-2">
                                                                    <Ban className="h-4 w-4 text-primary" />
                                                                    Droit d'opposition
                                                                </div>
                                                            </td>
                                                            <td className="p-3 sm:p-4 text-muted-foreground">Refuser le traitement de vos données pour certaines finalités</td>
                                                        </tr>
                                                        <tr className="border-t">
                                                            <td className="p-3 sm:p-4 font-medium text-foreground">
                                                                <div className="flex items-center gap-2">
                                                                    <Download className="h-4 w-4 text-primary" />
                                                                    Droit à la portabilité
                                                                </div>
                                                            </td>
                                                            <td className="p-3 sm:p-4 text-muted-foreground">Recevoir vos données dans un format lisible et réutilisable</td>
                                                        </tr>
                                                        <tr className="border-t">
                                                            <td className="p-3 sm:p-4 font-medium text-foreground">
                                                                <div className="flex items-center gap-2">
                                                                    <Pause className="h-4 w-4 text-primary" />
                                                                    Droit de limitation
                                                                </div>
                                                            </td>
                                                            <td className="p-3 sm:p-4 text-muted-foreground">Restreindre temporairement le traitement de vos données</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 5 - Cookies */}
                                <div className="rounded-2xl sm:rounded-3xl bg-secondary/10 p-5 sm:p-8 border border-secondary/20">
                                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                                        <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-secondary text-secondary-foreground">
                                            <Globe className="h-6 w-6 sm:h-7 sm:w-7" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">5. Cookies et technologies similaires</h2>
                                            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                                                Notre site utilise des cookies pour améliorer votre expérience de navigation.
                                                Les cookies sont de petits fichiers texte stockés sur votre appareil qui nous
                                                permettent de personnaliser votre visite et d'analyser le trafic.
                                            </p>
                                            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                                                Vous pouvez gérer vos préférences de cookies à tout moment via la bannière
                                                de consentement ou les paramètres de votre navigateur.
                                            </p>
                                            <Link
                                                href="/politique-protection-donnees"
                                                className="inline-flex items-center gap-2 text-sm sm:text-base text-primary font-medium hover:underline"
                                            >
                                                En savoir plus sur notre Politique de Protection des Données
                                                <ArrowLeft className="h-4 w-4 rotate-180" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Section Contact */}
                                <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-5 sm:p-8 text-primary-foreground">
                                    <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
                                        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                                            <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm">
                                                <Mail className="h-6 w-6 sm:h-7 sm:w-7" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl sm:text-2xl font-bold mb-2">Une question ? Contactez-nous</h2>
                                                <p className="text-sm sm:text-base text-primary-foreground/80">
                                                    Pour toute question concernant cette politique ou pour exercer vos droits,
                                                    notre équipe est à votre disposition.
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-primary font-semibold hover:bg-white/90 transition-colors w-full sm:w-auto"
                                        >
                                            Nous contacter
                                            <ArrowLeft className="h-4 w-4 rotate-180" />
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

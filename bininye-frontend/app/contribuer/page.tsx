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
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import { useState } from "react"
import { DonationModal } from "@/components/donation-modal"

const contributionWays = [
  {
    icon: Heart,
    title: "Don financier",
    description: "Le moyen le plus direct d'avoir un impact immédiat sur nos programmes.",
    action: "Faire un don",
    color: "bg-red-100 text-red-600",
    borderColor: "border-red-200",
  },
  {
    icon: Users,
    title: "Bénévolat",
    description: "Rejoignez nos équipes sur le terrain et vivez une expérience humaine unique.",
    action: "Devenir bénévole",
    color: "bg-blue-100 text-blue-600",
    borderColor: "border-blue-200",
  },
  {
    icon: Briefcase,
    title: "Partenariat",
    description: "Associez l'image de votre entreprise à une cause noble et impactante.",
    action: "Devenir partenaire",
    color: "bg-green-100 text-green-600",
    borderColor: "border-green-200",
  },
  {
    icon: Gift,
    title: "Don en nature",
    description: "Offrez du matériel ou des équipements pour soutenir nos bénéficiaires.",
    action: "Faire un don matériel",
    color: "bg-purple-100 text-purple-600",
    borderColor: "border-purple-200",
  },
]

const donationTiers = [
  {
    amount: "5 000 FCFA",
    icon: School,
    title: "Éducation",
    description: "Offre les fournitures scolaires essentielles à un enfant pour toute l'année.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    amount: "15 000 FCFA",
    icon: Utensils,
    title: "Nutrition",
    description: "Finance une formation complète en nutrition pour 5 familles vulnérables.",
    isPopular: true,
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    amount: "50 000 FCFA",
    icon: Briefcase,
    title: "Entrepreneuriat",
    description: "Soutient le lancement d'un projet générateur de revenus pour une femme.",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    amount: "100 000 FCFA",
    icon: Sprout,
    title: "Communauté",
    description: "Permet la création et l'équipement d'un jardin communautaire durable.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
]

const faqs = [
  {
    question: "Comment sont utilisés mes dons ?",
    answer:
      "Vos dons sont alloués en priorité à nos programmes sur le terrain (85%). Nous maintenons des frais de fonctionnement minimaux pour maximiser l'impact de chaque contribution.",
  },
  {
    question: "Puis-je recevoir un reçu fiscal ?",
    answer:
      "Oui, pour tout don supérieur à 10 000 FCFA, nous délivrons un reçu fiscal annuel vous permettant de bénéficier d'une déduction d'impôts selon la législation en vigueur.",
  },
  {
    question: "Puis-je contribuer autrement que financièrement ?",
    answer:
      "Absolument ! Nous recherchons constamment des bénévoles, des partenaires techniques et des dons en nature (matériel scolaire, médical, etc.).",
  },
  {
    question: "Les paiements sont-ils sécurisés ?",
    answer:
      "Oui, toutes les transactions sont cryptées et sécurisées via nos partenaires de paiement agréés (Visa, Mastercard, Opérateurs mobiles).",
  },
]

export default function ContribuerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState<string | undefined>(undefined)

  const openDonationModal = (amount?: string) => {
    setSelectedAmount(amount)
    setIsModalOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* 1. Hero Section - Émotion & Impact */}
        <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-black/60 py-20 text-white lg:min-h-[600px]">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="Enfants souriants"
              fill
              className="object-cover opacity-50"
              priority
            />
          </div>
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h1 className="mx-auto mb-6 max-w-4xl text-balance text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Offrez un sourire. <br />
              <span className="text-primary">Transformez une vie.</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-gray-200 md:text-xl">
              Chaque contribution, petite ou grande, crée un impact durable dans les communautés que nous soutenons.
              Grâce à vous, des familles, des femmes et des enfants accèdent à un avenir meilleur.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-14 rounded-full bg-primary px-8 text-lg font-bold hover:bg-primary/90"
                onClick={() => openDonationModal()}
              >
                Faire un don maintenant
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-white bg-transparent px-8 text-lg text-white hover:bg-white hover:text-black"
              >
                Découvrir l'impact
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-300 md:gap-12">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>ONG enregistrée</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Transparence totale</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>+10 000 bénéficiaires</span>
              </div>
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
                  Ce que nous changeons ensemble
                </h2>
                <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                  Avec votre aide, nous offrons bien plus que de l'aide matérielle. Nous redonnons de l'espoir. Nous
                  fournissons des fournitures scolaires pour l'éducation, soutenons l'entrepreneuriat féminin pour
                  l'autonomie, finançons des formations vitales, et créons des projets communautaires durables qui
                  transforment des villages entiers.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div>
                    <div className="mb-2 text-3xl font-bold text-primary">3 200+</div>
                    <div className="text-sm text-muted-foreground">Enfants scolarisés</div>
                  </div>
                  <div>
                    <div className="mb-2 text-3xl font-bold text-primary">420+</div>
                    <div className="text-sm text-muted-foreground">Femmes formées</div>
                  </div>
                  <div>
                    <div className="mb-2 text-3xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">Projets durables</div>
                  </div>
                  <div>
                    <div className="mb-2 text-3xl font-bold text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">Engagement</div>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                <Carousel className="w-full">
                  <CarouselContent>
                    {[1, 2, 3].map((_, index) => (
                      <CarouselItem key={index}>
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                          <Image
                            src={`/placeholder.svg?height=600&width=800&query=humanitarian-aid-africa-${index}`}
                            alt="Impact sur le terrain"
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
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl bg-primary/5" />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Donation Amounts - "Votre contribution fait la différence" */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
                Votre contribution fait la différence
              </h2>
              <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
                Choisissez le montant qui correspond à votre engagement. Chaque don a un impact concret et immédiat.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {donationTiers.map((tier) => (
                <Card
                  key={tier.amount}
                  className={`relative flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl ${
                    tier.isPopular ? "border-primary shadow-md ring-1 ring-primary" : "border-border"
                  }`}
                >
                  {tier.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-sm">
                      Don le plus fréquent
                    </div>
                  )}
                  <CardHeader className={`${tier.bg} rounded-t-xl pb-8`}>
                    <div
                      className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ${tier.color}`}
                    >
                      <tier.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-3xl font-bold">{tier.amount}</CardTitle>
                    <div className="mt-1 font-medium text-muted-foreground">{tier.title}</div>
                  </CardHeader>
                  <CardContent className="flex-1 pt-6">
                    <p className="text-pretty text-muted-foreground">{tier.description}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      className={`w-full ${tier.isPopular ? "bg-primary" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                      onClick={() => openDonationModal(tier.amount)}
                    >
                      Soutenez avec {tier.amount}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
                Grâce à vos dons, nous avons réalisé...
              </h2>
              <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
                Voici quelques exemples concrets de projets menés à bien grâce à la générosité de nos donateurs.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Construction d'une école",
                  desc: "3 classes équipées pour 150 élèves dans le village de Kouté.",
                  img: "/placeholder.svg?height=400&width=600",
                },
                {
                  title: "Campagne de vaccination",
                  desc: "500 enfants protégés contre la rougeole et la polio.",
                  img: "/placeholder.svg?height=400&width=600",
                },
                {
                  title: "Puits d'eau potable",
                  desc: "Accès à l'eau potable pour 200 familles, réduisant les maladies hydriques.",
                  img: "/placeholder.svg?height=400&width=600",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group overflow-hidden rounded-2xl bg-background shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={item.img || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Comment contribuer - Options */}
        <section className="bg-slate-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Comment contribuer ?</h2>
              <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
                Il existe plusieurs façons de nous aider. Choisissez celle qui vous correspond le mieux.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {contributionWays.map((way) => (
                <Card
                  key={way.title}
                  className={`group flex flex-col border-2 transition-all hover:border-primary/50 hover:shadow-lg ${way.borderColor}`}
                >
                  <CardHeader>
                    <div
                      className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 ${way.color}`}
                    >
                      <way.icon className="h-7 w-7" />
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
                      {way.action} <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Transparence & Impact */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="order-2 lg:order-1">
                {/* Simple CSS Pie Chart Representation */}
                <div className="relative mx-auto aspect-square max-w-md">
                  <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90 transform">
                    {/* Circle background */}
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f3f4f6" strokeWidth="20" />
                    {/* Segment 1: 85% - Programs */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="20"
                      strokeDasharray="213.6 251.2" // 85% of circumference (2 * pi * 40 ≈ 251.2)
                      className="text-primary transition-all duration-1000 ease-out hover:opacity-90"
                    />
                    {/* Segment 2: 10% - Admin (starts after 85%) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="20"
                      strokeDasharray="25.1 251.2" // 10%
                      strokeDashoffset="-213.6"
                      className="text-blue-400 transition-all duration-1000 ease-out hover:opacity-90"
                    />
                    {/* Segment 3: 5% - Fundraising (starts after 95%) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="20"
                      strokeDasharray="12.5 251.2" // 5%
                      strokeDashoffset="-238.7"
                      className="text-orange-400 transition-all duration-1000 ease-out hover:opacity-90"
                    />
                  </svg>
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-bold text-primary">85%</span>
                    <span className="text-xs font-medium text-muted-foreground">Programmes</span>
                  </div>
                  {/* Legend */}
                  <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-4 text-xs font-medium">
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full bg-primary" /> Programmes
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full bg-blue-400" /> Admin
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full bg-orange-400" /> Collecte
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 space-y-8 lg:order-2">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    <ShieldCheck className="h-4 w-4" />
                    Confiance & Transparence
                  </div>
                  <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Où va votre argent ?</h2>
                  <p className="text-pretty text-lg text-muted-foreground">
                    Nous nous engageons à une transparence totale. La grande majorité de vos dons est directement
                    investie dans nos actions sur le terrain pour maximiser l'impact social.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Rapports financiers</h3>
                      <p className="text-sm text-muted-foreground">
                        Nos comptes sont audités annuellement et disponibles en toute transparence.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Traçabilité garantie</h3>
                      <p className="text-sm text-muted-foreground">
                        Chaque don est suivi et affecté au projet que vous avez choisi de soutenir.
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="gap-2 bg-transparent">
                  Voir nos rapports financiers <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Modes de paiement */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Modes de paiement sécurisés</h2>
              <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
                Nous acceptons tous les principaux moyens de paiement pour faciliter votre générosité.
                <br />
                <span className="mt-2 inline-block text-sm font-medium text-primary">
                  Paiement sécurisé • Transfert instantané • Transparence totale
                </span>
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 md:grid-cols-4">
              {[
                { name: "Mobile Money", icons: ["MTN", "Moov", "Orange"] },
                { name: "Carte Bancaire", icons: ["Visa", "Mastercard"] },
                { name: "Wave", icons: ["Wave"] },
                { name: "Virement", icons: ["Banque"] },
              ].map((method) => (
                <div
                  key={method.name}
                  className="flex flex-col items-center justify-center rounded-xl border bg-background p-6 text-center shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 font-semibold">{method.name}</div>
                  <div className="flex flex-wrap justify-center gap-2 text-xs font-bold text-muted-foreground">
                    {method.icons.map((icon) => (
                      <span key={icon} className="rounded bg-muted px-2 py-1">
                        {icon}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FAQ */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Questions fréquentes</h2>
              <p className="text-muted-foreground">
                Nous répondons à vos interrogations pour vous permettre de donner en toute confiance.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Sticky CTA for Mobile/Desktop */}
        <div className="fixed bottom-6 right-6 z-50 hidden md:block">
          <Button
            size="lg"
            className="h-14 rounded-full bg-primary px-8 text-lg font-bold shadow-xl hover:bg-primary/90 hover:scale-105 transition-all"
            onClick={() => openDonationModal()}
          >
            Faire un don maintenant
          </Button>
        </div>
      </main>
      <Footer />
      <DonationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} defaultAmount={selectedAmount} />
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Send } from "lucide-react"

export function ApplicationForm() {
  return (
    <section id="candidature" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Left Column: Motivation */}
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Rejoignez l'aventure</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Plus de 150 bénévoles nous ont déjà rejoints. Pourquoi pas vous ? Remplissez ce formulaire, nous vous
                répondrons sous 48h.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Réponse rapide</h4>
                    <p className="text-sm text-muted-foreground">Nous traitons les candidatures chaque semaine.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Accompagnement</h4>
                    <p className="text-sm text-muted-foreground">Un parrain vous guidera dès votre arrivée.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Flexibilité</h4>
                    <p className="text-sm text-muted-foreground">Des missions adaptées à votre emploi du temps.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-3">
              <Card className="border-none shadow-2xl">
                <CardContent className="p-6 sm:p-8">
                  <form className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input id="firstName" placeholder="Ex: Jean" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input id="lastName" placeholder="Ex: Kouassi" className="h-12" />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="jean@exemple.com" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input id="phone" type="tel" placeholder="+225 07 XX XX XX XX" className="h-12" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="opportunity">Type d'opportunité souhaitée</Label>
                      <Select>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Sélectionnez une option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="terrain">Bénévolat sur le terrain</SelectItem>
                          <SelectItem value="emploi">Opportunités d'emploi</SelectItem>
                          <SelectItem value="stage">Stages et formations</SelectItem>
                          <SelectItem value="competences">Bénévolat de compétences</SelectItem>
                          <SelectItem value="autre">Autre / Je ne sais pas encore</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Pourquoi souhaitez-vous nous rejoindre ?</Label>
                      <Textarea
                        id="message"
                        placeholder="Racontez-nous brièvement votre parcours et ce qui vous motive..."
                        className="min-h-[150px] resize-y"
                      />
                    </div>

                    <Button type="submit" size="lg" className="h-14 w-full text-lg">
                      Envoyer ma candidature <Send className="ml-2 h-5 w-5" />
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      En envoyant ce formulaire, vous acceptez notre politique de confidentialité.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

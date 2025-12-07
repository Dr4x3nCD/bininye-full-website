"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Send } from "lucide-react"

interface ApplicationFormProps {
  data: {
    title: string;
    text: string;
  }
}

export function ApplicationForm({ data }: ApplicationFormProps) {
  const [opportunityType, setOpportunityType] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("loading")
    setErrorMessage(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    const payload = {
      firstName: formData.get("firstName")?.toString() ?? "",
      lastName: formData.get("lastName")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      phone: formData.get("phone")?.toString() ?? "",
      opportunityType: opportunityType || formData.get("opportunity")?.toString() || null,
      motivation: formData.get("motivation")?.toString() ?? "",
      sourcePage: "/nous-rejoindre",
    }

    try {
      const res = await fetch("/api/volunteer-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      setStatus("success")
      form.reset()
      setOpportunityType("")
    } catch (error) {
      console.error("[ApplicationForm] submit failed", error)
      setStatus("error")
      setErrorMessage("Une erreur est survenue lors de l'envoi de votre candidature. Merci de réessayer.")
    }
  }

  return (
    <section id="candidature" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Left Column: Motivation */}
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">{data.title}</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                {data.text}
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
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input id="firstName" name="firstName" placeholder="Ex: Jean" className="h-12" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input id="lastName" name="lastName" placeholder="Ex: Kouassi" className="h-12" required />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="jean@exemple.com" className="h-12" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="+225 07 XX XX XX XX" className="h-12" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="opportunity">Type d&apos;opportunité souhaitée</Label>
                      <Select value={opportunityType} onValueChange={setOpportunityType}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Sélectionnez une option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="terrain">Bénévolat sur le terrain</SelectItem>
                          <SelectItem value="emploi">Opportunités d&apos;emploi</SelectItem>
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
                        name="motivation"
                        placeholder="Racontez-nous brièvement votre parcours et ce qui vous motive..."
                        className="min-h-[150px] resize-y"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={status === "loading"}
                      className="h-14 w-full text-lg disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Envoi en cours...
                        </span>
                      ) : (
                        <>
                          Envoyer ma candidature <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    {status === "success" && (
                      <p className="text-center text-sm font-medium text-green-600">
                        Votre candidature a bien été envoyée. Merci pour votre engagement.
                      </p>
                    )}
                    {status === "error" && errorMessage && (
                      <p className="text-center text-sm font-medium text-red-600">{errorMessage}</p>
                    )}

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

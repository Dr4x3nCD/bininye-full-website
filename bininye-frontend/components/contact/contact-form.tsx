"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Send, Lock, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ContactForm() {
  const searchParams = useSearchParams()
  const [subject, setSubject] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const param = searchParams.get("subject")
    if (param === "partenariat") setSubject("partenariat")
    else if (param === "general") setSubject("general")
  }, [searchParams])

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
      subject: subject || formData.get("subject")?.toString() || null,
      message: formData.get("message")?.toString() ?? "",
      sourcePage: "/contact",
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      setStatus("success")
      form.reset()
      setSubject("")
    } catch (error) {
      console.error("[ContactForm] submit failed", error)
      setStatus("error")
      setErrorMessage("Une erreur est survenue lors de l'envoi du message. Merci de réessayer.")
    }
  }

  return (
    <div id="contact-form" className="scroll-mt-24">
      <h2 className="font-serif mb-8 text-balance text-3xl font-bold md:text-4xl">Envoyez-nous un message</h2>
      <Card className="border-2 shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-base font-semibold">
                  Prénom
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Votre prénom"
                  className="h-12 rounded-xl bg-muted/30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-base font-semibold">
                  Nom
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Votre nom"
                  className="h-12 rounded-xl bg-muted/30"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="votre.email@exemple.com"
                className="h-12 rounded-xl bg-muted/30"
                required
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-semibold">
                  Téléphone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+225 XX XX XX XX"
                  className="h-12 rounded-xl bg-muted/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization" className="text-base font-semibold">
                  Entreprise / Organisation (Optionnel)
                </Label>
                <Input
                  id="organization"
                  name="organization"
                  placeholder="Nom de votre structure"
                  className="h-12 rounded-xl bg-muted/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-base font-semibold">
                Motif du contact
              </Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="h-12 rounded-xl bg-muted/30">
                  <SelectValue placeholder="Sélectionnez un motif" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Demande générale</SelectItem>
                  <SelectItem value="partenariat">Proposition de partenariat</SelectItem>
                  <SelectItem value="presse">Presse & Médias</SelectItem>
                  <SelectItem value="autre">Autre demande</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-base font-semibold">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Votre message..."
                rows={6}
                className="resize-none rounded-xl bg-muted/30"
                required
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Réponse sous 24 à 48h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5" />
                  <span>Vos informations restent confidentielles</span>
                </div>
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={status === "loading"}
                className="h-12 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:bg-primary/90 disabled:opacity-70"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Envoi en cours...
                  </span>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer
                  </>
                )}
              </Button>
            </div>
          {status === "success" && (
            <p className="mt-4 text-sm font-medium text-green-600">
              Votre message a bien été envoyé. Merci pour votre confiance.
            </p>
          )}
          {status === "error" && errorMessage && (
            <p className="mt-4 text-sm font-medium text-red-600">{errorMessage}</p>
          )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

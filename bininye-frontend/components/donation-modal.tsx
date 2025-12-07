"use client"

import * as React from "react"
import { CheckCircle2, Gift, MessageSquare, CreditCard, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  defaultAmount?: string
}

type DonationType = "financial" | "material" | "contact"

export function DonationModal({ isOpen, onClose, defaultAmount }: DonationModalProps) {
  const [step, setStep] = React.useState<"form" | "success">("form")
  const [donationType, setDonationType] = React.useState<DonationType>("financial")
  const [amount, setAmount] = React.useState(defaultAmount || "")
  const [customAmount, setCustomAmount] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [countryCode, setCountryCode] = React.useState("+225")
  const [materialCategory, setMaterialCategory] = React.useState("")
  const [materialDescription, setMaterialDescription] = React.useState("")
  const [contactMessage, setContactMessage] = React.useState("")

  // Reset state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setStep("form")
      setAmount(defaultAmount || "")
      setCustomAmount("")
      setMaterialCategory("")
      setMaterialDescription("")
      setContactMessage("")
      // If no default amount, default to financial but no amount selected
      if (!defaultAmount) {
        setDonationType("financial")
      }
    }
  }, [isOpen, defaultAmount])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const firstName = formData.get("firstName")?.toString() ?? ""
    const lastName = formData.get("lastName")?.toString() ?? ""
    const email = formData.get("email")?.toString() ?? ""
    const phoneLocal = formData.get("phone")?.toString() ?? ""
    const phone = `${countryCode} ${phoneLocal}`.trim()

    let amountLabel: string | null = null
    let amountValue: number | null = null

    if (donationType === "financial") {
      if (amount === "custom") {
        amountLabel = "custom"
        amountValue = customAmount ? Number(customAmount) : null
      } else if (amount) {
        amountLabel = amount
        const numeric = amount.replace(/[^0-9.,]/g, "").replace(",", ".")
        const parsed = Number(numeric)
        amountValue = Number.isFinite(parsed) ? parsed : null
      }
    }

    const payload = {
      firstName,
      lastName,
      email,
      phone,
      type: donationType,
      amountLabel,
      amountValue,
      materialCategory: donationType === "material" ? materialCategory || null : null,
      materialDescription: donationType === "material" ? materialDescription || null : null,
      message: donationType === "contact" ? contactMessage || null : null,
      sourcePage: "/contribuer",
    }

    try {
      const res = await fetch("/api/donation-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      setStep("success")
    } catch (error) {
      console.error("[DonationModal] submit failed", error)
      // On échec, on reste sur l'écran du formulaire
    } finally {
      setIsLoading(false)
    }
  }

  const handleAmountSelect = (value: string) => {
    setAmount(value)
    if (value !== "custom") {
      setCustomAmount("")
    }
  }

  const countryCodes = [
    { code: "+225", country: "CI" },
    { code: "+33", country: "FR" },
    { code: "+221", country: "SN" },
    { code: "+1", country: "US" },
    { code: "+44", country: "UK" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden gap-0">
        {step === "form" ? (
          <div className="flex flex-col h-full max-h-[90vh]">
            <div className="p-6 pb-4 border-b bg-muted/10">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">Faire un don</DialogTitle>
                <DialogDescription className="text-center">
                  Merci de votre générosité. Chaque geste compte.
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                  <form id="donation-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" name="firstName" placeholder="Jean" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" name="lastName" placeholder="Dupont" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="jean.dupont@exemple.com" required />
                </div>

                {/* Phone Number Field with Country Code */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Numéro de téléphone</Label>
                  <div className="flex gap-2">
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="+225" />
                      </SelectTrigger>
                      <SelectContent>
                        {countryCodes.map((item) => (
                          <SelectItem key={item.code} value={item.code}>
                            {item.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input id="phone" name="phone" type="tel" placeholder="07 07 07 07 07" className="flex-1" required />
                  </div>
                </div>

                {/* Donation Type Selection */}
                <div className="space-y-3">
                  <Label>Type de don</Label>
                  <RadioGroup
                    value={donationType}
                    onValueChange={(v) => setDonationType(v as DonationType)}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="financial" id="type-financial" className="peer sr-only" />
                      <Label
                        htmlFor="type-financial"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                      >
                        <CreditCard className="mb-2 h-6 w-6" />
                        <span className="text-sm font-medium">Financier</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="material" id="type-material" className="peer sr-only" />
                      <Label
                        htmlFor="type-material"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                      >
                        <Gift className="mb-2 h-6 w-6" />
                        <span className="text-sm font-medium">En nature</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="contact" id="type-contact" className="peer sr-only" />
                      <Label
                        htmlFor="type-contact"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                      >
                        <MessageSquare className="mb-2 h-6 w-6" />
                        <span className="text-sm font-medium">Contact</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Dynamic Content based on Type */}
                {donationType === "financial" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <Label>Montant du don</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {["5 000", "15 000", "50 000", "100 000", "250 000"].map((val) => (
                        <Button
                          key={val}
                          type="button"
                          variant={amount === `${val} FCFA` ? "default" : "outline"}
                          className={cn(
                            "h-12 transition-all",
                            amount === `${val} FCFA`
                              ? "border-primary bg-primary text-primary-foreground"
                              : "hover:border-primary/50",
                          )}
                          onClick={() => handleAmountSelect(`${val} FCFA`)}
                        >
                          {val}
                        </Button>
                      ))}
                      <Button
                        type="button"
                        variant={amount === "custom" ? "default" : "outline"}
                        className={cn(
                          "h-12",
                          amount === "custom"
                            ? "border-primary bg-primary text-primary-foreground"
                            : "hover:border-primary/50",
                        )}
                        onClick={() => handleAmountSelect("custom")}
                      >
                        Autre
                      </Button>
                    </div>

                    {amount === "custom" && (
                      <div className="relative animate-in fade-in zoom-in-95 duration-200">
                        <Input
                          type="number"
                          placeholder="Entrez le montant"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="pl-4 pr-12 h-12 text-lg"
                          required
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                          FCFA
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {donationType === "material" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="space-y-2">
                      <Label htmlFor="material-type">Type de matériel</Label>
                      <Select value={materialCategory} onValueChange={setMaterialCategory} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="school">Fournitures scolaires</SelectItem>
                          <SelectItem value="medical">Matériel médical</SelectItem>
                          <SelectItem value="clothes">Vêtements</SelectItem>
                          <SelectItem value="food">Denrées alimentaires</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="material-desc">Description du don</Label>
                      <Textarea
                        id="material-desc"
                        placeholder="Décrivez ce que vous souhaitez donner..."
                        className="min-h-[100px]"
                        value={materialDescription}
                        onChange={(e) => setMaterialDescription(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                {donationType === "contact" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="space-y-2">
                      <Label htmlFor="message">Votre message</Label>
                      <Textarea
                        id="message"
                        placeholder="Comment souhaitez-vous nous aider ?"
                        className="min-h-[120px]"
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div className="p-6 border-t bg-muted/10">
              <Button
                type="submit"
                form="donation-form"
                className="w-full h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Traitement...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {donationType === "contact" ? "Envoyer le message" : "Confirmer le don"}
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-6 text-green-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Merci infiniment !</h2>
            <p className="text-muted-foreground text-lg max-w-md mb-8">
              {donationType === "contact"
                ? "Votre message a bien été reçu. Notre équipe vous recontactera très prochainement."
                : "Votre proposition de don a bien été enregistrée. Vous recevrez un email de confirmation avec les prochaines étapes."}
            </p>
            <Button onClick={onClose} size="lg" className="min-w-[200px]">
              Fermer
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

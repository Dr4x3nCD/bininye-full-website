import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Comment devenir bénévole ?",
    answer:
      "C'est très simple ! Rendez-vous sur notre page 'Nous rejoindre', consultez les missions disponibles et remplissez le formulaire de candidature. Nous vous recontacterons rapidement.",
  },
  {
    question: "Puis-je proposer un partenariat ?",
    answer:
      "Absolument. Nous sommes toujours ouverts aux collaborations avec des entreprises, d'autres ONG ou des institutions. Utilisez le formulaire ci-dessus en sélectionnant 'Proposition de partenariat'.",
  },
  {
    question: "Quels sont vos délais de réponse ?",
    answer:
      "Notre équipe s'efforce de répondre à toutes les demandes sous 24 à 48 heures ouvrables. Pour les urgences, privilégiez le contact par téléphone ou WhatsApp.",
  },
  {
    question: "Où se trouvent vos bureaux ?",
    answer:
      "Nos bureaux sont situés à Cocody, Abidjan. Nous recevons sur rendez-vous du lundi au vendredi de 8h à 17h.",
  },
]

export function ContactFAQ() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif mb-4 text-balance text-3xl font-bold md:text-4xl">
            Questions Fréquemment Posées
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            Tout ce que vous devez savoir pour nous contacter
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
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
  )
}

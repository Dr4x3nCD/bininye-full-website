import { ChevronDown } from "lucide-react"

interface ContactFAQProps {
  data: {
    faq: Array<{
      id?: number;
      question: string;
      answer: string;
    }>;
  }
}

export function ContactFAQ({ data }: ContactFAQProps) {
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
          {data.faq.map((faq, index) => (
            <details
              key={faq.id ?? index}
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

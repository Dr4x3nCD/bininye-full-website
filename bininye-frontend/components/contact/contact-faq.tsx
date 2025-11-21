import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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
    <section className="py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h3 className="mb-8 text-2xl font-bold">Questions fréquentes</h3>
        <Accordion type="single" collapsible className="w-full text-left">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

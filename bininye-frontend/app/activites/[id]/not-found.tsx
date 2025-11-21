import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center lg:px-8">
          <div className="mx-auto max-w-md">
            <div className="mb-6 text-8xl">🔍</div>
            <h1 className="font-serif mb-4 text-4xl font-bold">Activité introuvable</h1>
            <p className="mb-8 text-muted-foreground">
              Désolé, nous n'avons pas trouvé l'activité que vous recherchez. Elle a peut-être été supprimée ou n'existe
              pas.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/activites">Retour aux activités</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

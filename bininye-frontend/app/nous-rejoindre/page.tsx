import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroJoin } from "@/components/join/hero-join"
import { WhyJoin } from "@/components/join/why-join"
import { OpportunitiesList } from "@/components/join/opportunities-list"
import { VolunteersGrid } from "@/components/join/volunteers-grid"
import { ProcessSteps } from "@/components/join/process-steps"
import { ApplicationForm } from "@/components/join/application-form"

export default function NousRejoindre() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroJoin />
        <WhyJoin />
        <OpportunitiesList />
        <VolunteersGrid />
        <ProcessSteps />
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  )
}

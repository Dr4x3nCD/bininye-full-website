import Link from "next/link"
import { MessageCircle, Handshake, Heart, Users, LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const iconMap: Record<string, LucideIcon> = {
  "message-circle": MessageCircle,
  "handshake": Handshake,
  "heart": Heart,
  "users": Users,
}

interface ContactOptionsProps {
  data: {
    options: Array<{
      id?: number;
      title: string;
      description: string;
      iconKey: string;
      ctaLabel: string;
      ctaUrl: string;
    }>;
  }
}

export function ContactOptions({ data }: ContactOptionsProps) {
  return (
    <section className="relative z-10 -mt-12 pb-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.options.map((option) => {
            const Icon = iconMap[option.iconKey] || MessageCircle
            return (
              <Link key={option.id ?? option.title} href={option.ctaUrl} className="group block h-full">
                <Card className="h-full border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="flex h-full flex-col items-center p-6 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold">{option.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{option.description}</p>
                    <span className="mt-auto text-sm font-semibold text-primary group-hover:underline">
                      {option.ctaLabel} →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { Card, CardContent } from "@/components/ui/card"
import { Target, Zap, Users, Star, Quote } from "lucide-react"
import Image from "next/image"

interface StrapiJoinBenefit {
  title: string;
  description: string;
  iconKey?: string;
}

interface WhyJoinProps {
  data: {
    title: string;
    intro: string;
    benefits: StrapiJoinBenefit[];
    testimonial: {
      quote: string;
      authorName: string;
      authorRole: string;
      authorImageUrl: string | null;
    } | null;
  }
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  target: Target,
  zap: Zap,
  users: Users,
  star: Star,
}

const colorMap: Record<string, { color: string; bg: string }> = {
  target: { color: "text-blue-500", bg: "bg-blue-500/10" },
  zap: { color: "text-yellow-500", bg: "bg-yellow-500/10" },
  users: { color: "text-green-500", bg: "bg-green-500/10" },
  star: { color: "text-purple-500", bg: "bg-purple-500/10" },
}

export function WhyJoin({ data }: WhyJoinProps) {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{data.title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {data.intro}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {data.benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.iconKey || "star"] ?? Star
            const colors = colorMap[benefit.iconKey || "star"] ?? colorMap.star
            return (
              <div key={index} className="group relative rounded-2xl border bg-card p-6 transition-all hover:shadow-lg">
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            )
          })}
        </div>

        {/* Micro-testimonial */}
        {data.testimonial && (
          <div className="mt-16 flex justify-center">
            <Card className="relative max-w-3xl overflow-hidden border-primary/20 bg-primary/5">
              <CardContent className="p-8 text-center md:p-10">
                <Quote className="mx-auto mb-6 h-10 w-10 text-primary/40" />
                <p className="mb-6 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
                  &quot;{data.testimonial.quote}&quot;
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-primary">
                    {data.testimonial.authorImageUrl ? (
                      <Image
                        src={data.testimonial.authorImageUrl}
                        alt={data.testimonial.authorName}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-muted" />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-foreground">{data.testimonial.authorName}</div>
                    <div className="text-sm text-muted-foreground">{data.testimonial.authorRole}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}

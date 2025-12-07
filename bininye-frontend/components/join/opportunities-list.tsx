import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface OpportunitiesListProps {
  data: {
    title: string;
    subtitle: string;
    opportunities: Array<{
      id?: number;
      title: string;
      type: string;
      tags: string[];
      imageUrl: string | null;
      description: string;
    }>;
  }
}

export function OpportunitiesList({ data }: OpportunitiesListProps) {
  return (
    <section id="opportunites" className="bg-muted/30 py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-bold md:text-4xl">{data.title}</h2>
          <p className="mt-2 text-muted-foreground">{data.subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.opportunities.map((opp, index) => (
            <Card key={opp.id ?? index} className="flex flex-col overflow-hidden transition-all hover:shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={opp.imageUrl || "/placeholder.svg?height=200&width=300"}
                  alt={opp.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute left-3 top-3 flex gap-2">
                  {opp.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-white/90 text-black backdrop-blur-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="mb-2 text-sm font-medium text-primary">{opp.type}</div>
                <h3 className="text-xl font-bold">{opp.title}</h3>
              </CardHeader>
              <CardContent className="flex-1 pb-4">
                <p className="text-sm text-muted-foreground">{opp.description}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full" asChild>
                  <Link href="#candidature">Je suis intéressé</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

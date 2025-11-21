import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, User, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface BlogPostHeroProps {
  title: string
  category: string
  image: string
  author: string
  date: string
  readTime: string
}

export function BlogPostHero({ title, category, image, author, date, readTime }: BlogPostHeroProps) {
  return (
    <div className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
        {/* Overlay with blur and dark gradient as requested */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux articles
          </Link>

          <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge className="bg-primary hover:bg-primary/90 text-white border-none px-4 py-1 text-sm rounded-full">
              {category}
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight drop-shadow-lg animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 text-balance">
            {title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-white/90 text-sm md:text-base animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                <User className="w-4 h-4" />
              </div>
              <span className="font-medium">{author}</span>
            </div>

            <div className="hidden md:block w-1.5 h-1.5 bg-white/40 rounded-full" />

            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                <Calendar className="w-4 h-4" />
              </div>
              <span>{date}</span>
            </div>

            <div className="hidden md:block w-1.5 h-1.5 bg-white/40 rounded-full" />

            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                <Clock className="w-4 h-4" />
              </div>
              <span>{readTime} de lecture</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

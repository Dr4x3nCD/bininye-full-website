import { Facebook, Twitter, Linkedin, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BlogPostShare() {
  return (
    <div className="max-w-3xl mx-auto px-4 pb-12 border-b border-border">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-muted/20 rounded-2xl">
        <span className="font-semibold text-lg">Partager cet article :</span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:text-[#1877F2] hover:border-[#1877F2] bg-transparent"
          >
            <Facebook className="w-5 h-5" />
            <span className="sr-only">Facebook</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:text-[#1DA1F2] hover:border-[#1DA1F2] bg-transparent"
          >
            <Twitter className="w-5 h-5" />
            <span className="sr-only">Twitter</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:text-[#0A66C2] hover:border-[#0A66C2] bg-transparent"
          >
            <Linkedin className="w-5 h-5" />
            <span className="sr-only">LinkedIn</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:text-primary hover:border-primary bg-transparent"
          >
            <LinkIcon className="w-5 h-5" />
            <span className="sr-only">Copier le lien</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

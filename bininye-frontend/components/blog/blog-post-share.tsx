"use client"

import { ShareButtons } from "@/components/ui/share-buttons"

interface BlogPostShareProps {
  title?: string
}

export function BlogPostShare({ title }: BlogPostShareProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 pb-12 border-b border-border">
      <ShareButtons title={title} label="Partager cet article :" />
    </div>
  )
}

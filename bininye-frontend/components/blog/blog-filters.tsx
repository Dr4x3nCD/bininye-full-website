"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface BlogFiltersProps {
  categories: string[]
}

export function BlogFilters({ categories }: BlogFiltersProps) {
  const [activeCategory, setActiveCategory] = useState("Tous")

  return (
    <div className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 lg:px-8">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-2 pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "ghost"}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-full px-6 text-sm font-medium transition-all",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {category}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>
    </div>
  )
}

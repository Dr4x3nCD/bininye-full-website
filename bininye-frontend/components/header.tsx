"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, ChevronDown, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { menuData, type MenuItem } from "@/lib/menu-data"
import { cn } from "@/lib/utils"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-sm">
            <span className="text-xl font-bold text-primary-foreground">BY</span>
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-base font-bold leading-tight text-foreground">BININ YE</span>
            <span className="text-xs text-muted-foreground">Pour un avenir durable</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-1">
              {menuData.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger className="bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="z-50 bg-popover rounded-md border shadow-md p-2">
                        <ul className="grid w-auto gap-1">
                          {item.children.map((child) => (
                            <li key={child.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={child.url}
                                  className="block select-none rounded-lg px-4 py-2 leading-none no-underline outline-none transition-colors text-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                                >
                                  <div className="text-sm font-medium leading-none whitespace-nowrap">{child.title}</div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.url} legacyBehavior passHref>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-lg bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Language Selector & Donate Button */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 md:flex">
            <span className="text-sm font-medium text-foreground">FR</span>
          </div>

          <Button
            asChild
            className="hidden gap-2 rounded-full bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90 md:flex"
            size="lg"
          >
            <Link href="/contribuer">
              <Heart className="h-4 w-4 fill-current" />
              <span className="font-semibold">Contribuer</span>
            </Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 pt-8">
                {menuData.map((item) => (
                  <MobileMenuItem key={item.title} item={item} onClose={() => setIsOpen(false)} />
                ))}
                <Button asChild className="mt-4 gap-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Link href="/contribuer" onClick={() => setIsOpen(false)}>
                    <Heart className="h-4 w-4 fill-current" />
                    Contribuer
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function MobileMenuItem({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium hover:bg-accent"
        >
          {item.title}
          <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
        </button>
        {isExpanded && (
          <div className="ml-4 mt-2 flex flex-col gap-2">
            {item.children.map((child) => (
              <Link
                key={child.title}
                href={child.url}
                onClick={onClose}
                className="rounded-md px-3 py-2 text-sm hover:bg-accent"
              >
                {child.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link href={item.url} onClick={onClose} className="rounded-md px-3 py-2 text-base font-medium hover:bg-accent">
      {item.title}
    </Link>
  )
}

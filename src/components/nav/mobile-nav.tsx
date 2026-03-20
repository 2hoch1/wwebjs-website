"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MobileNav({
  items,
  className,
}: {
  items: { href: string; label: string }[]
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "relative size-8 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent",
          className
        )}
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <div className="relative size-4">
          <span
            className={cn(
              "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-150",
              open ? "top-[7px] -rotate-45" : "top-0.5"
            )}
          />
          <span
            className={cn(
              "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-150",
              open ? "opacity-0" : "top-[7px] opacity-100"
            )}
          />
          <span
            className={cn(
              "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-150",
              open ? "top-[7px] rotate-45" : "top-[13px]"
            )}
          />
        </div>
      </Button>

      {open && (
        <div className="fixed inset-0 top-(--header-height) z-40 bg-background/95 backdrop-blur-sm">
          <nav className="flex flex-col gap-1 px-6 py-6">
            <MobileLink href="/" onClose={() => setOpen(false)}>
              Home
            </MobileLink>
            {items.map((item) => (
              <MobileLink
                key={item.href}
                href={item.href}
                onClose={() => setOpen(false)}
                active={
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/")
                }
              >
                {item.label}
              </MobileLink>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}

function MobileLink({
  href,
  onClose,
  active,
  children,
}: {
  href: string
  onClose: () => void
  active?: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className={cn(
        "flex items-center py-2 text-2xl font-medium transition-colors",
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </Link>
  )
}

"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useDocsSearch } from "fumadocs-core/search/client"
import { BookOpenIcon, FileIcon, SearchIcon } from "lucide-react"

import { siteConfig } from "@/lib/config"
import { searchClient, algoliaIndex } from "@/lib/algolia"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

function AlgoliaResults({
  onSelect,
}: {
  onSelect: (url: string) => void
}) {
  const { search, setSearch, query } = useDocsSearch(
    React.useMemo(
      () => ({
        type: "algolia" as const,
        client: searchClient!,
        indexName: algoliaIndex,
      }),
      []
    )
  )

  // sync input value from parent via a hidden effect - NOT needed here,
  // this component owns its own input (see StaticNav below for the split)
  void setSearch

  const results = Array.isArray(query.data) ? query.data : []

  return (
    <>
      <CommandInput
        placeholder="Search documentation..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {results.length > 0 && (
          <CommandGroup heading="Documentation">
            {results.slice(0, 8).map((item) => (
              <CommandItem
                key={item.id}
                value={item.id}
                onSelect={() => onSelect(item.url)}
              >
                <FileIcon className="size-4 opacity-60" />
                <span>{item.content}</span>
                {item.breadcrumbs && item.breadcrumbs.length > 0 && (
                  <span className="text-muted-foreground ml-auto truncate text-xs">
                    {item.breadcrumbs.join(' › ')}
                  </span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </>
  )
}

function StaticNav({
  onSelect,
}: {
  onSelect: (url: string) => void
}) {
  return (
    <>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {siteConfig.navItems.map((item) => (
            <CommandItem
              key={item.href}
              value={`nav ${item.label}`}
              onSelect={() => onSelect(item.href)}
            >
              <FileIcon className="size-4 opacity-60" />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Documentation">
          <CommandItem
            value="guide introduction"
            onSelect={() => onSelect("/guide")}
          >
            <BookOpenIcon className="size-4 opacity-60" />
            Getting Started
          </CommandItem>
          <CommandItem
            value="guide authentication"
            onSelect={() => onSelect("/guide/legacy/creating-your-bot/authentication")}
          >
            <BookOpenIcon className="size-4 opacity-60" />
            Authentication
          </CommandItem>
          <CommandItem
            value="guide messages"
            onSelect={() => onSelect("/guide/legacy/creating-your-bot/handling-attachments")}
          >
            <BookOpenIcon className="size-4 opacity-60" />
            Handling Attachments
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  )
}

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const navigate = React.useCallback(
    (url: string) => {
      setOpen(false)
      router.push(url)
    },
    [router]
  )

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 gap-2 px-2 text-muted-foreground shadow-none"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="size-4" />
        <span className="hidden text-sm sm:inline-flex">Search...</span>
        <kbd className="bg-muted hidden items-center gap-0.5 rounded border px-1.5 py-0.5 font-mono text-[10px] sm:flex">
          <span>⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          {searchClient ? (
            <AlgoliaResults onSelect={navigate} />
          ) : (
            <StaticNav onSelect={navigate} />
          )}
        </Command>
      </CommandDialog>
    </>
  )
}

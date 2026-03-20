'use client'

import { buttonVariants } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/cn'
import Link from 'next/link'

import { ExamplesTab } from './components/examples-tab'
import { WWebJSTab } from './components/wwebjs-tab'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Header */}
      <section className="w-full max-w-3xl mx-auto px-4 pt-16 pb-8 text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
          Build WhatsApp Automation, with whatsapp-web.js
        </h1>

        <p className="text-base text-muted-foreground max-w-lg mx-auto">
          A Node.js library for interacting with WhatsApp Web, allowing you to automate tasks, send
          messages and manage your WhatsApp.
        </p>

        <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
          <Link href="/guide/" className={cn(buttonVariants({ size: 'lg' }), 'h-[31px] rounded-lg')}>
            Get Started
          </Link>
          <Link href="/docs/" className={cn(buttonVariants({ size: 'lg', variant: 'ghost' }), 'rounded-lg')}>
            API Reference
          </Link>
        </div>
      </section>

      {/* Main */}
      <main className="w-full max-w-7xl mx-auto px-4">
        <Tabs defaultValue="wwebjs" className="flex-col">
          <TabsList variant="line">
            <TabsTrigger value="wwebjs">WWebJS</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="wwebjs">
            <WWebJSTab />
          </TabsContent>

          <TabsContent value="examples">
            <ExamplesTab />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="w-full" />
    </div>
  )
}

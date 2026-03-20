'use client'

import dynamic from 'next/dynamic'

import { DitheringCard } from './dithering-card'

const WWebJSSectionDynamic = dynamic(() => import('./demo').then(m => m.WWebJSSection), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
      {[0, 1, 2].map(i => (
        <div key={i} className="rounded-xl border border-border bg-card h-[455px] animate-pulse" />
      ))}
    </div>
  ),
})

const NpmDownloadsChartDynamic = dynamic(
  () => import('./npm-downloads-chart').then(m => m.NpmDownloadsChart),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border border-border bg-card h-[280px] animate-pulse" />
    ),
  }
)

export function WWebJSTab() {
  return (
    <div className="space-y-8 pb-24">
      <WWebJSSectionDynamic />

      <NpmDownloadsChartDynamic />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <DitheringCard />
      </div>
    </div>
  )
}

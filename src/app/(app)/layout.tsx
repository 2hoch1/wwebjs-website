import type { ReactNode } from 'react'

import { SiteHeader } from '@/components/nav/site-header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
    </>
  )
}

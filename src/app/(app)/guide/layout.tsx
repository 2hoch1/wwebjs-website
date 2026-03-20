import { source } from '@/lib/source'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { baseOptions } from '@/lib/layout.shared'
import { Navigation, TestTubeDiagonal } from 'lucide-react'

const guide = (
  <span className="flex items-center gap-2">
    <Navigation className="w-4 h-4" />
    <span>Guide</span>
  </span>
)

const legacyGuide = (
  <span className="flex items-center gap-2">
    <TestTubeDiagonal className="w-4 h-4" />
    <span>Legacy Guide</span>
  </span>
)

export default function Layout({ children }: LayoutProps<'/guide'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      sidebar={{
        tabs: [
          {
            title: guide,
            url: '/guide/',
          },
          {
            title: legacyGuide,
            url: '/guide/legacy',
          },
        ],
      }}
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  )
}

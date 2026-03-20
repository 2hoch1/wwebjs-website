'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function MainNav({
  items,
  className,
  ...props
}: React.ComponentProps<'nav'> & {
  items: { href: string; label: string }[]
}) {
  const pathname = usePathname()

  return (
    <nav className={cn('flex items-center', className)} {...props}>
      {items.map(item => (
        <Button
          key={item.href}
          variant="ghost"
          size="lg"
          nativeButton={false}
          render={
            <Link
              href={item.href}
              data-active={pathname === item.href || pathname.startsWith(item.href + '/')}
              className="text-foreground"
            >
              {item.label}
            </Link>
          }
        />
      ))}
    </nav>
  )
}

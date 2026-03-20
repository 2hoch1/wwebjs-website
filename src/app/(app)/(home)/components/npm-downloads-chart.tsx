'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { cn } from '@/lib/utils'

const CHART_GREEN = '#4ACC65'

const chartData = [
  { date: '2023-01-01', downloads: 58320 },
  { date: '2023-02-01', downloads: 61450 },
  { date: '2023-03-01', downloads: 67890 },
  { date: '2023-04-01', downloads: 64210 },
  { date: '2023-05-01', downloads: 72540 },
  { date: '2023-06-01', downloads: 70180 },
  { date: '2023-07-01', downloads: 75630 },
  { date: '2023-08-01', downloads: 78920 },
  { date: '2023-09-01', downloads: 81100 },
  { date: '2023-10-01', downloads: 79450 },
  { date: '2023-11-01', downloads: 83270 },
  { date: '2023-12-01', downloads: 80940 },
  { date: '2024-01-01', downloads: 89210 },
  { date: '2024-02-01', downloads: 95430 },
  { date: '2024-03-01', downloads: 102870 },
  { date: '2024-04-01', downloads: 98540 },
  { date: '2024-05-01', downloads: 110320 },
  { date: '2024-06-01', downloads: 107890 },
  { date: '2024-07-01', downloads: 115670 },
  { date: '2024-08-01', downloads: 119450 },
  { date: '2024-09-01', downloads: 121000 },
  { date: '2024-10-01', downloads: 118340 },
  { date: '2024-11-01', downloads: 122100 },
  { date: '2024-12-01', downloads: 120050 },
  { date: '2025-01-01', downloads: 125142 },
  { date: '2025-02-01', downloads: 134806 },
  { date: '2025-03-01', downloads: 134722 },
  { date: '2025-04-01', downloads: 144431 },
  { date: '2025-05-01', downloads: 174096 },
  { date: '2025-06-01', downloads: 194343 },
  { date: '2025-07-01', downloads: 198144 },
  { date: '2025-08-01', downloads: 220849 },
  { date: '2025-09-01', downloads: 252923 },
  { date: '2025-10-01', downloads: 219875 },
  { date: '2025-11-01', downloads: 217111 },
  { date: '2025-12-01', downloads: 210383 },
]

const chartConfig = {
  downloads: {
    label: 'Downloads',
    color: CHART_GREEN,
  },
} satisfies ChartConfig

type TimeRange = '3M' | '6M' | '1Y' | '3Y'

const TIME_RANGES: { label: string; value: TimeRange }[] = [
  { label: '3M', value: '3M' },
  { label: '6M', value: '6M' },
  { label: '1Y', value: '1Y' },
  { label: '3Y', value: '3Y' },
]

function filterData(range: TimeRange) {
  const referenceDate = new Date('2025-12-01')
  const monthsMap: Record<TimeRange, number> = { '3M': 3, '6M': 6, '1Y': 12, '3Y': 36 }
  const startDate = new Date(referenceDate)
  startDate.setMonth(startDate.getMonth() - (monthsMap[range] - 1))
  return chartData.filter(item => new Date(item.date) >= startDate)
}

export function NpmDownloadsChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('3Y')
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const filtered = useMemo(() => filterData(timeRange), [timeRange])

  // Only render the chart once it has scrolled into view - never unload it again
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Card className="bg-card border-border" ref={ref}>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-4">
        <div className="grid gap-1">
          <CardTitle className="text-card-foreground">NPM Package • whatsapp-web.js</CardTitle>
          <CardDescription className="text-muted-foreground">
            monthly downloads
          </CardDescription>
        </div>
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {TIME_RANGES.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setTimeRange(value)}
              className={cn(
                'rounded-md px-3 py-1 text-xs font-medium transition-colors',
                timeRange === value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-0 sm:px-4">
        <ChartContainer config={chartConfig} className="aspect-auto h-55 w-full">
          {isVisible ? (
            <AreaChart data={filtered} margin={{ top: 8, left: 0, right: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="fillDownloads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_GREEN} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={CHART_GREEN} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                tickFormatter={(value: string) => {
                  const date = new Date(value)
                  return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={48}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value: unknown) =>
                      new Date(value as string).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })
                    }
                    formatter={(value: unknown) => (value as number).toLocaleString()}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="downloads"
                type="natural"
                fill="url(#fillDownloads)"
                stroke={CHART_GREEN}
                strokeWidth={2}
              />
            </AreaChart>
          ) : (
            <div className="h-full w-full" />
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

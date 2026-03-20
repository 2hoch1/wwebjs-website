'use client'

import { MacWindow } from '@/components/ui/mac-window'
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
  useItemIndex,
  useSequence,
} from '@/components/ui/terminal'
import { cn } from '@/lib/utils'
import { startTransition, useEffect, useRef, useState } from 'react'

const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'] as const

// Animates an npm install progress spinner, then signals the parent sequence to advance
function DownloadSpan({ className }: { className?: string }) {
  const [frame, setFrame] = useState(0)
  const [count, setCount] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)

  const sequence = useSequence()
  const itemIndex = useItemIndex()

  const seqRef = useRef(sequence)
  const idxRef = useRef(itemIndex)
  useEffect(() => {
    seqRef.current = sequence
  }, [sequence])
  useEffect(() => {
    idxRef.current = itemIndex
  }, [itemIndex])

  useEffect(() => {
    if (!sequence || itemIndex === null) return
    if (!sequence.sequenceStarted) return
    if (started) return
    if (sequence.activeIndex === itemIndex) {
      startTransition(() => setStarted(true))
    }
  }, [sequence, sequence?.activeIndex, sequence?.sequenceStarted, started, itemIndex])

  useEffect(() => {
    if (!started) return
    const begin = Date.now()
    const DURATION = 6000
    const TOTAL = 182
    const id = setInterval(() => {
      const ms = Date.now() - begin
      const p = Math.min(1, ms / DURATION)
      setCount(Math.round(p * TOTAL))
      setFrame(f => (f + 1) % SPINNER_FRAMES.length)
      if (p >= 1) {
        clearInterval(id)
        setElapsed(ms)
        setDone(true)
        const idx = idxRef.current
        if (seqRef.current && idx !== null) {
          seqRef.current.completeItem(idx)
        }
      }
    }, 80)
    return () => clearInterval(id)
  }, [started])

  if (!started) return null

  if (done) {
    const secs = (elapsed / 1000).toFixed(1)
    return (
      <div className={cn('font-mono text-sm', className)}>
        <span style={{ color: '#4ACC65' }}>✓</span>
        <span className="text-foreground/60"> installed {count} packages </span>
        <span className="text-foreground/30">in {secs}s</span>
      </div>
    )
  }

  return (
    <div className={cn('font-mono text-sm', className)}>
      <span style={{ color: '#4ACC65' }}>{SPINNER_FRAMES[frame]}</span>
      <span className="text-foreground/60"> installing packages </span>
      <span className="text-foreground/30">({count}/182)</span>
    </div>
  )
}

export function TerminalWindow() {
  return (
    <MacWindow title="Terminal" groupKey="terminal" className="h-113.75 flex flex-col">
      <Terminal bare className="flex-1 min-h-0 overflow-auto">
        <AnimatedSpan className="text-foreground/40">
          <span>~/my-bot</span>
        </AnimatedSpan>

        <TypingAnimation style={{ color: '#4ACC65' }} duration={55}>
          {'$ npm i whatsapp-web.js'}
        </TypingAnimation>

        <DownloadSpan />

        <AnimatedSpan className="text-foreground/20">
          <span>&nbsp;</span>
        </AnimatedSpan>

        <AnimatedSpan className="text-foreground/40">
          <span>~/my-bot</span>
        </AnimatedSpan>

        <TypingAnimation style={{ color: '#4ACC65' }} duration={60}>
          {'$ npm start'}
        </TypingAnimation>

        <AnimatedSpan className="text-foreground/40">
          <span>{'>'} my-bot@1.0.0 start</span>
        </AnimatedSpan>

        <AnimatedSpan className="text-foreground/40">
          <span>{'>'} node bot.js</span>
        </AnimatedSpan>

        <AnimatedSpan style={{ color: '#4ACC65' }} className="font-medium">
          <span>Client is ready!</span>
        </AnimatedSpan>
      </Terminal>
    </MacWindow>
  )
}

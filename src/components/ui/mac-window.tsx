'use client'

import { Button } from '@/components/ui/button'
import { usePopout } from '@/hooks/use-popout'
import { cn } from '@/lib/utils'
import { Maximize2, Minimize2 } from 'lucide-react'
import type { ReactNode } from 'react'
import React, { createContext, useContext, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Draggable from 'react-draggable'

// ── Popout group - only one window may be popped at a time ───────────────────
interface MacWindowGroupState {
  activeKey: string | null
  claim: (key: string) => boolean
  release: (key: string) => void
}

const MacWindowGroupContext = createContext<MacWindowGroupState | null>(null)

export function MacWindowGroup({ children }: { children: ReactNode }) {
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const claim = (key: string) => {
    if (activeKey !== null) return false
    setActiveKey(key)
    return true
  }
  const release = (key: string) => {
    if (activeKey === key) setActiveKey(null)
  }
  return (
    <MacWindowGroupContext.Provider value={{ activeKey, claim, release }}>
      {children}
    </MacWindowGroupContext.Provider>
  )
}
// ────────────────────────────────────────────────────────────────────────────

interface MacWindowProps {
  className?: string
  children?: ReactNode
  title?: string
  /** Unique key within a <MacWindowGroup> - enforces only one popout at a time. */
  groupKey?: string
}

export function MacWindow({ className, children, title, groupKey }: MacWindowProps) {
  const { isPopped, origin, containerRef, popOut, popIn } = usePopout()
  const draggableRef = useRef<HTMLDivElement>(null)
  const group = useContext(MacWindowGroupContext)

  const handlePopOut = () => {
    if (group && groupKey) {
      if (!group.claim(groupKey)) return // another window is already popped
    }
    popOut()
  }

  const handlePopIn = () => {
    if (group && groupKey) group.release(groupKey)
    popIn()
  }

  return (
    <>
      {/* Original - blurred when popped out */}
      <div
        ref={containerRef}
        className={cn(
          'rounded-xl border border-border bg-card overflow-hidden transition-[filter] duration-200',
          isPopped && 'blur-sm pointer-events-none select-none',
          className
        )}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          {title && (
            <span className="ml-3 text-xs text-muted-foreground font-mono truncate">{title}</span>
          )}
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handlePopOut}
              className="cursor-pointer"
            >
              <Maximize2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        {children}
      </div>

      {/* Draggable popout rendered at document.body */}
      {isPopped &&
        typeof document !== 'undefined' &&
        createPortal(
          <Draggable
            nodeRef={draggableRef as React.RefObject<HTMLElement>}
            defaultPosition={{ x: origin.x, y: origin.y }}
            handle="[data-drag-handle]"
          >
            <div
              ref={draggableRef}
              style={{ position: 'fixed', top: 0, left: 0, width: origin.width, zIndex: 9999 }}
              className={cn(
                'rounded-xl border border-border overflow-hidden shadow-2xl bg-popover',
                className
              )}
            >
              <div
                data-drag-handle
                className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50 cursor-grab active:cursor-grabbing"
              >
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                {title && (
                  <span className="ml-3 text-xs text-muted-foreground font-mono truncate">
                    {title}
                  </span>
                )}
                <div className="ml-auto">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={handlePopIn}
                    className="hover:cursor-pointer"
                  >
                    <Minimize2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              {children}
            </div>
          </Draggable>,
          document.body
        )}
    </>
  )
}

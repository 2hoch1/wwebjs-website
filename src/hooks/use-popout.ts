'use client'

import { useRef, useState } from 'react'

export interface PopoutOrigin {
  x: number
  y: number
  width: number
}

export function usePopout() {
  const [isPopped, setIsPopped] = useState(false)
  const [origin, setOrigin] = useState<PopoutOrigin>({ x: 0, y: 0, width: 400 })
  const containerRef = useRef<HTMLDivElement>(null)

  function popOut() {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = window.innerWidth / 2 - rect.width / 2
      const y = window.innerHeight / 2 - rect.height / 2
      setOrigin({ x, y, width: rect.width })
    }
    setIsPopped(true)
  }

  function popIn() {
    setIsPopped(false)
  }

  return { isPopped, origin, containerRef, popOut, popIn }
}

'use client'

import { useEffect, useRef } from 'react'

export default function CursorHalo() {
  const ringRef = useRef<HTMLDivElement>(null)
  const pos     = useRef({ x: -200, y: -200 })
  const target  = useRef({ x: -200, y: -200 })
  const rafId   = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      if (ringRef.current) ringRef.current.style.opacity = '1'
    }

    const loop = () => {
      const k = 0.11
      pos.current.x += (target.current.x - pos.current.x) * k
      pos.current.y += (target.current.y - pos.current.y) * k

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${pos.current.x - 24}px, ${pos.current.y - 24}px)`
      }
      rafId.current = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    rafId.current = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      ref={ringRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 48,
        height: 48,
        borderRadius: '50%',
        border: '2px solid rgba(218, 165, 32, 0.82)',
        boxShadow: [
          '0 0 5px  rgba(218, 165, 32, 0.55)',
          '0 0 14px rgba(255, 200, 50, 0.35)',
          '0 0 28px rgba(255, 215, 0,  0.18)',
          'inset 0 0 6px rgba(255, 220, 80, 0.12)',
        ].join(', '),
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0,
        willChange: 'transform',
        transition: 'opacity 0.4s ease',
      }}
    />
  )
}

'use client'

import { useEffect, useRef } from 'react'

// ─── Constants ────────────────────────────────────────────────────────────────
const NUM = 5

const WING_A = ['#F9A8D4', '#FBCFE8', '#F472B6', '#FCE7F3', '#E879F9']
const WING_B = ['#FBCFE8', '#FCE7F3', '#F9A8D4', '#F9A8D4', '#FBCFE8']
const SPARK_COLS = [
  '#FFD700', '#FFE566', '#FFF0A0',
  '#FFFACD', '#FFD700', '#FFB347',
  '#FBCFE8', '#F9A8D4',
]

// ─── Types ────────────────────────────────────────────────────────────────────
type Pt = { x: number; y: number }

interface BF {
  p0: Pt; p1: Pt; p2: Pt; p3: Pt
  t: number; spd: number
  x: number; y: number
  sz: number; ci: number
  wp: number; ws: number
}

interface Spark {
  x: number; y: number
  vx: number; vy: number
  life: number; max: number
  sz: number; col: string
  rot: number; rotSpd: number
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Random point on any viewport edge (slightly off-screen) */
function rEdge(w: number, h: number): Pt {
  switch (Math.floor(Math.random() * 4)) {
    case 0: return { x: Math.random() * w, y: -50 }        // top
    case 1: return { x: Math.random() * w, y: h + 50 }     // bottom
    case 2: return { x: -50, y: Math.random() * h }        // left
    default: return { x: w + 50, y: Math.random() * h }   // right
  }
}

/** Evaluate a cubic bezier at t */
function bez(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const m = 1 - t
  return {
    x: m ** 3 * p0.x + 3 * m * m * t * p1.x + 3 * m * t * t * p2.x + t ** 3 * p3.x,
    y: m ** 3 * p0.y + 3 * m * m * t * p1.y + 3 * m * t * t * p2.y + t ** 3 * p3.y,
  }
}

/** New random bezier path; optionally start from a given point */
function makePath(w: number, h: number, from?: Pt) {
  const mx = Math.min(w, h) * 0.18
  const inner = () => ({
    x: mx + Math.random() * (w - 2 * mx),
    y: mx + Math.random() * (h - 2 * mx),
  })
  return { p0: from ?? rEdge(w, h), p1: inner(), p2: inner(), p3: rEdge(w, h) }
}

/** Build an initial butterfly spread across the screen */
function initBF(w: number, h: number, i: number): BF {
  const path = makePath(w, h)
  const t = (i / NUM) + Math.random() * (1 / NUM)  // stagger across [0,1]
  const pos = bez(path.p0, path.p1, path.p2, path.p3, Math.min(t, 0.99))
  return {
    ...path,
    t,
    x: pos.x, y: pos.y,
    spd: 0.0007 + Math.random() * 0.001,
    // sz * 2.5 ≈ pixel wingspan — capped so max wingspan ≈ 38px (1 cm at 96 dpi)
    sz: 6 + Math.random() * 9,
    ci: i,
    wp: Math.random() * Math.PI * 2,
    ws: 0.07 + Math.random() * 0.08,
  }
}

// ─── Canvas draw functions ────────────────────────────────────────────────────

function drawBF(ctx: CanvasRenderingContext2D, b: BF) {
  const { x, y, sz: s, wp, ci } = b
  const flap = 0.32 + 0.68 * Math.abs(Math.sin(wp))
  const c1 = WING_A[ci % WING_A.length]
  const c2 = WING_B[ci % WING_B.length]

  ctx.save()
  ctx.translate(x, y)

  // ── Upper wings ──
  ctx.save()
  ctx.scale(1, flap)

  ctx.beginPath()
  ctx.ellipse(-s * 0.62, -s * 0.28, s * 0.58, s * 0.46, Math.PI / 8, 0, Math.PI * 2)
  ctx.fillStyle = c1
  ctx.globalAlpha = 0.70
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(s * 0.62, -s * 0.28, s * 0.58, s * 0.46, -Math.PI / 8, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // ── Lower wings ──
  ctx.save()
  ctx.scale(1, flap * 0.72)

  ctx.beginPath()
  ctx.ellipse(-s * 0.46, s * 0.42, s * 0.36, s * 0.26, -Math.PI / 10, 0, Math.PI * 2)
  ctx.fillStyle = c2
  ctx.globalAlpha = 0.58
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(s * 0.46, s * 0.42, s * 0.36, s * 0.26, Math.PI / 10, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // ── Body: simple small oval, no antennae ──
  ctx.globalAlpha = 0.72
  ctx.fillStyle = '#9B7050'
  ctx.beginPath()
  ctx.ellipse(0, 0, s * 0.09, s * 0.55, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

function drawSpark(ctx: CanvasRenderingContext2D, sk: Spark) {
  const ratio = sk.life / sk.max
  const r  = sk.sz * ratio
  const ir = r * 0.34

  ctx.save()
  ctx.translate(sk.x, sk.y)
  ctx.rotate(sk.rot)
  ctx.globalAlpha = ratio * 0.88
  ctx.fillStyle = sk.col

  // 4-pointed star
  ctx.beginPath()
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4
    const rad   = i % 2 === 0 ? r : ir
    const px = rad * Math.cos(angle)
    const py = rad * Math.sin(angle)
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
  }
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Butterflies() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width  = W
    canvas.height = H

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width  = W
      canvas.height = H
    }
    window.addEventListener('resize', onResize)

    const bfs: BF[]    = Array.from({ length: NUM }, (_, i) => initBF(W, H, i))
    const sparks: Spark[] = []
    let frame = 0
    let rafId: number

    const tick = () => {
      ctx.clearRect(0, 0, W, H)
      frame++

      // ── Update + draw sparkles (behind butterflies) ──
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sk = sparks[i]
        sk.x   += sk.vx
        sk.y   += sk.vy
        sk.vy  += 0.015     // gentle gravity — trail drifts down slowly
        sk.rot += sk.rotSpd
        sk.life--
        if (sk.life <= 0) { sparks.splice(i, 1); continue }
        drawSpark(ctx, sk)
      }

      // ── Update butterflies + emit sparkles + draw ──
      for (const b of bfs) {
        b.t += b.spd
        if (b.t >= 1) {
          // Generate a new random path from where this butterfly exits
          const path = makePath(W, H, { x: b.p3.x, y: b.p3.y })
          Object.assign(b, path, { t: 0, spd: 0.0007 + Math.random() * 0.001 })
        }

        const pos = bez(b.p0, b.p1, b.p2, b.p3, Math.min(b.t, 0.9999))
        b.x   = pos.x
        b.y   = pos.y
        b.wp += b.ws

        // Emit 1 sparkle every other frame
        if (frame % 2 === 0) {
          const maxLife = 140 + Math.floor(Math.random() * 80) // 140–220 frames ≈ 2.3–3.7 s
          sparks.push({
            x:      b.x + (Math.random() - 0.5) * b.sz * 0.5, // tight cluster on the path
            y:      b.y + (Math.random() - 0.5) * b.sz * 0.5,
            vx:     (Math.random() - 0.5) * 0.4,
            vy:     Math.random() * 0.15 + 0.04,               // slow initial drop
            life:   maxLife,
            max:    maxLife,                                    // alpha always 1→0
            sz:     1.5 + Math.random() * 2,
            col:    SPARK_COLS[Math.floor(Math.random() * SPARK_COLS.length)],
            rot:    Math.random() * Math.PI * 2,
            rotSpd: (Math.random() - 0.5) * 0.10,
          })
        }
      }

      // Draw butterflies on top of sparkle trail
      for (const b of bfs) drawBF(ctx, b)

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 3 }}
    />
  )
}

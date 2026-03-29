// Pure CSS-driven petal layer — no client JS needed.

const PETALS: Array<{
  left: string; delay: string; dur: string; w: number; h: number;
  color: string; drift: string; rot: string;
}> = [
  // ── Wave 1 ──
  { left: '3%',  delay: '0s',    dur: '9s',    w: 15, h: 7,  color: '#FBCFE8', drift: '55px',  rot: '560deg' },
  { left: '9%',  delay: '1.4s',  dur: '7.5s',  w: 11, h: 5,  color: '#FCE7F3', drift: '-28px', rot: '420deg' },
  { left: '16%', delay: '3.2s',  dur: '10s',   w: 13, h: 6,  color: '#F9A8D4', drift: '40px',  rot: '500deg' },
  { left: '23%', delay: '5.5s',  dur: '8s',    w: 14, h: 6,  color: '#FCE7F3', drift: '48px',  rot: '620deg' },
  { left: '30%', delay: '0.6s',  dur: '11s',   w: 10, h: 4,  color: '#FBCFE8', drift: '-44px', rot: '480deg' },
  { left: '37%', delay: '8s',    dur: '9s',    w: 12, h: 5,  color: '#F9A8D4', drift: '36px',  rot: '530deg' },
  { left: '44%', delay: '2.2s',  dur: '8.5s',  w: 16, h: 7,  color: '#FBCFE8', drift: '-52px', rot: '590deg' },
  { left: '51%', delay: '6.8s',  dur: '9.5s',  w: 12, h: 5,  color: '#FCE7F3', drift: '38px',  rot: '540deg' },
  { left: '58%', delay: '4s',    dur: '7.5s',  w: 13, h: 5,  color: '#FBCFE8', drift: '-32px', rot: '460deg' },
  { left: '64%', delay: '1s',    dur: '12s',   w: 14, h: 6,  color: '#F9A8D4', drift: '62px',  rot: '580deg' },
  { left: '70%', delay: '9s',    dur: '8.5s',  w: 10, h: 4,  color: '#FCE7F3', drift: '-48px', rot: '520deg' },
  { left: '77%', delay: '2.8s',  dur: '10s',   w: 14, h: 6,  color: '#FBCFE8', drift: '42px',  rot: '600deg' },
  { left: '84%', delay: '7s',    dur: '9s',    w: 12, h: 5,  color: '#F9A8D4', drift: '-38px', rot: '470deg' },
  { left: '91%', delay: '4.5s',  dur: '11s',   w: 16, h: 7,  color: '#FCE7F3', drift: '52px',  rot: '550deg' },
  { left: '97%', delay: '0.3s',  dur: '8s',    w: 10, h: 4,  color: '#FBCFE8', drift: '-30px', rot: '440deg' },
  // ── Wave 2 ──
  { left: '6%',  delay: '12s',   dur: '9s',    w: 12, h: 5,  color: '#FCE7F3', drift: '-56px', rot: '510deg' },
  { left: '13%', delay: '10.5s', dur: '11s',   w: 15, h: 6,  color: '#F9A8D4', drift: '46px',  rot: '490deg' },
  { left: '20%', delay: '14s',   dur: '8s',    w: 11, h: 5,  color: '#FBCFE8', drift: '-38px', rot: '570deg' },
  { left: '27%', delay: '11s',   dur: '9.5s',  w: 13, h: 6,  color: '#FCE7F3', drift: '44px',  rot: '530deg' },
  { left: '35%', delay: '16s',   dur: '10s',   w: 10, h: 4,  color: '#F9A8D4', drift: '-42px', rot: '610deg' },
  { left: '42%', delay: '13.5s', dur: '8.5s',  w: 14, h: 6,  color: '#FBCFE8', drift: '32px',  rot: '490deg' },
  { left: '49%', delay: '15s',   dur: '9s',    w: 12, h: 5,  color: '#FCE7F3', drift: '-50px', rot: '560deg' },
  { left: '56%', delay: '10s',   dur: '11.5s', w: 16, h: 7,  color: '#F9A8D4', drift: '58px',  rot: '540deg' },
  { left: '63%', delay: '17s',   dur: '8s',    w: 11, h: 5,  color: '#FBCFE8', drift: '-36px', rot: '480deg' },
  { left: '69%', delay: '12.5s', dur: '10.5s', w: 14, h: 6,  color: '#FCE7F3', drift: '-28px', rot: '500deg' },
  { left: '75%', delay: '14.5s', dur: '9s',    w: 12, h: 5,  color: '#F9A8D4', drift: '42px',  rot: '570deg' },
  { left: '82%', delay: '11.5s', dur: '8.5s',  w: 15, h: 6,  color: '#FBCFE8', drift: '-46px', rot: '530deg' },
  { left: '88%', delay: '16.5s', dur: '10s',   w: 10, h: 4,  color: '#FCE7F3', drift: '34px',  rot: '490deg' },
  { left: '94%', delay: '13s',   dur: '9s',    w: 13, h: 5,  color: '#F9A8D4', drift: '-32px', rot: '610deg' },
]

export default function FloatingPetals() {
  return (
    <div
      style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}
      aria-hidden="true"
    >
      {PETALS.map((p, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: '-30px',
            left: p.left,
            width:  `${p.w}px`,
            height: `${p.h}px`,
            borderRadius: '50%',
            backgroundColor: p.color,
            opacity: 0,
            '--petal-drift': p.drift,
            '--petal-rot':   p.rot,
            animation: `petal-fall ${p.dur} ease-in ${p.delay} infinite`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

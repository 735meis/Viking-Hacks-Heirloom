import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 relative overflow-hidden">
      <div className="text-center max-w-lg relative z-10">

        {/* ── Cherry Blossom Tree ── */}
        <div className="flex justify-center mb-2" aria-hidden="true">
          <svg
            viewBox="0 0 280 262"
            style={{ width: 'min(300px, 88vw)', height: 'auto' }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Warm candlelight glow behind the tree — symbolises hope & enduring spirit */}
              <radialGradient id="treeGlow" cx="50%" cy="42%" r="50%">
                <stop offset="0%"   stopColor="#FFF0CC" stopOpacity="0.92" />
                <stop offset="55%"  stopColor="#FFE5A8" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#FFF0CC" stopOpacity="0"    />
              </radialGradient>
            </defs>

            {/* Glow ellipse — pulses gently like a candle flame */}
            <ellipse
              cx="140" cy="132" rx="130" ry="118"
              fill="url(#treeGlow)"
              className="tree-glow"
            />

            {/* Ground line */}
            <line x1="28" y1="255" x2="252" y2="255" stroke="#C4A07A" strokeWidth="1.5" opacity="0.35" />

            {/* ── Trunk ── */}
            <path
              d="M140 255 C138 240 142 222 140 202 C138 183 142 165 140 144 C138 126 142 108 140 92 C139 83 140 77 140 74"
              stroke="#7C5C3A" strokeWidth="7" strokeLinecap="round"
              pathLength="1" strokeDasharray="1" strokeDashoffset="1"
              style={{ animation: 'cb-draw 0.9s ease-out 0.1s forwards' }}
            />

            {/* ── Main branches ── */}
            <path
              d="M140 200 C128 193 110 182 80 167"
              stroke="#8B6840" strokeWidth="5.5" strokeLinecap="round"
              pathLength="1" strokeDasharray="1" strokeDashoffset="1"
              style={{ animation: 'cb-draw 0.5s ease-out 0.38s forwards' }}
            />
            <path
              d="M140 194 C152 187 170 178 200 167"
              stroke="#8B6840" strokeWidth="5.5" strokeLinecap="round"
              pathLength="1" strokeDasharray="1" strokeDashoffset="1"
              style={{ animation: 'cb-draw 0.5s ease-out 0.42s forwards' }}
            />

            {/* ── Mid branches ── */}
            <path
              d="M140 162 C130 154 116 144 90 134"
              stroke="#8B6840" strokeWidth="4" strokeLinecap="round"
              pathLength="1" strokeDasharray="1" strokeDashoffset="1"
              style={{ animation: 'cb-draw 0.44s ease-out 0.60s forwards' }}
            />
            <path
              d="M140 158 C150 150 164 141 190 134"
              stroke="#8B6840" strokeWidth="4" strokeLinecap="round"
              pathLength="1" strokeDasharray="1" strokeDashoffset="1"
              style={{ animation: 'cb-draw 0.44s ease-out 0.64s forwards' }}
            />

            {/* ── Upper branches ── */}
            <path
              d="M140 130 C132 122 120 111 102 103"
              stroke="#956E38" strokeWidth="3" strokeLinecap="round"
              pathLength="1" strokeDasharray="1" strokeDashoffset="1"
              style={{ animation: 'cb-draw 0.38s ease-out 0.80s forwards' }}
            />
            <path
              d="M140 127 C148 119 160 109 178 103"
              stroke="#956E38" strokeWidth="3" strokeLinecap="round"
              pathLength="1" strokeDasharray="1" strokeDashoffset="1"
              style={{ animation: 'cb-draw 0.38s ease-out 0.84s forwards' }}
            />

            {/* ── Sub branches ── */}
            <path
              d="M140 110 C134 102 123 91 110 83"
              stroke="#A07840" strokeWidth="2.5" strokeLinecap="round"
              pathLength="1" strokeDasharray="1" strokeDashoffset="1"
              style={{ animation: 'cb-draw 0.33s ease-out 0.98s forwards' }}
            />
            <path
              d="M140 108 C146 100 157 89 170 83"
              stroke="#A07840" strokeWidth="2.5" strokeLinecap="round"
              pathLength="1" strokeDasharray="1" strokeDashoffset="1"
              style={{ animation: 'cb-draw 0.33s ease-out 1.02s forwards' }}
            />

            {/* ── Top twigs ── */}
            <path
              d="M140 94 C134 85 126 75 116 65"
              stroke="#B08840" strokeWidth="2" strokeLinecap="round"
              pathLength="1" strokeDasharray="1" strokeDashoffset="1"
              style={{ animation: 'cb-draw 0.28s ease-out 1.12s forwards' }}
            />
            <path
              d="M140 92 C146 83 154 73 164 65"
              stroke="#B08840" strokeWidth="2" strokeLinecap="round"
              pathLength="1" strokeDasharray="1" strokeDashoffset="1"
              style={{ animation: 'cb-draw 0.28s ease-out 1.16s forwards' }}
            />

            {/* ── Center top twigs ── */}
            <path
              d="M140 82 C136 73 130 63 124 53"
              stroke="#B08840" strokeWidth="1.8" strokeLinecap="round"
              pathLength="1" strokeDasharray="1" strokeDashoffset="1"
              style={{ animation: 'cb-draw 0.25s ease-out 1.23s forwards' }}
            />
            <path
              d="M140 80 C144 71 150 61 156 53"
              stroke="#B08840" strokeWidth="1.8" strokeLinecap="round"
              pathLength="1" strokeDasharray="1" strokeDashoffset="1"
              style={{ animation: 'cb-draw 0.25s ease-out 1.27s forwards' }}
            />

            {/* ══════════════ BLOSSOMS ══════════════ */}

            {/* Cluster 1 — main left tip (80, 167) */}
            <circle cx="75"  cy="162" r="5"   fill="#F9A8D4" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.38s both' }} />
            <circle cx="82"  cy="157" r="4"   fill="#FBCFE8" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.44s both' }} />
            <circle cx="87"  cy="165" r="4.5" fill="#FCE7F3" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.50s both' }} />
            <circle cx="78"  cy="172" r="4"   fill="#F9A8D4" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.56s both' }} />
            <circle cx="72"  cy="167" r="3.5" fill="#FBCFE8" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.62s both' }} />
            <circle cx="84"  cy="174" r="3.5" fill="#F472B6" opacity="0.65" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.67s both' }} />

            {/* Cluster 2 — main right tip (200, 167) */}
            <circle cx="195" cy="162" r="5"   fill="#F9A8D4" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.41s both' }} />
            <circle cx="202" cy="157" r="4"   fill="#FCE7F3" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.47s both' }} />
            <circle cx="207" cy="165" r="4.5" fill="#FBCFE8" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.53s both' }} />
            <circle cx="198" cy="172" r="4"   fill="#F9A8D4" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.59s both' }} />
            <circle cx="192" cy="167" r="3.5" fill="#FCE7F3" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.65s both' }} />
            <circle cx="204" cy="174" r="3.5" fill="#F472B6" opacity="0.65" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.70s both' }} />

            {/* Cluster 3 — mid left tip (90, 134) */}
            <circle cx="85"  cy="129" r="4.5" fill="#FBCFE8" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.48s both' }} />
            <circle cx="92"  cy="124" r="4"   fill="#F9A8D4" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.54s both' }} />
            <circle cx="97"  cy="132" r="4"   fill="#FCE7F3" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.60s both' }} />
            <circle cx="88"  cy="139" r="3.5" fill="#F9A8D4" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.66s both' }} />
            <circle cx="82"  cy="133" r="3.5" fill="#FBCFE8" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.72s both' }} />

            {/* Cluster 4 — mid right tip (190, 134) */}
            <circle cx="185" cy="129" r="4.5" fill="#F9A8D4" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.51s both' }} />
            <circle cx="192" cy="124" r="4"   fill="#FBCFE8" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.57s both' }} />
            <circle cx="197" cy="132" r="4"   fill="#FCE7F3" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.63s both' }} />
            <circle cx="188" cy="139" r="3.5" fill="#F9A8D4" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.69s both' }} />
            <circle cx="182" cy="133" r="3.5" fill="#F472B6" opacity="0.65" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.75s both' }} />

            {/* Cluster 5 — upper left tip (102, 103) */}
            <circle cx="97"  cy="98"  r="4.5" fill="#FCE7F3" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.57s both' }} />
            <circle cx="104" cy="93"  r="4"   fill="#F9A8D4" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.63s both' }} />
            <circle cx="109" cy="101" r="4"   fill="#FBCFE8" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.69s both' }} />
            <circle cx="100" cy="108" r="3.5" fill="#FCE7F3" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.75s both' }} />
            <circle cx="94"  cy="102" r="3.5" fill="#F9A8D4" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.81s both' }} />

            {/* Cluster 6 — upper right tip (178, 103) */}
            <circle cx="173" cy="98"  r="4.5" fill="#F9A8D4" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.60s both' }} />
            <circle cx="180" cy="93"  r="4"   fill="#FCE7F3" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.66s both' }} />
            <circle cx="185" cy="101" r="4"   fill="#FBCFE8" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.72s both' }} />
            <circle cx="176" cy="108" r="3.5" fill="#F9A8D4" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.78s both' }} />
            <circle cx="170" cy="102" r="3.5" fill="#F472B6" opacity="0.65" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.84s both' }} />

            {/* Cluster 7 — sub left tip (110, 83) */}
            <circle cx="105" cy="78"  r="4"   fill="#FBCFE8" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.66s both' }} />
            <circle cx="112" cy="73"  r="3.5" fill="#F9A8D4" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.72s both' }} />
            <circle cx="116" cy="81"  r="3.5" fill="#FCE7F3" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.78s both' }} />
            <circle cx="108" cy="88"  r="3.5" fill="#FBCFE8" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.84s both' }} />

            {/* Cluster 8 — sub right tip (170, 83) */}
            <circle cx="165" cy="78"  r="4"   fill="#F9A8D4" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.69s both' }} />
            <circle cx="172" cy="73"  r="3.5" fill="#FBCFE8" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.75s both' }} />
            <circle cx="176" cy="81"  r="3.5" fill="#FCE7F3" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.81s both' }} />
            <circle cx="168" cy="88"  r="3.5" fill="#F9A8D4" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.87s both' }} />

            {/* Cluster 9 — top left twig tip (116, 65) */}
            <circle cx="111" cy="60"  r="3.5" fill="#FCE7F3" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.74s both' }} />
            <circle cx="118" cy="55"  r="3"   fill="#F9A8D4" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.80s both' }} />
            <circle cx="122" cy="63"  r="3.5" fill="#FBCFE8" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.86s both' }} />
            <circle cx="114" cy="69"  r="3"   fill="#FCE7F3" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.92s both' }} />

            {/* Cluster 10 — top right twig tip (164, 65) */}
            <circle cx="159" cy="60"  r="3.5" fill="#F9A8D4" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.77s both' }} />
            <circle cx="166" cy="55"  r="3"   fill="#FCE7F3" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.83s both' }} />
            <circle cx="170" cy="63"  r="3.5" fill="#FBCFE8" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.89s both' }} />
            <circle cx="162" cy="69"  r="3"   fill="#F9A8D4" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.95s both' }} />

            {/* Cluster 11 — center top left (124, 53) */}
            <circle cx="119" cy="48"  r="3.5" fill="#FBCFE8" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.82s both' }} />
            <circle cx="126" cy="43"  r="3"   fill="#F9A8D4" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.88s both' }} />
            <circle cx="130" cy="51"  r="3"   fill="#FCE7F3" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.94s both' }} />

            {/* Cluster 12 — center top right (156, 53) */}
            <circle cx="151" cy="48"  r="3.5" fill="#F9A8D4" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.85s both' }} />
            <circle cx="158" cy="43"  r="3"   fill="#FBCFE8" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.91s both' }} />
            <circle cx="162" cy="51"  r="3"   fill="#FCE7F3" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.97s both' }} />

            {/* A few scattered mid-branch accent blossoms */}
            <circle cx="118" cy="148" r="3"   fill="#F9A8D4" opacity="0.7" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.62s both' }} />
            <circle cx="162" cy="145" r="3"   fill="#FBCFE8" opacity="0.7" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.65s both' }} />
            <circle cx="106" cy="118" r="2.5" fill="#FCE7F3" opacity="0.7" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.76s both' }} />
            <circle cx="174" cy="116" r="2.5" fill="#F9A8D4" opacity="0.7" className="cb-blossom" style={{ animation: 'cb-bloom 0.38s ease-out 1.79s both' }} />
          </svg>
        </div>

        {/* Logo */}
        <h1 className="text-5xl font-serif mb-4 logo-glow-pulse" style={{ color: '#8B5E6A' }}>
          Heirloom
        </h1>

        {/* Tagline */}
        <p className="text-stone-500 text-lg mb-2 leading-relaxed">
          Leave nothing behind. Organize your digital life into one secure vault
          for the people you love.
        </p>

        {/* Symbolic subtitle */}
        <p className="text-stone-400 text-sm mb-10 italic">
          Every life tells a story worth keeping.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg px-8 h-10 text-sm font-medium text-white transition-opacity hover:opacity-90 shadow-sm"
            style={{ backgroundColor: '#8B5E6A' }}
          >
            Owner Login
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg px-8 h-10 text-sm font-medium border border-stone-300 bg-card text-stone-700 hover:bg-background transition-colors shadow-sm"
          >
            Beneficiary Login
          </Link>
        </div>

        <p className="mt-8 text-sm text-stone-400">
          New here?{' '}
          <Link href="/signup" className="underline" style={{ color: '#8B5E6A' }}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

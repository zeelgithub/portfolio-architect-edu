"use client"

// Connection types, each with its own color and arrowhead
const C = {
  call:    { color: "#334155", id: "lt-call" },
  approve: { color: "#ea580c", id: "lt-approve" },
  ai:      { color: "#7c3aed", id: "lt-ai" },
  halt:    { color: "#94a3b8", id: "lt-halt" },
}
type Kind = keyof typeof C

function Box({ x, y, w, h, title, sub, fill = "#ffffff", stroke = "#7dd3fc", color = "#0c4a6e", dash }: {
  x: number; y: number; w: number; h: number
  title: string; sub?: string; fill?: string; stroke?: string; color?: string; dash?: string
}) {
  const cx = x + w / 2
  const cy = y + h / 2
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={fill} stroke={stroke} strokeWidth="1.3" strokeDasharray={dash} />
      <text x={cx} y={sub ? cy - 3 : cy + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={color}>{title}</text>
      {sub && <text x={cx} y={cy + 13} textAnchor="middle" fontSize="9.5" fill="#475569">{sub}</text>}
    </g>
  )
}

function Edge({ d, kind, both = false, halo = false }: { d: string; kind: Kind; both?: boolean; halo?: boolean }) {
  const { color, id } = C[kind]
  const dotted = kind === "halt"
  return (
    <g>
      {halo && <path d={d} fill="none" stroke="#ffffff" strokeWidth="6" />}
      <path d={d} fill="none" stroke={color} strokeWidth={dotted ? 1.4 : 1.6} strokeDasharray={dotted ? "2 3" : undefined}
        markerEnd={dotted ? undefined : `url(#${id})`} markerStart={both ? `url(#${id})` : undefined} />
    </g>
  )
}

function Chip({ x, y, w, label }: { x: number; y: number; w: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="26" rx="6" fill="#ffffff" stroke="#fdba74" strokeWidth="1" />
      <text x={x + w / 2} y={y + 17} textAnchor="middle" fontSize="10" fill="#7c2d12">{label}</text>
    </g>
  )
}

const AI = { stroke: "#a78bfa", color: "#4c1d95" }
const SRC = { stroke: "#7dd3fc", color: "#0c4a6e" }
const EXT = { fill: "#f8fafc", stroke: "#94a3b8", color: "#334155", dash: "5 3" }

export default function LiveTradingBotDiagram() {
  return (
    <div className="rounded-xl border bg-white dark:bg-gray-900 p-4">
      <svg viewBox="0 0 1000 560" className="block w-full h-auto">
        <defs>
          {Object.values(C).map(({ color, id }) => (
            <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5"
              markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
            </marker>
          ))}
        </defs>

        {/* ── Cognitive plane (optional, propose-only) ── */}
        <rect x="20" y="12" width="600" height="88" rx="10" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1.3" />
        <text x="35" y="31" fontSize="12" fontWeight="700" fill="#4c1d95">AI Assistant Layer · Claude (optional)</text>
        <rect x="448" y="4" width="160" height="17" rx="5" fill="#7c3aed" />
        <text x="528" y="16" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="white">can suggest, never trade</text>
        <Box x={35}  y={42} w={140} h={46} title="Command Parser" sub="plain-English commands" {...AI} />
        <Box x={180} y={42} w={140} h={46} title="Incident Triage" sub="explains trading halts" {...AI} />
        <Box x={325} y={42} w={140} h={46} title="Strategy Analyst" sub="suggests strategy changes" {...AI} />
        <Box x={470} y={42} w={140} h={46} title="Data Connectors" sub="3 MCP servers" {...AI} />

        {/* ── Owner + phone control ── */}
        <rect x="800" y="18" width="110" height="28" rx="14" fill="#0f172a" />
        <text x="855" y="36" textAnchor="middle" fontSize="12" fontWeight="700" fill="white">Owner</text>
        <Edge d="M835 46 L835 70" kind="call" />
        <Edge d="M875 70 L875 46" kind="call" />
        <Box x={770} y={70} w={170} h={50} title="Telegram Control" sub="approve or reject trades" fill="#f8fafc" stroke="#cbd5e1" color="#334155" />

        {/* ── Proposal sources (many) ── */}
        <Box x={20} y={130} w={180} h={46} title="Market Data" sub="daily prices and indicators" {...SRC} />
        <Edge d="M110 176 L110 200" kind="call" />
        <Box x={20} y={200} w={180} h={56} title="Trading Strategies" sub="trend, breakout, mean reversion" {...SRC} />
        <Box x={20} y={275} w={180} h={50} title="Idea Discovery" sub="scans ~4,000 stocks" {...SRC} />
        <Box x={20} y={345} w={180} h={50} title="Phone Orders" sub="manual buys from the phone" {...SRC} />
        <Box x={20} y={415} w={180} h={50} title="Strategy Changes" sub="suggested by AI or owner" {...SRC} />

        <Box x={222} y={210} w={96} h={40} title="News Check" sub="reduce / block" {...SRC} />
        <Edge d="M200 230 L222 230" kind="call" />
        <Edge d="M318 230 L340 230" kind="call" />
        <Edge d="M200 300 L340 300" kind="call" />
        <Edge d="M200 370 L340 370" kind="call" />
        <Edge d="M200 440 L340 440" kind="call" />
        <text x="270" y="293" textAnchor="middle" fontSize="9" fill="#334155">trade ideas</text>

        {/* ── Risk gatekeeper (one) ── */}
        <rect x="340" y="130" width="160" height="335" rx="12" fill="#fff7ed" stroke="#fb923c" strokeWidth="1.8" />
        <text x="420" y="152" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7c2d12">Risk Gatekeeper</text>
        <text x="420" y="167" textAnchor="middle" fontSize="9.5" fill="#475569">rule-based · can only reject</text>
        {[
          "daily loss limit",
          "total risk limit",
          "correlated risk limit",
          "position size limits",
          "price sanity check",
          "order rate limits",
        ].map((l, i) => (
          <Chip key={l} x={350} y={180 + i * 36} w={140} label={l} />
        ))}
        <text x="420" y="412" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7c2d12">approve · resize · reject</text>
        <text x="420" y="428" textAnchor="middle" fontSize="9" fill="#475569">never starts a trade</text>

        {/* ── Approval loop ── */}
        <Edge d="M500 150 L720 150 L720 95 L770 95" kind="approve" halo />
        <text x="585" y="143" fontSize="9" fontWeight="700" fill="#ea580c">trade for approval</text>
        <Edge d="M800 120 L800 215 L660 215 L660 250" kind="approve" />
        <text x="808" y="190" fontSize="9" fontWeight="700" fill="#ea580c">owner approves</text>
        <text x="808" y="201" fontSize="9" fill="#ea580c">(risk checked again)</text>

        {/* ── Execution (the only component that acts) ── */}
        <Box x={580} y={250} w={160} h={60} title="Order Manager" sub="the only part that can trade" fill="#dcfce7" stroke="#86efac" color="#14532d" />
        <Edge d="M740 280 L800 280" kind="call" both />
        <text x="746" y="273" fontSize="9" fill="#334155">orders · fills</text>
        <Box x={800} y={250} w={180} h={60} title="Alpaca Broker" sub="paper account · stop orders" {...EXT} />

        {/* ── Reconciliation loop ── */}
        <Edge d="M890 310 L890 345" kind="call" />
        <Box x={800} y={345} w={180} h={50} title="Reconciler" sub="checks against the broker" {...SRC} />
        <Edge d="M800 370 L740 370" kind="call" />
        <Box x={580} y={345} w={160} h={50} title="State Store" sub="positions, halts, audit log" {...SRC} />
        <Edge d="M580 370 L500 370" kind="call" halo />
        <text x="508" y="364" fontSize="9" fill="#334155">current positions</text>

        {/* AI reads state */}
        <Edge d="M560 100 L560 330 L610 330 L610 345" kind="ai" halo />
        <text x="566" y="240" fontSize="9" fontWeight="700" fill="#7c3aed">reads state</text>

        {/* ── Orchestrator / default-to-halt ── */}
        {[110, 420, 660, 890].map((x) => (
          <Edge key={x} d={`M${x} ${x === 110 ? 465 : x === 420 ? 465 : 395} L${x} 495`} kind="halt" />
        ))}
        <rect x="20" y="495" width="960" height="50" rx="10" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="5 3" />
        <text x="500" y="515" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">Orchestrator · stops safely on any problem</text>
        <text x="500" y="532" textAnchor="middle" fontSize="9.5" fill="#475569">halts on a lost connection, stale data, a mismatch with the broker, or an error · resumes automatically only after connection or data issues</text>
      </svg>
      <p className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        Several sources can suggest a trade, but every suggestion passes the same rule-based risk check and the owner{"'"}s approval before the one component allowed to trade acts. Every fill is checked against the broker, and any problem stops the system safely.
      </p>
    </div>
  )
}

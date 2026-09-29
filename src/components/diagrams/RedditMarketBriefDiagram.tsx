"use client"

// One color per skill; its lines show which collectors that skill uses
const K = {
  reddit:   "#16a34a",
  analysis: "#7c3aed",
  daily:    "#d97706",
  call:     "#334155",
}
type Key = keyof typeof K

function Box({ x, y, w, h, title, sub, fill = "#ffffff", stroke = "#7dd3fc", color = "#0c4a6e", dash, strokeWidth = 1.3 }: {
  x: number; y: number; w: number; h: number
  title: string; sub?: string; fill?: string; stroke?: string; color?: string; dash?: string; strokeWidth?: number
}) {
  const cx = x + w / 2
  const cy = y + h / 2
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={dash} />
      <text x={cx} y={sub ? cy - 3 : cy + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={color}>{title}</text>
      {sub && <text x={cx} y={cy + 13} textAnchor="middle" fontSize="9.5" fill="#475569">{sub}</text>}
    </g>
  )
}

function Line({ d, k, head = true, both = false }: { d: string; k: Key; head?: boolean; both?: boolean }) {
  return (
    <path d={d} fill="none" stroke={K[k]} strokeWidth="1.8"
      markerEnd={head ? `url(#rmb-${k})` : undefined} markerStart={both ? `url(#rmb-${k})` : undefined} />
  )
}

const TOOL = { fill: "#f0fdf4", stroke: "#86efac", color: "#14532d" }
const CONN = { fill: "#eef2ff", stroke: "#818cf8", color: "#3730a3" }
const EXT = { fill: "#fff7ed", stroke: "#fdba74", color: "#7c2d12" }

export default function RedditMarketBriefDiagram() {
  const lanes = [
    { y: 100, tool: ["Reddit Collector", "Python · paged · rate-limited"], conn: ["Composio", "managed Reddit OAuth"], ext: ["Reddit API", "22 subreddits"] },
    { y: 175, tool: ["Market Data Client", "Python · prices · filings"],   conn: ["Direct HTTPS", "public endpoints"],   ext: ["Market & Filings", "Google · Yahoo · SEC"] },
    { y: 250, tool: ["Web Search", "agent · dated queries"],             conn: ["Claude Web Tools", "search · fetch"],  ext: ["News Outlets", "since the last close"] },
    { y: 325, tool: ["Browser", "agent · page extraction"],              conn: ["Browser MCP", "built-in browser"],    ext: ["Capitol Trades", "Congress disclosures"] },
  ]

  return (
    <div className="rounded-xl border bg-white dark:bg-gray-900 p-4">
      <svg viewBox="0 0 1000 510" className="block w-full h-auto">
        <defs>
          {(Object.keys(K) as Key[]).map((k) => (
            <marker key={k} id={`rmb-${k}`} viewBox="0 0 10 10" refX="9" refY="5"
              markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={K[k]} />
            </marker>
          ))}
        </defs>

        {/* ── User ── */}
        <rect x="30" y="20" width="110" height="28" rx="14" fill="#0f172a" />
        <text x="85" y="38" textAnchor="middle" fontSize="12" fontWeight="700" fill="white">User</text>
        <Line d="M85 48 L85 70" k="call" />

        {/* ── Agent with its three skills ── */}
        <rect x="20" y="70" width="280" height="395" rx="12" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1.6" />
        <text x="160" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0c4a6e">Claude Code Agent</text>
        <Box x={40} y={110} w={240} h={50} title="/reddit-daily" sub="market-wide Reddit brief" stroke={K.reddit} strokeWidth={2} color="#14532d" />
        <Box x={40} y={190} w={240} h={50} title="/stock-analysis" sub="one stock or ETF, in depth" stroke={K.analysis} strokeWidth={2} color="#4c1d95" />
        <Box x={40} y={270} w={240} h={50} title="/stock-daily" sub="news + Congress trades" stroke={K.daily} strokeWidth={2} color="#78350f" />

        <rect x="40" y="345" width="240" height="105" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
        <text x="160" y="366" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Context</text>
        <text x="160" y="386" textAnchor="middle" fontSize="9.5" fill="#475569">skill workflows (SKILL.md)</text>
        <text x="160" y="404" textAnchor="middle" fontSize="9.5" fill="#475569">standing scope: watchlist + sources</text>
        <text x="160" y="422" textAnchor="middle" fontSize="9.5" fill="#475569">sector analysis playbooks</text>
        <text x="160" y="440" textAnchor="middle" fontSize="9.5" fill="#475569">no numbers from memory</text>

        {/* ── Skill → collector wiring (many-to-many) ── */}
        <Line d="M280 135 L320 135 L320 118 L440 118" k="reddit" />
        <Line d="M280 215 L350 215 L350 132 L440 132" k="analysis" />
        <Line d="M350 200 L440 200" k="analysis" />
        <Line d="M350 215 L350 268 L440 268" k="analysis" />
        <Line d="M280 295 L380 295 L380 282 L440 282" k="daily" />
        <Line d="M380 282 L380 350 L440 350" k="daily" />

        {/* ── Collectors → connectors → external data ── */}
        <text x="520" y="88" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="1.2" fill="#64748b">COLLECTORS</text>
        <text x="695" y="88" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="1.2" fill="#64748b">CONNECTORS</text>
        <rect x="785" y="94" width="195" height="290" rx="12" fill="none" stroke="#f87171" strokeWidth="1.5" strokeDasharray="7 4" />
        <rect x="812" y="85" width="140" height="18" rx="5" fill="#dc2626" />
        <text x="882" y="98" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="white">untrusted input</text>

        {lanes.map(({ y, tool, conn, ext }) => (
          <g key={tool[0]}>
            <Box x={440} y={y} w={160} h={50} title={tool[0]} sub={tool[1]} {...TOOL} />
            <Line d={`M600 ${y + 25} L630 ${y + 25}`} k="call" both />
            <Box x={630} y={y} w={130} h={50} title={conn[0]} sub={conn[1]} {...CONN} />
            <Line d={`M760 ${y + 25} L800 ${y + 25}`} k="call" both />
            <Box x={800} y={y} w={165} h={50} title={ext[0]} sub={ext[1]} {...EXT} />
          </g>
        ))}

        {/* ── Output ── */}
        <Line d="M300 432 L440 432" k="call" />
        <text x="370" y="425" textAnchor="middle" fontSize="9" fill="#334155">synthesize</text>
        <Box x={440} y={405} w={300} h={55} title="Sourced Brief in Chat" sub="every figure cited and dated" fill="#e0f2fe" stroke="#0284c7" />
        <Line d="M740 432 L770 432" k="call" />
        <Box x={770} y={405} w={210} h={55} title="Coverage Report" sub="what was read, skipped, and why" fill="#e0f2fe" stroke="#0284c7" />

        {/* brief returns to the user */}
        <Line d="M590 460 L590 495 L10 495 L10 34 L30 34" k="call" />
        <text x="300" y="490" textAnchor="middle" fontSize="9" fill="#334155">brief delivered in chat</text>
      </svg>
      <p className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        Each command runs a skill that reaches only the collectors it needs; /stock-analysis alone draws on Reddit, market data, and the web. Everything fetched crosses a trust boundary and is treated as data, and every brief ends with a coverage report.
      </p>
    </div>
  )
}

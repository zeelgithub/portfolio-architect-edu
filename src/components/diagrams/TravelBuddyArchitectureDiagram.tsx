"use client"

// Connection types, each with its own color and arrowhead
const C = {
  call: { color: "#334155", id: "tb-call" },
  hand: { color: "#ea580c", id: "tb-hand" },
  llm:  { color: "#7c3aed", id: "tb-llm" },
  api:  { color: "#0284c7", id: "tb-api" },
  geo:  { color: "#0d9488", id: "tb-geo" },
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

function Edge({ d, kind, both = false, halo = false, head = true }: {
  d: string; kind: Kind; both?: boolean; halo?: boolean; head?: boolean
}) {
  const { color, id } = C[kind]
  return (
    <g>
      {halo && <path d={d} fill="none" stroke="#ffffff" strokeWidth="6" />}
      <path d={d} fill="none" stroke={color} strokeWidth="1.6"
        markerEnd={head ? `url(#${id})` : undefined} markerStart={both ? `url(#${id})` : undefined} />
    </g>
  )
}

const SPEC = { stroke: "#7dd3fc", color: "#0c4a6e" }
const TOOL = { fill: "#dcfce7", stroke: "#86efac", color: "#14532d" }
const API  = { fill: "#f8fafc", stroke: "#94a3b8", color: "#334155", dash: "5 3" }

export default function TravelBuddyArchitectureDiagram() {
  const rows = [
    { y: 140, agent: "Map Routing", tool: ["Route Tool", "turn-by-turn directions"], api: ["ORS Directions", "OpenRouteService"] },
    { y: 245, agent: "EV Charging", tool: ["Charging Tool", "stations + pricing"], api: ["Open Charge Map", "charging stations"] },
    { y: 350, agent: "Attractions", tool: ["Places Tool", "top places nearby"], api: ["Foursquare Places", "points of interest"] },
  ]

  return (
    <div className="rounded-xl border bg-white dark:bg-gray-900 p-4">
      <svg viewBox="0 0 1000 500" className="block w-full h-auto">
        <defs>
          {Object.values(C).map(({ color, id }) => (
            <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5"
              markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
            </marker>
          ))}
        </defs>

        {/* ── Client ── */}
        <rect x="25" y="40" width="110" height="28" rx="14" fill="#0f172a" />
        <text x="80" y="58" textAnchor="middle" fontSize="12" fontWeight="700" fill="white">Traveler</text>
        <Edge d="M60 68 L60 110" kind="call" />
        <Edge d="M100 110 L100 68" kind="call" />
        <Box x={15} y={110} w={130} h={60} title="Streamlit UI" sub="query · streamed updates" fill="#f8fafc" stroke="#cbd5e1" color="#334155" />
        <Edge d="M145 130 L190 130" kind="call" />
        <text x="149" y="125" fontSize="9" fill="#334155">query</text>
        <Edge d="M190 152 L145 152" kind="call" />
        <text x="149" y="165" fontSize="9" fill="#334155">updates</text>

        {/* ── Model ── */}
        <rect x="190" y="12" width="430" height="66" rx="10" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1.3" />
        <Box x={215} y={24} w={380} h={44} title="GPT-4o (OpenAI)" sub="reasoning for the supervisor and all three specialists" stroke="#a78bfa" color="#4c1d95" />
        <Edge d="M400 78 L400 105" kind="llm" both />
        <text x="408" y="96" fontSize="9" fill="#7c3aed">reasoning</text>

        {/* ── Agent graph ── */}
        <rect x="190" y="105" width="430" height="365" rx="12" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1.6" />
        <text x="605" y="125" textAnchor="end" fontSize="13" fontWeight="700" fill="#0c4a6e">LangGraph Multi-Agent Graph</text>

        <Box x={215} y={240} w={130} h={60} title="Supervisor" sub="routes each request" fill="#fff7ed" stroke="#fb923c" color="#7c2d12" />
        <Edge d="M280 300 L280 338" kind="call" />
        <rect x="215" y="338" width="130" height="28" rx="14" fill="#dcfce7" stroke="#86efac" />
        <text x="280" y="356" textAnchor="middle" fontSize="10" fontWeight="700" fill="#14532d">final response</text>

        {/* one-to-many handoffs, many-to-one returns */}
        {rows.map((r) => (
          <Edge key={r.agent} d={`M345 270 L392 270 L392 ${r.y + 25} L440 ${r.y + 25}`} kind="hand" both />
        ))}
        <text x="398" y="215" fontSize="9" fontWeight="700" fill="#ea580c">handoff</text>
        <text x="398" y="226" fontSize="9" fontWeight="700" fill="#ea580c">+ return</text>

        {rows.map((r) => (
          <Box key={r.agent} x={440} y={r.y} w={160} h={50} title={r.agent} sub="one tool · live data" {...SPEC} />
        ))}

        <rect x="205" y="420" width="400" height="36" rx="6" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="5 3" />
        <text x="405" y="442" textAnchor="middle" fontSize="10" fill="#334155">
          <tspan fontWeight="700">Shared conversation history</tspan> · carried through every handoff
        </text>

        {/* ── Tools + live APIs ── */}
        <text x="725" y="125" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="1.2" fill="#64748b">TOOLS</text>
        <text x="912" y="125" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="1.2" fill="#64748b">LIVE APIS</text>

        {/* shared geocoding bus */}
        <Edge d="M818 176 L818 460 L845 460" kind="geo" />
        <text x="824" y="425" fontSize="9" fontWeight="700" fill="#0d9488">geocode</text>

        {rows.map((r) => (
          <g key={r.tool[0]}>
            <Edge d={`M600 ${r.y + 25} L650 ${r.y + 25}`} kind="call" both />
            <Box x={650} y={r.y} w={150} h={50} title={r.tool[0]} sub={r.tool[1]} {...TOOL} />
            <Edge d={`M800 ${r.y + 36} L818 ${r.y + 36}`} kind="geo" head={false} />
            <Edge d={`M800 ${r.y + 16} L845 ${r.y + 16}`} kind="api" both halo />
            <Box x={845} y={r.y - 4} w={135} h={44} title={r.api[0]} sub={r.api[1]} {...API} />
          </g>
        ))}
        <Box x={845} y={438} w={135} h={44} title="ORS Geocoding" sub="place → coordinates" {...API} />
      </svg>
      <p className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        The supervisor hands each part of a request to the right specialist and gets control back after every step. Each specialist answers only from its tool, and all three tools share one geocoding step before calling their live API.
      </p>
    </div>
  )
}

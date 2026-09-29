"use client"

// Connection types, each with its own color and arrowhead
const C = {
  call: { color: "#334155", id: "sc-call" },
  self: { color: "#0d9488", id: "sc-self" },
  data: { color: "#16a34a", id: "sc-data" },
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

function Edge({ d, kind, both = false }: { d: string; kind: Kind; both?: boolean }) {
  const { color, id } = C[kind]
  return (
    <path d={d} fill="none" stroke={color} strokeWidth="1.6" strokeDasharray={kind === "self" ? "6 3" : undefined}
      markerEnd={`url(#${id})`} markerStart={both ? `url(#${id})` : undefined} />
  )
}

function Chip({ x, y, w, label, stroke = "#cbd5e1", color = "#334155" }: {
  x: number; y: number; w: number; label: string; stroke?: string; color?: string
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="28" rx="6" fill="#ffffff" stroke={stroke} strokeWidth="1" />
      <text x={x + w / 2} y={y + 18} textAnchor="middle" fontSize="10" fill={color}>{label}</text>
    </g>
  )
}

const HARNESS = { fill: "#ffffff", stroke: "#cbd5e1", color: "#334155" }
const GUARD = { stroke: "#a78bfa", color: "#4c1d95" }

export default function SupplyChainSecurityDiagram() {
  return (
    <div className="rounded-xl border bg-white dark:bg-gray-900 p-4">
      <svg viewBox="0 0 1000 530" className="block w-full h-auto">
        <defs>
          {Object.values(C).map(({ color, id }) => (
            <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5"
              markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
            </marker>
          ))}
        </defs>

        {/* ── Experiment harness ── */}
        <rect x="20" y="12" width="960" height="88" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.3" />
        <rect x="32" y="4" width="130" height="17" rx="5" fill="#334155" />
        <text x="97" y="16" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="white">Experiment Harness</text>
        <Box x={35}  y={32} w={220} h={52} title="Task Suite" sub="24 tasks · 3 tiers · organic / adversarial" {...HARNESS} />
        <Box x={270} y={32} w={220} h={52} title="Session Runner" sub="48 Claude sessions · guard on / off" {...HARNESS} />
        <Box x={505} y={32} w={220} h={52} title="Intervention Prompts" sub="soft appeal vs. procedural check" {...HARNESS} />
        <Box x={740} y={32} w={225} h={52} title="Cross-Model Harness" sub="same tasks on llama3.1:8b" {...HARNESS} />
        <Edge d="M60 100 L60 150" kind="call" />

        {/* ── Agents ── */}
        <Box x={20} y={150} w={170} h={64} title="Claude Code Agent" sub="headless sessions" />
        <Box x={20} y={245} w={170} h={56} title="Local 8B Agent" sub="llama3.1:8b via Ollama" />
        <Edge d="M190 182 L240 182" kind="call" both />
        <text x="193" y="176" fontSize="9" fill="#334155">check</text>
        <Edge d="M190 273 L240 273" kind="call" both />
        <text x="193" y="267" fontSize="9" fill="#334155">check</text>

        {/* the key finding: the agent verifying on its own */}
        <Edge d="M150 150 L150 115 L835 115 L835 125" kind="self" />
        <text x="480" y="110" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0d9488">
          agent{"'"}s own read-only check (npm view, pip index) · 100% on suspicious names, 19.4% otherwise
        </text>

        {/* ── Install guard ── */}
        <rect x="240" y="125" width="400" height="275" rx="12" fill="#faf5ff" stroke="#a78bfa" strokeWidth="1.6" />
        <text x="255" y="145" fontSize="12" fontWeight="700" fill="#4c1d95">Install Guard · Claude Code PreToolUse hook</text>
        <Box x={260} y={160} w={170} h={50} title="Command Parser" sub="extracts package names" {...GUARD} />
        <Box x={450} y={160} w={170} h={50} title="Registry Client" sub="live lookups, 5 ecosystems" {...GUARD} />
        <Box x={450} y={245} w={170} h={50} title="Risk Scorer" sub="age · downloads · typosquat" {...GUARD} />
        <Box x={260} y={245} w={170} h={50} title="Allow · Warn · Deny" sub="deny only if nonexistent" fill="#fff7ed" stroke="#fb923c" color="#7c2d12" />
        <Edge d="M430 185 L450 185" kind="call" />
        <Edge d="M535 210 L535 245" kind="call" />
        <Edge d="M450 270 L430 270" kind="call" />
        <Edge d="M345 295 L345 330" kind="call" />
        <Box x={260} y={330} w={360} h={44} title="Decision Logger" sub="every decision, with timing, one log per session" {...GUARD} />

        {/* ── Registries ── */}
        <rect x="690" y="125" width="290" height="275" rx="12" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.3" strokeDasharray="6 3" />
        <text x="835" y="147" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Live Package Registries</text>
        {["npm", "PyPI", "crates.io", "RubyGems", "Go module proxy"].map((l, i) => (
          <Chip key={l} x={705} y={160 + i * 38} w={260} label={l} />
        ))}
        <text x="835" y="384" textAnchor="middle" fontSize="9.5" fill="#475569">median 477 ms per checked install</text>
        <Edge d="M620 185 L690 185" kind="call" both />
        <text x="626" y="178" fontSize="9" fill="#334155">exists?</text>

        {/* ── Analysis ── */}
        <Edge d="M105 301 L105 430" kind="data" />
        <text x="111" y="370" fontSize="9" fontWeight="700" fill="#16a34a">transcripts</text>
        <Edge d="M440 374 L440 430" kind="data" />
        <text x="446" y="408" fontSize="9" fontWeight="700" fill="#16a34a">decisions</text>

        <rect x="20" y="430" width="960" height="86" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.3" />
        <text x="35" y="452" fontSize="12" fontWeight="700" fill="#14532d">Analysis · rates with 95% confidence intervals</text>
        {[
          "Self-verification rate",
          "Task success (re-run)",
          "Guard decisions + latency",
          "Intervention effect",
          "Cross-model comparison",
        ].map((l, i) => (
          <Chip key={l} x={35 + i * 188} y={470} w={180} label={l} stroke="#86efac" color="#14532d" />
        ))}
      </svg>
      <p className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        Every install command an agent issues passes the guard before it runs: nonexistent packages are blocked and risky ones are logged. The same guard doubles as instrumentation, and the key finding sits on the dashed path, where Claude usually checks a suspicious package itself before the guard ever has to act.
      </p>
    </div>
  )
}

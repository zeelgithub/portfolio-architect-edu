"use client"

// Connection types, each with its own color and arrowhead
const C = {
  call:  { color: "#334155", id: "dbg-call" },
  flow:  { color: "#0284c7", id: "dbg-flow" },
  retry: { color: "#d97706", id: "dbg-retry" },
  llm:   { color: "#7c3aed", id: "dbg-llm" },
}
type Kind = keyof typeof C

function Box({ x, y, w, h, title, sub, fill = "#ffffff", stroke = "#7dd3fc", color = "#0c4a6e" }: {
  x: number; y: number; w: number; h: number
  title: string; sub?: string; fill?: string; stroke?: string; color?: string
}) {
  const cx = x + w / 2
  const cy = y + h / 2
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={fill} stroke={stroke} strokeWidth="1.3" />
      <text x={cx} y={sub ? cy - 3 : cy + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={color}>{title}</text>
      {sub && <text x={cx} y={cy + 13} textAnchor="middle" fontSize="9.5" fill="#475569">{sub}</text>}
    </g>
  )
}

function Edge({ d, kind, both = false }: { d: string; kind: Kind; both?: boolean }) {
  const { color, id } = C[kind]
  return (
    <path d={d} fill="none" stroke={color} strokeWidth="1.6" strokeDasharray={kind === "retry" ? "6 3" : undefined}
      markerEnd={`url(#${id})`} markerStart={both ? `url(#${id})` : undefined} />
  )
}

function Chip({ x, y, w, label, stroke = "#cbd5e1", color = "#334155" }: {
  x: number; y: number; w: number; label: string; stroke?: string; color?: string
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="24" rx="6" fill="#ffffff" stroke={stroke} strokeWidth="1" />
      <text x={x + w / 2} y={y + 16} textAnchor="middle" fontSize="10" fill={color}>{label}</text>
    </g>
  )
}

const GUARD = { fill: "#f5f3ff", stroke: "#a78bfa", color: "#4c1d95" }
const CTRL = { fill: "#fff7ed", stroke: "#fb923c", color: "#7c2d12" }
const MODEL = { stroke: "#a78bfa", color: "#4c1d95" }

export default function AutonomousDebuggerArchitectureDiagram() {
  return (
    <div className="rounded-xl border bg-white dark:bg-gray-900 p-4">
      <svg viewBox="0 0 1000 565" className="block w-full h-auto">
        <defs>
          {Object.values(C).map(({ color, id }) => (
            <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5"
              markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
            </marker>
          ))}
        </defs>

        {/* ── Client ── */}
        <rect x="35" y="40" width="110" height="28" rx="14" fill="#0f172a" />
        <text x="90" y="58" textAnchor="middle" fontSize="12" fontWeight="700" fill="white">Engineer</text>
        <Edge d="M70 68 L70 115" kind="call" />
        <Edge d="M110 115 L110 68" kind="call" />
        <Box x={20} y={115} w={140} h={64} title="Streamlit UI" sub="repo · trace · logs · model" fill="#f8fafc" stroke="#cbd5e1" color="#334155" />
        <Edge d="M160 138 L190 138" kind="call" />
        <text x="163" y="133" fontSize="9" fill="#334155">invoke</text>
        <Edge d="M190 160 L160 160" kind="call" />
        <text x="163" y="173" fontSize="9" fill="#334155">result</text>

        {/* ── Model layer ── */}
        <rect x="190" y="12" width="570" height="80" rx="10" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1.3" />
        <text x="205" y="31" fontSize="12" fontWeight="700" fill="#4c1d95">Model Layer · OpenAI or Ollama, selected at runtime</text>
        <Box x={220} y={40} w={520} h={44} title="Chat Model" sub="structured output for all five agents" {...MODEL} />
        <Box x={790} y={20} w={190} h={64} title="Safety Classifier" sub="llama3.1:8b · safe or unsafe" {...MODEL} />

        {/* ── Orchestrator ── */}
        <rect x="190" y="115" width="570" height="355" rx="12" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1.6" />
        <text x="205" y="135" fontSize="13" fontWeight="700" fill="#0c4a6e">LangGraph StateGraph</text>

        {/* analysis: runs once */}
        <Box x={205} y={150} w={120} h={44} title="Input Guardrail" sub="required context" {...GUARD} />
        <Box x={340} y={150} w={120} h={44} title="Planner" sub="debug plan" />
        <Box x={475} y={150} w={120} h={44} title="Log Analyzer" sub="root cause" />
        <Box x={610} y={150} w={130} h={44} title="Code Navigator" sub="map error to files" />
        <Edge d="M325 172 L340 172" kind="flow" />
        <Edge d="M460 172 L475 172" kind="flow" />
        <Edge d="M595 172 L610 172" kind="flow" />
        <Edge d="M665 194 L665 240" kind="flow" />

        {/* repair loop: runs right to left, then back */}
        <Box x={610} y={240} w={110} h={44} title="Fix Generator" sub="minimal patch" />
        <Box x={475} y={240} w={120} h={44} title="Patch Guardrail" sub="rule check" {...GUARD} />
        <Box x={340} y={240} w={120} h={44} title="Patch Applier" sub="apply via tools" />
        <Box x={205} y={240} w={120} h={44} title="Test Runner" sub="run pytest" />
        <Edge d="M610 262 L595 262" kind="flow" />
        <Edge d="M475 262 L460 262" kind="flow" />
        <Edge d="M340 262 L325 262" kind="flow" />
        <Edge d="M265 284 L265 320" kind="flow" />

        <Box x={205} y={320} w={120} h={44} title="Evaluator" sub="control decision" {...CTRL} />
        <rect x="350" y="316" width="130" height="24" rx="12" fill="#dcfce7" stroke="#86efac" />
        <text x="415" y="332" textAnchor="middle" fontSize="10" fontWeight="700" fill="#14532d">success → verified fix</text>
        <rect x="350" y="346" width="150" height="24" rx="12" fill="#fef3c7" stroke="#fcd34d" />
        <text x="425" y="362" textAnchor="middle" fontSize="10" fontWeight="700" fill="#78350f">escalate → human review</text>
        <Edge d="M325 328 L350 328" kind="flow" />
        <Edge d="M325 358 L350 358" kind="flow" />

        {/* retry loop back to the fix generator */}
        <Edge d="M300 364 L300 392 L665 392 L665 284" kind="retry" />
        <text x="480" y="406" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#b45309">retry with a new patch · max 3 iterations</text>

        <rect x="205" y="422" width="540" height="34" rx="6" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="5 3" />
        <text x="475" y="443" textAnchor="middle" fontSize="10" fill="#334155">
          <tspan fontWeight="700">Shared state</tspan> · saved at every step · history of every fix attempt
        </text>

        {/* LLM calls */}
        <Edge d="M400 84 L400 150" kind="llm" both />
        <Edge d="M535 84 L535 150" kind="llm" both />
        <Edge d="M675 84 L675 150" kind="llm" both />
        <Edge d="M790 52 L770 52 L770 262 L720 262" kind="llm" both />
        <text x="752" y="218" textAnchor="end" fontSize="9" fontWeight="700" fill="#7c3aed">screen patch</text>

        {/* ── Execution tools + repository ── */}
        <Edge d="M725 470 L725 492" kind="call" both />
        <text x="716" y="485" textAnchor="end" fontSize="9" fill="#334155">tool calls from Code Navigator, Patch Applier, Test Runner</text>
        <rect x="190" y="492" width="570" height="56" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.3" />
        <text x="205" y="524" fontSize="12" fontWeight="700" fill="#334155">Execution Tools</text>
        <Chip x={330} y={508} w={100} label="git clone" />
        <Chip x={437} y={508} w={100} label="list repo files" />
        <Chip x={544} y={508} w={100} label="patch + backup" />
        <Chip x={651} y={508} w={100} label="pytest -q" />
        <Edge d="M760 520 L790 520" kind="call" both />
        <Box x={790} y={492} w={190} h={56} title="Target Repository" sub="temp clone at failing commit" fill="#f8fafc" stroke="#cbd5e1" color="#334155" />

        {/* ── Guardrails ── */}
        <rect x="790" y="115" width="190" height="175" rx="10" fill="#faf5ff" stroke="#c4b5fd" strokeWidth="1.3" />
        <text x="885" y="137" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4c1d95">Guardrails</text>
        <text x="800" y="160" fontSize="9" fontWeight="700" letterSpacing="1.2" fill="#7c3aed">INPUT RAILS</text>
        <Chip x={800} y={167} w={170} label="Required CI context check" stroke="#c4b5fd" color="#4c1d95" />
        <text x="800" y="215" fontSize="9" fontWeight="700" letterSpacing="1.2" fill="#7c3aed">OUTPUT RAILS</text>
        <Chip x={800} y={222} w={170} label="LLM patch safety classifier" stroke="#c4b5fd" color="#4c1d95" />
        <Chip x={800} y={254} w={170} label="Rule-based patch check" stroke="#c4b5fd" color="#4c1d95" />

      </svg>
      <p className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        Analysis runs once; the repair loop (fix, screen, apply, test, evaluate) repeats until the tests pass, the evaluator escalates, or three iterations are used. Agents never touch the repository directly; every side effect goes through deterministic tools.
      </p>
    </div>
  )
}

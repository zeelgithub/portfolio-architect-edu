"use client"

// Connection types, each with its own color and arrowhead
const C = {
  call:  { color: "#334155", id: "gra-call" },
  fan:   { color: "#16a34a", id: "gra-fan" },
  llm:   { color: "#7c3aed", id: "gra-llm" },
  rag:   { color: "#0284c7", id: "gra-rag" },
  state: { color: "#94a3b8", id: "gra-state" },
}
type Kind = keyof typeof C

function Box({ x, y, w, h, title, sub, fill = "#ffffff", stroke, color }: {
  x: number; y: number; w: number; h: number
  title: string; sub?: string; fill?: string; stroke: string; color: string
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

function Edge({ d, kind, both = false, halo = false }: { d: string; kind: Kind; both?: boolean; halo?: boolean }) {
  const { color, id } = C[kind]
  const dash = kind === "fan" ? "5 3" : kind === "state" ? "2 3" : undefined
  return (
    <g>
      {halo && <path d={d} fill="none" stroke="#ffffff" strokeWidth="6" />}
      <path d={d} fill="none" stroke={color} strokeWidth={kind === "state" ? 1.4 : 1.6} strokeDasharray={dash}
        markerEnd={kind === "state" ? undefined : `url(#${id})`}
        markerStart={both ? `url(#${id})` : undefined} />
    </g>
  )
}

function Label({ x, y, text, kind = "call", anchor = "start" }: { x: number; y: number; text: string; kind?: Kind; anchor?: "start" | "middle" | "end" }) {
  return <text x={x} y={y} textAnchor={anchor} fontSize="9" fill={C[kind].color}>{text}</text>
}

function Chip({ x, y, w, label, stroke, color }: { x: number; y: number; w: number; label: string; stroke: string; color: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="26" rx="6" fill="#ffffff" stroke={stroke} strokeWidth="1" />
      <text x={x + w / 2} y={y + 17} textAnchor="middle" fontSize="10" fill={color}>{label}</text>
    </g>
  )
}

const NODE = { stroke: "#7dd3fc", color: "#0c4a6e" }
const WORK = { fill: "#dcfce7", stroke: "#86efac", color: "#14532d" }
const MODEL = { stroke: "#a78bfa", color: "#4c1d95" }
const RAG = { stroke: "#7dd3fc", color: "#075985" }
const EDGE = { stroke: "#cbd5e1", color: "#334155" }

export default function GroundedResearchAssistantDiagram() {
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

        {/* ── Client side ── */}
        <rect x="35" y="15" width="110" height="28" rx="14" fill="#0f172a" />
        <text x="90" y="33" textAnchor="middle" fontSize="12" fontWeight="700" fill="white">User</text>
        <Edge d="M70 43 L70 72" kind="call" />
        <Edge d="M110 72 L110 43" kind="call" />

        <Box x={20} y={72} w={140} h={50} title="Streamlit UI" sub="upload · view report" fill="#f8fafc" {...EDGE} />
        <Edge d="M60 122 L60 170" kind="call" />
        <Label x={64} y={150} text="request" />
        <Edge d="M120 170 L120 122" kind="call" />
        <Label x={124} y={150} text="report" />

        <Box x={20} y={170} w={140} h={60} title="FastAPI" sub="/upload · /analyze" fill="#f8fafc" {...EDGE} />
        <Edge d="M160 188 L200 188" kind="call" />
        <Label x={163} y={183} text="invoke" />
        <Edge d="M200 212 L160 212" kind="call" />
        <Label x={163} y={225} text="result" />

        {/* FastAPI writes uploads + reports; Loader reads the PDF back */}
        <Edge d="M90 230 L90 430" kind="call" />
        <Label x={96} y={330} text="save PDF + report" />
        <Edge d="M180 430 L180 262 L215 262" kind="call" />
        <Label x={176} y={400} text="read PDF" anchor="end" />

        {/* ── Model runtime (shared by planner, workers, reviewer) ── */}
        <rect x="300" y="15" width="420" height="97" rx="10" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1.3" />
        <text x="315" y="35" fontSize="12" fontWeight="700" fill="#4c1d95">Model Runtime · Ollama (local)</text>
        <Box x={330} y={52} w={200} h={46} title="llama3.2" sub="planner · workers" {...MODEL} />
        <Box x={570} y={52} w={130} h={46} title="llama3.1:8b" sub="reviewer" {...MODEL} />

        {/* ── Orchestrator ── */}
        <rect x="200" y="150" width="570" height="250" rx="12" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1.6" />
        <text x="215" y="172" fontSize="13" fontWeight="700" fill="#0c4a6e">LangGraph Orchestrator</text>

        <Box x={215} y={226} w={90} h={48} title="Loader" sub="parse PDF" {...NODE} />
        <Box x={325} y={226} w={90} h={48} title="Planner" sub="goal → tasks" {...NODE} />
        <Box x={440} y={186} w={100} h={40} title="Worker 1" sub="one task" {...WORK} />
        <Box x={440} y={236} w={100} h={40} title="Worker 2" sub="one task" {...WORK} />
        <Box x={440} y={286} w={100} h={40} title="Worker N" sub="one task" {...WORK} />
        <Box x={565} y={226} w={90} h={48} title="Reviewer" sub="verify claims" {...NODE} />
        <Box x={670} y={226} w={86} h={48} title="Compiler" sub="final report" {...NODE} />

        <Edge d="M305 250 L325 250" kind="call" />
        {/* one-to-many and many-to-one */}
        <Edge d="M415 250 L427 250 L427 206 L440 206" kind="fan" />
        <Edge d="M427 250 L427 256 L440 256" kind="fan" />
        <Edge d="M427 250 L427 306 L440 306" kind="fan" />
        <Edge d="M540 206 L552 206 L552 250 L565 250" kind="fan" />
        <Edge d="M540 256 L552 256" kind="fan" />
        <Edge d="M540 306 L552 306 L552 250" kind="fan" />
        <Edge d="M655 250 L670 250" kind="call" />

        {/* shared state: every node reads and writes */}
        {[[260, 274], [355, 274], [460, 326], [590, 274], [713, 274]].map(([x, y]) => (
          <Edge key={x} d={`M${x} ${y} L${x} 352`} kind="state" />
        ))}
        <rect x="215" y="352" width="540" height="32" rx="6" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="5 3" />
        <text x="228" y="372" fontSize="10" fill="#334155">
          <tspan fontWeight="700">Shared Graph State</tspan> · plan · outputs · logs
        </text>
        <text x="742" y="372" textAnchor="end" fontSize="10" fill="#334155">review</text>

        {/* LLM calls: many callers, one runtime */}
        <Edge d="M385 226 L385 98" kind="llm" both />
        <Label x={391} y={135} text="structured output" kind="llm" />
        <Edge d="M500 186 L500 98" kind="llm" both />
        <Edge d="M630 226 L630 98" kind="llm" both />

        {/* ── Retrieval service (shared by workers + reviewer) ── */}
        <rect x="400" y="430" width="580" height="100" rx="10" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.3" />
        <text x="965" y="450" textAnchor="end" fontSize="12" fontWeight="700" fill="#075985">Retrieval Service</text>
        <Box x={420} y={462} w={220} h={48} title="Retriever Tool" sub="top-k evidence passages" {...RAG} />
        <Box x={670} y={462} w={130} h={48} title="Chroma Index" sub="per paper · persisted" {...RAG} />
        <Box x={830} y={462} w={135} h={48} title="Embeddings" sub="nomic-embed-text (Ollama)" {...RAG} />
        <Edge d="M640 486 L670 486" kind="rag" both />
        <Edge d="M800 486 L830 486" kind="rag" both />

        <Edge d="M490 326 L490 462" kind="rag" both halo />
        <Edge d="M630 274 L630 462" kind="rag" both halo />
        <Label x={496} y={420} text="evidence" kind="rag" />

        {/* ── Local storage ── */}
        <rect x="20" y="430" width="350" height="100" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.3" />
        <text x="35" y="450" fontSize="12" fontWeight="700" fill="#334155">Local Storage</text>
        <Chip x={32} y={470} w={105} label="PDF uploads" {...EDGE} />
        <Chip x={142} y={470} w={105} label="Vector DB" {...EDGE} />
        <Chip x={252} y={470} w={105} label="Report JSON" {...EDGE} />
        <Edge d="M735 510 L735 545 L195 545 L195 496" kind="rag" />
        <Label x={460} y={541} text="persist index" kind="rag" anchor="middle" />

        {/* ── Guardrails ── */}
        <rect x="790" y="150" width="190" height="200" rx="10" fill="#faf5ff" stroke="#c4b5fd" strokeWidth="1.3" />
        <text x="885" y="172" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4c1d95">Guardrails</text>
        <text x="800" y="196" fontSize="9" fontWeight="700" letterSpacing="1.2" fill="#7c3aed">INPUT RAILS</text>
        <Chip x={800} y={203} w={170} label="PDF-only upload" stroke="#c4b5fd" color="#4c1d95" />
        <text x="800" y="254" fontSize="9" fontWeight="700" letterSpacing="1.2" fill="#7c3aed">OUTPUT RAILS</text>
        <Chip x={800} y={261} w={170} label="Schema validation (Pydantic)" stroke="#c4b5fd" color="#4c1d95" />
        <Chip x={800} y={295} w={170} label="Grounding / hallucination" stroke="#c4b5fd" color="#4c1d95" />

      </svg>
      <p className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        The planner fans tasks out to parallel workers that merge back through shared graph state. Planner, workers, and reviewer all call the same local model runtime; workers and the reviewer query the same retrieval service for evidence.
      </p>
    </div>
  )
}

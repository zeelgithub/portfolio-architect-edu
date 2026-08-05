"use client"

import { useState } from "react"

type Section = "data" | "llm" | "strategy" | "risk" | "execution" | "telegram" | null

const INFO: Record<Exclude<Section, null>, { title: string; detail: string }> = {
  data:      { title: "Data Pipeline", detail: "Pulls live bars from Alpaca, computes indicators, and stores clean features. Enforces point-in-time correctness so no downstream agent ever sees future data." },
  llm:       { title: "LLM Sentiment Agent", detail: "Reads live news headlines and returns a confidence delta (−1 / 0 / +1). The score adjusts position sizing; it never triggers or blocks a trade on its own." },
  strategy:  { title: "Strategy Selector Agent", detail: "Classifies the current market regime and picks the right strategy. Outputs a structured TradeIntent, a description of what to do, not an instruction to the broker." },
  risk:      { title: "Risk Gatekeeper Agent", detail: "Every TradeIntent passes through here before anything touches the broker. Pure logic: no ML, no network calls. Approves, resizes, or vetoes. On any uncertainty, it halts." },
  execution: { title: "Execution Layer", detail: "The only layer with broker write credentials. Receives pre-approved, pre-sized orders. Routes to Alpaca, captures fills, and reconciles positions back to the shared ledger." },
  telegram:  { title: "Telegram Interface", detail: "A two-way human-in-the-loop channel. The Risk Gatekeeper sends trade proposals to your phone with Approve and Deny buttons. HALT events trigger a structured brief you paste into Claude.ai for diagnosis. You send commands back in plain English and Claude parses your intent." },
}

const LBL = "#9ca3af"

export default function LiveTradingBotDiagram() {
  const [hover, setHover] = useState<Section>(null)

  const fade = (s: Section) => hover === null || hover === s ? 1 : 0.1
  const on   = (s: Section) => ({
    onMouseEnter: () => setHover(s),
    onMouseLeave: () => setHover(null),
    style: { cursor: "pointer", opacity: fade(s), transition: "opacity 0.15s" },
  })
  const aOp = (a: Section, b: Section) =>
    hover === null || hover === a || hover === b ? 0.65 : 0.06

  // Phase pill helper
  const Phase = ({ label, y, color = "#6366f1" }: { label: string; y: number; color?: string }) => (
    <g>
      <rect x="14" y={y} width="72" height="40" rx="7"
        fill="#eef2ff" stroke="#c7d2fe" strokeWidth="1.2"/>
      <text x="50" y={y + 15} textAnchor="middle" fontSize="7" fontWeight="800"
        fill={color} letterSpacing="1.2">{label}</text>
      <text x="50" y={y + 28} textAnchor="middle" fontSize="9" fill={color} opacity="0.5">↓</text>
    </g>
  )

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 overflow-hidden">
      <svg viewBox="0 0 1000 470" className="block w-full" style={{ height: 390 }}>

        <defs>
          <marker id="arr"  viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0l8 4-8 4z" fill="#94a3b8"/></marker>
          <marker id="arrG" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0l8 4-8 4z" fill="#16a34a"/></marker>
          <marker id="arrR" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0l8 4-8 4z" fill="#dc2626"/></marker>
          <marker id="arrA" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0l8 4-8 4z" fill="#d97706"/></marker>
        </defs>

        {/* ── EXTERNAL SOURCES ──────────────────────────────── */}
        <rect x="96"  y="12" width="188" height="38" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="5 3"/>
        <text x="190" y="36" textAnchor="middle" fontSize="12" fontWeight="700" fill="#374151">Alpaca Market Feed</text>

        <rect x="762" y="12" width="200" height="38" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="5 3"/>
        <text x="862" y="36" textAnchor="middle" fontSize="12" fontWeight="700" fill="#374151">News Headlines</text>

        {/* ── ORCHESTRATOR BORDER ───────────────────────────── */}
        <rect x="12" y="62" width="976" height="342" rx="14"
          fill="none" stroke="#6366f1" strokeWidth="1.6" strokeDasharray="8 4"/>
        <rect x="12" y="50" width="178" height="24" rx="6" fill="#6366f1"/>
        <text x="22" y="67" fontSize="11" fontWeight="700" fill="white">Orchestrator</text>

        {/* ── PHASE COLUMN ──────────────────────────────────── */}
        <line x1="92" y1="68" x2="92" y2="402" stroke="#e0e7ff" strokeWidth="1.2"/>
        <Phase label="PERCEIVE" y={76} />
        <Phase label="PLAN"     y={176} />
        <Phase label="GUARD"    y={266} />
        <Phase label="ACT"      y={356} />

        {/* ── DATA PIPELINE ─────────────────────────────────── */}
        <g {...on("data")}>
          <rect x="100" y="76" width="162" height="40" rx="9" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1.3"/>
          <text x="181" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#075985">Data Ingestor</text>

          <rect x="284" y="76" width="162" height="40" rx="9" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1.3"/>
          <text x="365" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#075985">Feature Store</text>

          <rect x="468" y="76" width="188" height="40" rx="9" fill="#f5f3ff" stroke="#a5b4fc" strokeWidth="1.3"/>
          <text x="562" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3730a3">Regime Classifier Agent</text>

          <line x1="262" y1="96" x2="284" y2="96" stroke="#94a3b8" strokeWidth="1.4" markerEnd="url(#arr)"/>
          <line x1="446" y1="96" x2="468" y2="96" stroke="#94a3b8" strokeWidth="1.4" markerEnd="url(#arr)"/>
        </g>

        {/* ── LLM SENTIMENT AGENT ───────────────────────────── */}
        <g {...on("llm")}>
          <rect x="762" y="76" width="210" height="40" rx="9" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.3"/>
          <text x="867" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#78350f">LLM Sentiment Agent</text>
        </g>

        {/* ── STRATEGY SELECTOR AGENT ───────────────────────── */}
        <g {...on("strategy")}>
          <rect x="264" y="176" width="430" height="40" rx="9" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="1.4"/>
          <text x="479" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill="#312e81">Strategy Selector Agent</text>
        </g>

        {/* ── RISK GATEKEEPER AGENT ─────────────────────────── */}
        <g {...on("risk")}>
          <rect x="264" y="266" width="290" height="40" rx="9" fill="#fff1f2" stroke="#fca5a5" strokeWidth="1.6"/>
          <text x="409" y="292" textAnchor="middle" fontSize="12" fontWeight="700" fill="#881337">Risk Gatekeeper Agent</text>

          <rect x="596" y="266" width="150" height="40" rx="9" fill="#fff1f2" stroke="#fca5a5" strokeWidth="1.2" strokeDasharray="5 3"/>
          <text x="671" y="292" textAnchor="middle" fontSize="13" fontWeight="800" fill="#dc2626">HALT</text>
        </g>

        {/* ── EXECUTION LAYER ───────────────────────────────── */}
        <g {...on("execution")}>
          <rect x="100" y="356" width="175" height="36" rx="8" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.3"/>
          <text x="187" y="379" textAnchor="middle" fontSize="12" fontWeight="700" fill="#14532d">Order Router</text>

          <rect x="292" y="356" width="175" height="36" rx="8" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.3"/>
          <text x="379" y="379" textAnchor="middle" fontSize="12" fontWeight="700" fill="#14532d">Alpaca Brokerage</text>

          <rect x="484" y="356" width="175" height="36" rx="8" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.3"/>
          <text x="571" y="379" textAnchor="middle" fontSize="12" fontWeight="700" fill="#14532d">Fill Handler</text>

          <rect x="676" y="356" width="175" height="36" rx="8" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.3"/>
          <text x="763" y="379" textAnchor="middle" fontSize="12" fontWeight="700" fill="#14532d">Position Ledger</text>

          <line x1="275" y1="374" x2="292" y2="374" stroke="#16a34a" strokeWidth="1.4" markerEnd="url(#arrG)"/>
          <line x1="467" y1="374" x2="484" y2="374" stroke="#16a34a" strokeWidth="1.4" markerEnd="url(#arrG)"/>
          <line x1="659" y1="374" x2="676" y2="374" stroke="#16a34a" strokeWidth="1.4" markerEnd="url(#arrG)"/>
        </g>

        {/* ── TELEGRAM INTERFACE (external, right side) ─────── */}
        <g {...on("telegram" as Section)}>
          <rect x="810" y="248" width="172" height="60" rx="10"
            fill="#f0fdf4" stroke="#86efac" strokeWidth="1.4" strokeDasharray="5 3"/>
          <text x="896" y="274" textAnchor="middle" fontSize="12" fontWeight="700" fill="#14532d">Telegram</text>
          <text x="896" y="292" textAnchor="middle" fontSize="10" fontWeight="500" fill="#166534">Human-in-the-Loop</text>
        </g>

        {/* ── EVENT BUS ─────────────────────────────────────── */}
        <rect x="100" y="444" width="876" height="16" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
        <text x="538" y="456" textAnchor="middle" fontSize="9" fontWeight="600" fill="#94a3b8" letterSpacing="0.3">
          Event Bus: all agents communicate through typed, auditable messages · upgradeable to Redis / ZeroMQ
        </text>

        {/* ── INTER-GROUP ARROWS ────────────────────────────── */}

        {/* Alpaca → Data Ingestor */}
        <line x1="190" y1="50" x2="181" y2="76"
          stroke="#94a3b8" strokeWidth="1.4" markerEnd="url(#arr)"
          opacity={aOp("data", null)}/>

        {/* News → LLM */}
        <line x1="862" y1="50" x2="867" y2="76"
          stroke="#d97706" strokeWidth="1.4" markerEnd="url(#arrA)"
          opacity={aOp("llm", null)}/>

        {/* Regime Classifier Agent → Strategy */}
        <path d="M562 116 L562 152 L479 152 L479 176"
          fill="none" stroke="#94a3b8" strokeWidth="1.4" markerEnd="url(#arr)"
          opacity={aOp("data","strategy")}/>
        <text x="522" y="148" textAnchor="middle" fontSize="8" fill={LBL}
          opacity={aOp("data","strategy")}>regime signal</text>

        {/* LLM → Strategy (dashed amber) */}
        <path d="M867 116 L867 162 L694 162 L694 196"
          fill="none" stroke="#d97706" strokeWidth="1.4" strokeDasharray="5 3" markerEnd="url(#arrA)"
          opacity={aOp("llm","strategy")}/>
        <text x="784" y="158" textAnchor="middle" fontSize="8" fill="#d97706"
          opacity={aOp("llm","strategy")}>−1 / 0 / +1</text>

        {/* Strategy → Risk */}
        <line x1="479" y1="216" x2="409" y2="266"
          stroke="#94a3b8" strokeWidth="1.4" markerEnd="url(#arr)"
          opacity={aOp("strategy","risk")}/>
        <text x="436" y="248" textAnchor="middle" fontSize="8" fill={LBL}
          opacity={aOp("strategy","risk")}>TradeIntent</text>

        {/* Risk → HALT */}
        <line x1="554" y1="286" x2="596" y2="286"
          stroke="#dc2626" strokeWidth="1.4" strokeDasharray="4 3" markerEnd="url(#arrR)"
          opacity={aOp("risk", null)}/>
        <text x="575" y="279" textAnchor="middle" fontSize="8" fill="#dc2626"
          opacity={aOp("risk", null)}>veto</text>

        {/* Risk → Order Router */}
        <path d="M320 306 L320 336 L187 336 L187 356"
          fill="none" stroke="#16a34a" strokeWidth="1.4" markerEnd="url(#arrG)"
          opacity={aOp("risk","execution")}/>
        <text x="254" y="332" textAnchor="middle" fontSize="8" fill="#16a34a"
          opacity={aOp("risk","execution")}>approved order</text>

        {/* Risk → Telegram (proposals + alerts) */}
        <path d="M554 278 L810 278"
          fill="none" stroke="#16a34a" strokeWidth="1.4" strokeDasharray="5 3" markerEnd="url(#arrG)"
          opacity={aOp("risk", "telegram" as Section)}/>
        <text x="680" y="274" textAnchor="middle" fontSize="8" fill="#16a34a"
          opacity={aOp("risk", "telegram" as Section)}>proposals · alerts</text>

        {/* Fill Handler → Telegram (fills) */}
        <path d="M571 374 L571 420 L896 420 L896 308"
          fill="none" stroke="#16a34a" strokeWidth="1.4" strokeDasharray="5 3" markerEnd="url(#arrG)"
          opacity={aOp("execution", "telegram" as Section)}/>
        <text x="740" y="416" textAnchor="middle" fontSize="8" fill="#16a34a"
          opacity={aOp("execution", "telegram" as Section)}>fills</text>

        {/* Telegram → Orchestrator (commands back) */}
        <path d="M810 270 L790 270 L790 76 L190 76"
          fill="none" stroke="#94a3b8" strokeWidth="1.4" strokeDasharray="4 3" markerEnd="url(#arr)"
          opacity={aOp("telegram" as Section, null)}/>
        <text x="800" y="173" textAnchor="middle" fontSize="8" fill={LBL}
          opacity={aOp("telegram" as Section, null)}>approve · commands</text>

        {/* Animated packet */}
        {hover === null && (
          <circle r="4" fill="#6366f1" opacity="0.75">
            <animateMotion dur="5s" repeatCount="indefinite"
              path="M190 12 L181 76 L365 96 L562 96 L562 152 L479 176 L409 266 L320 306 L187 356"/>
          </circle>
        )}
      </svg>

      {/* Info bar */}
      <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 min-h-[52px] flex items-center gap-3">
        <div className={`w-1.5 h-7 rounded-full flex-shrink-0 transition-colors duration-150 ${
          hover === "data"      ? "bg-sky-400"    :
          hover === "llm"       ? "bg-amber-400"  :
          hover === "strategy"  ? "bg-indigo-400" :
          hover === "risk"      ? "bg-red-400"    :
          hover === "execution" ? "bg-green-500"  :
          hover === "telegram"  ? "bg-green-600"  : "bg-gray-300 dark:bg-gray-600"
        }`}/>
        {hover ? (
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <span className="font-semibold">{INFO[hover].title}: </span>
            {INFO[hover].detail}
          </p>
        ) : (
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Hover any section to understand its role in the system.
          </p>
        )}
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import SupplyChainSecurityDiagram from "@/components/diagrams/SupplyChainSecurityDiagram"
import { projects } from "@/data/projects"

const STATS = [
  { value: "100%", label: "self-verification on suspicious names (12 of 12)" },
  { value: "72.2%", label: "verification after the intervention, up from 19.4%" },
  { value: "2", label: "unclaimed hallucinated package names found" },
  { value: "381", label: "automated tests, zero network calls" },
]

const USE_CASES = [
  { who: "Security and DevSecOps teams", what: "Evidence on where AI coding agents need an install-time safeguard, and a guard to put there." },
  { who: "Teams adopting AI coding agents", what: "A drop-in hook that blocks nonexistent packages before an agent can install them." },
  { who: "AI safety and evaluation researchers", what: "A reproducible harness for measuring agent behavior across tasks, prompts, and models." },
]

const GUARD = ["Command parser", "Live registry checks (5 ecosystems)", "Risk scorer", "Decision logger"]
const RESEARCH = ["48-session experiment", "Prompt-intervention study", "Cross-model comparison", "Responsible disclosure"]

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((r) => (
        <span
          key={r}
          className="rounded-full border border-gray-200 dark:border-gray-700 px-3 py-1 text-sm text-gray-700 dark:text-gray-300"
        >
          {r}
        </span>
      ))}
    </div>
  )
}

export default function SupplyChainSecurityCaseStudy() {
  const project = projects.find((p) => p.slug === "ai-agent-supply-chain-security")

  if (!project) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-semibold">AI Agent Supply-Chain Security</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Project data not found.</p>
      </section>
    )
  }

  return (
    <section className="max-w-4xl mx-auto space-y-12 px-6 py-12">
      {/* Title */}
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-semibold">{project.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {project.summary}
        </p>
      </div>

      {/* Impact at a glance */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{s.value}</div>
            <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Problem */}
      <div className="space-y-3">
        <h2 className="text-xl font-medium">Problem</h2>
        <p className="text-gray-600 dark:text-gray-300">{project.problem}</p>
      </div>

      {/* Who It's For */}
      <div className="space-y-3">
        <h2 className="text-xl font-medium">Who It{"'"}s For</h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          {USE_CASES.map((u) => (
            <li key={u.who}>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{u.who}</span>
              {": "}{u.what}
            </li>
          ))}
        </ul>
      </div>

      {/* What I Built */}
      <div className="space-y-3">
        <h2 className="text-xl font-medium">What I Built</h2>
        <p className="text-gray-600 dark:text-gray-300">{project.solution}</p>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Install guard</p>
        <Chips items={GUARD} />
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Research</p>
        <Chips items={RESEARCH} />
      </div>

      {/* Architecture */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium">System Architecture</h2>
        <SupplyChainSecurityDiagram />
      </div>

      {/* Key Design Decisions */}
      <div className="space-y-3">
        <h2 className="text-xl font-medium">Key Design Decisions</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
          {project.decisions.map((item) => {
            const i = item.indexOf(". ")
            return (
              <li key={item}>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{item.slice(0, i + 1)}</span>
                {item.slice(i + 1)}
              </li>
            )
          })}
        </ul>
      </div>

      {/* Outcomes */}
      <div className="space-y-3">
        <h2 className="text-xl font-medium">Outcomes</h2>
        <p className="text-gray-600 dark:text-gray-300">{project.outcomes}</p>
      </div>

      {/* GitHub */}
      {project.repoUrl && (
        <div className="pt-4">
          <Link
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            View implementation on GitHub →
          </Link>
        </div>
      )}
    </section>
  )
}

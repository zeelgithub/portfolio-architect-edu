"use client"

import Link from "next/link"
import RedditMarketBriefDiagram from "@/components/diagrams/RedditMarketBriefDiagram"
import { projects } from "@/data/projects"

const STATS = [
  { value: "22", label: "subreddits read every run" },
  { value: "~11 min", label: "to collect a full day of Reddit" },
  { value: "15K+", label: "comments gathered per daily run" },
  { value: "0", label: "errors across 736 API calls" },
]

const USE_CASES = [
  { who: "Retail investors", what: "Daily market prep from one brief instead of hours across subreddits and news sites." },
  { who: "Analysts", what: "Track retail sentiment and early catalysts across 22 communities in one view." },
  { who: "Researchers and journalists", what: "Follow recent congressional stock trades alongside the day's market news." },
]

const SKILLS = [
  {
    cmd: "/reddit-daily",
    what: "Reads every post from the last 24 hours across 22 market subreddits, with their comment threads, through a Composio connector, and surfaces the stocks, catalysts, and sentiment shifts driving discussion.",
  },
  {
    cmd: "/stock-daily",
    what: "Summarizes market-moving news since the last close and lists stock trades disclosed by members of Congress over the past week.",
  },
  {
    cmd: "/stock-analysis",
    what: "Produces an analyst-style report on any stock or ETF: sector-specific fundamentals, valuation, Wall Street targets, Reddit sentiment, and bull, base, and bear scenarios.",
  },
]

export default function RedditMarketBriefCaseStudy() {
  const project = projects.find((p) => p.slug === "reddit-market-brief-skills")

  if (!project) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-semibold">Reddit Market Brief</h1>
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
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          {SKILLS.map((s) => (
            <li key={s.cmd}>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{s.cmd}</span>
              {": "}{s.what}
            </li>
          ))}
        </ul>
      </div>

      {/* Architecture */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium">System Architecture</h2>
        <RedditMarketBriefDiagram />
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

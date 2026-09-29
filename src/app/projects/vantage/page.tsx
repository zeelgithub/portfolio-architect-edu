"use client"

import Image from "next/image"
import Link from "next/link"
import { projects } from "@/data/projects"

const STATS = [
  { value: "5 → 1", label: "apps replaced by one screen" },
  { value: "9 panels", label: "sleep, training, meals, deadlines, money" },
  { value: "100% local", label: "everything it stores stays on my machine" },
  { value: "43 tests", label: "plus CI on every push" },
]

const USE_CASES = [
  { who: "Busy students and professionals", what: "See the whole day, including deadlines, events, and priorities, without opening five apps." },
  { who: "Fitness and health trackers", what: "Put sleep, activity, workouts, and nutrition side by side instead of in separate apps." },
  { who: "Privacy-conscious users", what: "Get a unified personal dashboard without handing all of your data to another cloud service." },
]

const HOW = [
  { title: "Push", body: "Apple Health sends activity, heart-rate, sleep, and workout data to a secured webhook, stored in local SQLite." },
  { title: "Pull", body: "Google Calendar, Canvas, and Alpaca are read live on every load, so those panels are never stale." },
  { title: "Isolate", body: "Every source loads through its own API route, so a failure empties one panel, never the dashboard." },
]

const SERVICES = ["Apple Health (via Health Auto Export)", "Google Calendar", "Canvas LMS", "Alpaca brokerage", "Open Food Facts"]
const STACK = ["Next.js", "TypeScript", "SQLite", "Tailwind + shadcn/ui", "Vitest", "GitHub Actions"]

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

export default function VantageCaseStudy() {
  const project = projects.find((p) => p.slug === "vantage")

  if (!project) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-semibold">Vantage</h1>
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

      {/* The dashboard, wider than the text column */}
      <figure className="relative left-1/2 w-[min(72rem,calc(100vw-3rem))] -translate-x-1/2 space-y-3">
        <a
          href="/projects/vantage-dashboard.webp"
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-xl border border-gray-200 shadow-2xl dark:border-gray-700"
        >
          <Image
            src="/projects/vantage-dashboard.webp"
            alt="The Vantage dashboard: daily focus, finance, supplements, health, sleep, academics, and nutrition panels on one dark screen"
            width={2400}
            height={1410}
            sizes="(max-width: 1200px) 100vw, 1152px"
            priority
            className="h-auto w-full"
          />
        </a>
        <figcaption className="text-center text-xs text-gray-500 dark:text-gray-400">
          The live dashboard, shown with demo data. Click to view full size.
        </figcaption>
      </figure>

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
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Connected services</p>
        <Chips items={SERVICES} />
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Stack</p>
        <Chips items={STACK} />
      </div>

      {/* How It Works */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium">How It Works</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {HOW.map((h) => (
            <div key={h.title} className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{h.title}</div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{h.body}</p>
            </div>
          ))}
        </div>
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

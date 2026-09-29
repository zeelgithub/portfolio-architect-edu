"use client"

import Link from "next/link"
import BoneXArchitectureDiagram from "@/components/diagrams/BoneXArchitectureDiagram"
import { projects } from "@/data/projects"

const STATS = [
  { value: "7 regions", label: "elbow to shoulder, in one model" },
  { value: "14 classes", label: "each region, normal or abnormal" },
  { value: "MobileNet", label: "lightweight, pretrained on ImageNet" },
  { value: "One upload", label: "from X-ray to a plain-language result" },
]

const USE_CASES = [
  { who: "Emergency and urgent-care teams", what: "A screening aid that flags abnormal X-rays so they can be reviewed first." },
  { who: "Clinics without on-site radiologists", what: "A first-pass read while a specialist opinion is pending." },
  { who: "Medical AI teams", what: "A reference for turning a research dataset into a deployable screening prototype." },
]

const REGIONS = ["Elbow", "Finger", "Forearm", "Hand", "Humerus", "Shoulder", "Wrist"]
const STACK = ["TensorFlow / Keras", "MobileNet (ImageNet)", "Stanford MURA dataset", "Flask"]

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

export default function BoneXCaseStudy() {
  const project = projects.find((p) => p.slug === "bonex")

  if (!project) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-semibold">BoneX</h1>
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

      {/* At a glance */}
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
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Body regions covered</p>
        <Chips items={REGIONS} />
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Stack</p>
        <Chips items={STACK} />
      </div>

      {/* Architecture */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium">System Architecture</h2>
        <BoneXArchitectureDiagram />
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

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Badge from "@/components/ui/Badge"
import FadeIn from "@/components/ui/FadeIn"
import { projects } from "@/data/projects"
import { Github } from "lucide-react"

export default function ProjectsPage() {
  return (
    <section className="max-w-4xl space-y-10 py-16">
      {/* Header */}
      <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100">
        Projects
      </h1>

      {/* Project cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p, index) => (
          <FadeIn key={p.slug} delay={index * 0.08}>
            {/* group enables hover effects */}
            <div className="group relative">
              <Card title={p.title}>
                {/* Summary */}
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {p.summary}
                </p>

                {/* Highlights */}
                {p.highlights && p.highlights.length > 0 && (
                  <ul className="mt-4 list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {p.highlights.slice(0, 3).map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}

                {/* Tags */}
                {p.tags && p.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.slice(0, 4).map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <div className="mt-5">
                  <Button href={`/projects/${p.slug}`} variant="secondary">
                    View Case Study →
                  </Button>
                </div>

                {/* ✅ GitHub icon (hover only) */}
                {p.repoUrl && (
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      absolute top-4 right-4
                      opacity-0 group-hover:opacity-100
                      transition-opacity
                      text-gray-500 hover:text-gray-900
                      dark:text-gray-400 dark:hover:text-gray-100
                    "
                    aria-label="View GitHub repository"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </Card>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
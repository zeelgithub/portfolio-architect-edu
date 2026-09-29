import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import SectionHeading from "@/components/ui/SectionHeading"

import AboutPage from "./about/page"
import ExperiencePage from "./experience/page"
import EducationPage from "./education/page"
import ProjectsPage from "./projects/page"
import PublicationsPage from "./publications/page"
import ContactPage from "./contact/page"

export default function HomePage() {
  return (
    <>
      {/* HOME */}
      <section id="home" className="relative isolate space-y-12 overflow-hidden">

        {/* decorative accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 -z-10 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-400/30 via-violet-400/20 to-sky-300/20 blur-3xl dark:from-indigo-500/20 dark:via-violet-500/15 dark:to-sky-400/10"
        />

        {/* HERO */}
        <div className="max-w-4xl space-y-6 pt-4">
          <div className="flex flex-wrap gap-2">
            <Badge>AI Consultant Engineer · Deloitte</Badge>
            <Badge>LLMs · Agents · RAG · LLMOps</Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 dark:text-gray-100">
            Distributed agent systems, enterprise RAG, and{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
              cloud-native LLMOps
            </span>
            , shipped across NIH, CDC, and VBA.
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
            Full-stack AI engineering ownership: multi-agent orchestration, REST API design, AWS infrastructure, and observability, built for compliance-regulated, high-availability federal environments.
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              "$800K in new federal revenue",
              "76% LLM latency reduction",
              "2nd place · NAWCTSD AI Challenge",
            ].map((stat) => (
              <span
                key={stat}
                className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 backdrop-blur-sm"
              >
                {stat}
              </span>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <Button href="/#projects">View Projects</Button>
            <Button href="/#about" variant="secondary">About</Button>
          </div>
        </div>

        {/* CORE COMPETENCIES */}
        <div className="max-w-4xl space-y-4">
          <SectionHeading
            title="Core Competencies"
            subtitle="Engineering disciplines applied across every system shipped."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <Card title="Agentic Systems">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Production multi-agent architectures: supervisor and hierarchical patterns, deterministic state machines, schema-validated tool execution, bounded retry loops, and architectural safety guardrails.
              </p>
            </Card>

            <Card title="Grounded GenAI">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Enterprise RAG pipelines with retrieval evaluation, passage-level evidence grounding, hallucination control, and structured output enforcement across regulated production environments.
              </p>
            </Card>

            <Card title="Cloud & LLMOps">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                AWS and Azure production deployments with FISMA-compliant CI/CD gates, model drift detection, inference latency monitoring, and full observability instrumentation via LangFuse and MLflow.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <AboutPage />
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <ExperiencePage />
      </section>

      {/* EDUCATION */}
      <section id="education">
        <EducationPage />
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <ProjectsPage />
      </section>

      {/* PUBLICATIONS */}
      <section id="publications">
        <PublicationsPage />
      </section>

      {/* CONTACT */}
      <section id="contact">
        <ContactPage />
      </section>
    </>
  )
}

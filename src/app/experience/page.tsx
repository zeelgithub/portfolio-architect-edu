import Card from "@/components/ui/Card"
import FadeIn from "@/components/ui/FadeIn"

export default function ExperiencePage() {
  return (
    <section className="max-w-4xl space-y-12 py-16">

      <div>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100">
          Experience
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mt-2">
          Production AI systems across federal health and defense clients.
        </p>
      </div>

      <div className="relative space-y-10 border-l-2 border-gray-300 dark:border-gray-700 pl-8">

            {/* ── Deloitte (single card, two roles) ── */}
            <div className="relative">
              <div className="absolute w-4 h-4 bg-gray-700 dark:bg-gray-300 rounded-full -left-2 top-5" />
              <FadeIn>
                <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all space-y-8">

                  {/* Company header */}
                  <div className="flex flex-wrap justify-between items-start gap-x-4 gap-y-1">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        Deloitte Consulting LLP
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
                        Pennsylvania, United States
                      </p>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 italic whitespace-nowrap">
                      Oct 2023 – Present
                    </span>
                  </div>

                  {/* Role 1 — AI Consultant Engineer */}
                  <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-5 space-y-3">
                    <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-1">
                      <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        AI Consultant Engineer
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400 italic whitespace-nowrap">
                        Jul 2026 – Present
                      </span>
                    </div>
                    <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      <li>Secured $800K in new CDC revenue and contributed to a $250K contract through full-stack delivery of a production AI product for the chronic disease center.</li>
                      <li>Won 2nd place and a $30K award at the NAWCTSD AI Challenge with a LangChain-powered proposal evaluation system automating technical scoring at scale.</li>
                      <li>Architected LEDA, a parallel multi-agent document intelligence system automating bioactivity and chemical-structure extraction across drug discovery workflows, reducing manual processing time by 60%+.</li>
                      <li>Engineered hierarchical agent architecture for AISGO, handling eligibility verification, compliance validation, and technical assistance across federal systems, eliminating multi-step manual workflows.</li>
                    </ul>
                  </div>

                  {/* Role 2 — Generative AI Engineer */}
                  <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-5 space-y-3">
                    <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-1">
                      <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        Generative AI Engineer
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400 italic whitespace-nowrap">
                        Oct 2023 – Jul 2026
                      </span>
                    </div>
                    <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      <li>Reduced distributed LLM service latency by 76% across NIH, CDC, and VBA production systems via async workflows, prompt caching, and token optimization.</li>
                      <li>Shipped iHub SQL and CDC CSC AI Copilot on AWS, enabling natural language access to federal data infrastructure and automated case response, replacing manual analyst workflows.</li>
                      <li>Sole end-to-end engineer on iHub SQL and CDC CSC AI Copilot: system design, REST API development, AWS deployment, and live observability — both shipped to production on a shared multi-tenant federal platform.</li>
                      <li>Engineered CI/CD pipelines with automated compliance gates and test coverage thresholds, enabling auditable, repeatable deployments across FISMA-regulated federal environments.</li>
                      <li>Built LLMOps/MLOps pipelines covering model evaluation, drift detection, and retraining workflows instrumented with LangFuse, MLflow, and AWS Bedrock.</li>
                      <li>Established engineering standards and review cadence adopted across development teams; mentored junior engineers, accelerating ramp-up on multi-agent and RAG workstreams.</li>
                    </ul>
                  </div>

                  {/* Shared skill tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Multi-Agent Systems", "LangGraph", "LangChain", "LLMOps", "RAG", "AWS", "Kubernetes", "CI/CD", "Observability", "Federal AI"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </Card>
              </FadeIn>
            </div>

            {/* ── Eminence ── */}
            <div className="relative">
              <div className="absolute w-4 h-4 bg-gray-700 dark:bg-gray-300 rounded-full -left-2 top-5" />
              <FadeIn>
                <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all">
                  <div className="flex flex-wrap justify-between items-start gap-x-4 gap-y-1">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        Eminence Technology Solutions, LLC.
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
                        Data Analyst · New Jersey, United States
                      </p>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 italic whitespace-nowrap">
                      Dec 2022 – Jun 2023
                    </span>
                  </div>
                  <ul className="mt-4 list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Engineered distributed ETL pipelines on Apache Spark processing 6 TB of structured and unstructured healthcare data for downstream analytics and model training.</li>
                    <li>Optimized model training pipelines via batch parallelization and data loader tuning, reducing wall-clock training time by 18%.</li>
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Spark", "ETL", "Data Pipelines", "Healthcare Data"].map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </FadeIn>
            </div>

            {/* ── Fractal Analytics ── */}
            <div className="relative">
              <div className="absolute w-4 h-4 bg-gray-700 dark:bg-gray-300 rounded-full -left-2 top-5" />
              <FadeIn>
                <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all">
                  <div className="flex flex-wrap justify-between items-start gap-x-4 gap-y-1">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        Fractal Analytics
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
                        Machine Learning Intern · New York, United States
                      </p>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 italic whitespace-nowrap">
                      Jun 2022 – Dec 2022
                    </span>
                  </div>
                  <ul className="mt-4 list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Deployed production ML models with live monitoring, automated alerting, and inference latency and prediction drift dashboards — enabling proactive intervention before model degradation impacted downstream consumers.</li>
                    <li>Engineered a graph-based recommendation system, improving recommendation accuracy by 20% over the collaborative filtering baseline.</li>
                    <li>Implemented automated model evaluation and retraining workflows, eliminating manual evaluation overhead and enabling continuous improvement cycles without engineering intervention.</li>
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Machine Learning", "Model Monitoring", "Graph Systems", "MLOps"].map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </FadeIn>
            </div>

      </div>
    </section>
  )
}

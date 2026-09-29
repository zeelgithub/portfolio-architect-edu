export default function AboutPage() {
  return (
    <section className="max-w-4xl space-y-6 py-16 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
        About
      </h1>

      <p className="text-gray-600 dark:text-gray-300">
        AI Consultant Engineer at Deloitte with 3+ years of end-to-end ownership across production LLM systems serving NIH, CDC, and VBA. Engineering scope spans distributed multi-agent architecture, REST API design, AWS infrastructure, and Kubernetes-based observability on compliance-regulated federal platforms at scale.
      </p>

      <p className="text-gray-600 dark:text-gray-300">
        Promoted on the basis of measurable client impact: secured $800K in new CDC revenue, contributed to a $250K defense contract, and won 2nd place ($30K award) at the NAWCTSD AI Challenge. Drove a 76% reduction in distributed LLM service latency across three federal production systems via async workflows, prompt caching, and token optimization.
      </p>

      <p className="text-gray-600 dark:text-gray-300">
        Peer-reviewed publication in Springer (ICTIS&apos;23) on transfer learning for medical image classification. Independent projects — autonomous trading systems, multi-agent debugging pipelines, grounded research workflows — are shipped to production and not prototyped.
      </p>

      <p className="text-sm text-gray-500">
        Founder, Data Science Club at Charusat University ·{" "}
        <a
          href="https://datascienceclub.charusat.ac.in/"
          className="underline hover:text-gray-700 dark:hover:text-gray-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          datascienceclub.charusat.ac.in
        </a>
      </p>
    </section>
  );
}

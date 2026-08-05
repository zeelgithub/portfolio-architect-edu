import Card from "@/components/ui/Card"

export default function PublicationsPage() {
  return (
    <section className="space-y-8 max-w-4xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100">
        Publications
      </h1>

      <div className="space-y-4">
        <Card>
          <div className="space-y-3">
            <h3 className="text-base font-semibold leading-snug text-gray-900 dark:text-gray-100">
              CNV Classification from OCT Images using Fine-Tuned ResNet and DenseNet
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Applied fine-tuned ResNet and DenseNet to classify choroidal neovascularization (CNV) from OCT images, with quantified performance benchmarks across architectures for early AMD diagnosis.
            </p>
            <p className="text-xs text-gray-500">
              Springer · Intelligent Computing / AI · ICTIS'23
            </p>
            <a
              href="https://link.springer.com/chapter/10.1007/978-981-99-3758-5_42"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline inline-block pt-1"
            >
              View publication →
            </a>
          </div>
        </Card>

        <Card>
          <div className="space-y-3">
            <h3 className="text-base font-semibold leading-snug text-gray-900 dark:text-gray-100">
              Enhanced CNV Classification in OCT Images using Fine-Tuned MobileNet and VGG19
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Extended the CNV classification study using MobileNet and VGG19, evaluating accuracy-efficiency trade-offs across lightweight and deep architectures for ophthalmology AI tooling.
            </p>
            <p className="text-xs text-gray-500">
              Technical Publication
            </p>
            <a
              href="https://drive.google.com/drive/folders/1TNROXNaQ7P2tDCxVcYGGsVD9Ymmow2Xj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline inline-block pt-1"
            >
              View publication →
            </a>
          </div>
        </Card>
      </div>

    </section>
  )
}

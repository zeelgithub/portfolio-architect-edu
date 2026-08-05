import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"

export default function ContactPage() {
  return (
    <section className="space-y-8 max-w-3xl">

      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100">
        Contact
      </h1>

      <Card>
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Open to AI engineering roles, consulting engagements, and technical collaborations.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Button
            href="https://mail.google.com/mail/?view=cm&fs=1&to=zeelamrutiya045@gmail.com&su=Portfolio%20Inquiry"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email
          </Button>

          <Button
            href="https://www.linkedin.com/in/zeel-amrutiya-5a03b0203/"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            LinkedIn
          </Button>
        </div>
      </Card>

    </section>
  )
}

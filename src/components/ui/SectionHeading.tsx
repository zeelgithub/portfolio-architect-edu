export default function SectionHeading({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>

      {subtitle && <p className="text-gray-600 dark:text-gray-300">{subtitle}</p>}
    </div>
  )
}

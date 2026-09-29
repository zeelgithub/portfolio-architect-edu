export default function Card({
  title,
  children,
  className = "",
}: {
  title?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 shadow-sm ${className}`}
    >
      {title && <h3 className="mb-3">{title}</h3>}
      <div className="space-y-4">{children}</div>
    </div>
  )
}

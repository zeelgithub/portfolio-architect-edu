import Link from "next/link"
import React from "react"

type ButtonProps =
  | ({
      href: string
      children: React.ReactNode
      variant?: "primary" | "secondary"
      className?: string
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({
      onClick: () => void
      children: React.ReactNode
      variant?: "primary" | "secondary"
      className?: string
    } & React.ButtonHTMLAttributes<HTMLButtonElement>)

const base =
  "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-all " +
  "focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:ring-offset-2 dark:focus:ring-offset-gray-950"

const variants = {
  primary:
    "bg-indigo-600 text-white shadow-sm shadow-indigo-600/20 hover:bg-indigo-500 hover:shadow-md hover:shadow-indigo-600/30",
  secondary:
    "bg-white text-gray-900 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800",
}

function classes(variant: keyof typeof variants, className?: string) {
  return `${base} ${variants[variant]} ${className ?? ""}`
}

export default function Button(props: ButtonProps) {
  if ("href" in props) {
    const { href, children, className, variant = "primary", ...rest } = props
    return (
      <Link href={href} className={classes(variant, className)} {...rest}>
        {children}
      </Link>
    )
  }

  const { onClick, children, className, variant = "primary", ...rest } = props
  return (
    <button onClick={onClick} className={classes(variant, className)} {...rest}>
      {children}
    </button>
  )
}

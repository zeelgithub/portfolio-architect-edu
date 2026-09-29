"use client"

import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

// true in the browser, false during server rendering, without an extra render
const noopSubscribe = () => () => {}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false)

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="
        p-2 rounded-md
        text-gray-700 dark:text-gray-200
        hover:bg-gray-100 dark:hover:bg-gray-800
        transition
      "
    >
      {isDark ? (
        <span aria-hidden>☀️</span>
      ) : (
        <span aria-hidden>🌙</span>
      )}
    </button>
  )
}
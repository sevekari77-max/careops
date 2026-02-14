"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navItems = [
    { name: "Overview", href: "/dashboard" },
    { name: "Leads", href: "/dashboard/leads" },
    { name: "Bookings", href: "/dashboard/bookings" },
    { name: "Forms", href: "/dashboard/forms" },
    { name: "Inventory", href: "/dashboard/inventory" },
    { name: "AI Onboarding", href: "/dashboard/ai-onboarding" },
    { name: "System Configuration", href: "/dashboard/system" },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6">
        {/* Brand Section */}
        <div className="mb-10">
          <div className="text-3xl font-extrabold tracking-wide">
            Flow<span className="text-blue-400">Ops</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Smart Business Operations
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded transition ${
                  isActive
                    ? "bg-slate-700"
                    : "hover:bg-slate-800"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-10">
        {children}
      </main>
    </div>
  )
}

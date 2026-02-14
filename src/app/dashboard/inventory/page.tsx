"use client"

import { useEffect, useState } from "react"

export default function InventoryPage() {
  const [services, setServices] = useState<string[]>([])

  useEffect(() => {
    fetch("/api/system-config")
      .then((res) => res.json())
      .then((config) => {
        if (config?.suggestedServices) {
          setServices(config.suggestedServices)
        }
      })
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Service Inventory
      </h1>

      <div className="bg-white p-6 rounded-lg shadow">
        {services.length === 0 ? (
          <p className="text-gray-600">
            No services configured yet.
            Run AI onboarding first.
          </p>
        ) : (
          <>
            <p className="mb-4 text-gray-600">
              Services currently available:
            </p>

            <ul className="space-y-2">
              {services.map((service, index) => (
                <li
                  key={index}
                  className="flex justify-between border-b pb-2"
                >
                  <span>{service}</span>
                  <span className="text-green-600 text-sm">
                    Active
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

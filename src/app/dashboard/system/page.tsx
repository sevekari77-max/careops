"use client"

import { useEffect, useState } from "react"

export default function SystemPage() {
  const [config, setConfig] = useState<any>(null)

  useEffect(() => {
    fetch("/api/system-config")
      .then((res) => res.json())
      .then((data) => setConfig(data))
  }, [])

  if (!config) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">
          System Configuration
        </h1>
        <p>No configuration applied yet.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        System Configuration
      </h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <p><strong>Business Type:</strong> {config.businessType}</p>

        <div>
          <strong>Services:</strong>
          <ul className="list-disc ml-5">
            {config.suggestedServices?.map(
              (s: string, i: number) => (
                <li key={i}>{s}</li>
              )
            )}
          </ul>
        </div>

        <div>
          <strong>Intake Fields:</strong>
          <ul className="list-disc ml-5">
            {config.suggestedIntakeFields?.map(
              (f: string, i: number) => (
                <li key={i}>{f}</li>
              )
            )}
          </ul>
        </div>

        <div>
          <strong>Automation Templates:</strong>
          <ul className="list-disc ml-5">
            {config.suggestedAutomationMessages?.map(
              (m: string, i: number) => (
                <li key={i}>{m}</li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

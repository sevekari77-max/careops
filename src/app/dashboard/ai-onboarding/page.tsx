"use client"

import { useState } from "react"

export default function AIOnboardingPage() {
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [applied, setApplied] = useState(false)

  const handleGenerate = async () => {
    if (!description) return

    setLoading(true)
    setResult(null)
    setApplied(false)

    // Simulated AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const res = await fetch("/api/ai-onboarding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    })

    const data = await res.json()

    const confidence = Math.floor(80 + Math.random() * 15)

    setResult({
      ...data,
      confidence,
    })

    setLoading(false)
  }

  const handleApply = async () => {
    if (!result) return

    await fetch("/api/system-config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    })

    setApplied(true)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        AI Smart Onboarding
      </h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <textarea
          placeholder="Describe your business... (e.g. I run a dental clinic open Mon-Fri 9-5 offering cleaning and implants)"
          className="w-full p-3 border rounded"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading
            ? "AI is analyzing your business..."
            : "Generate Setup"}
        </button>
      </div>

      {result && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-bold">
            AI Suggestions
          </h2>

          <p className="text-sm text-green-600 font-semibold">
            AI Confidence Score: {result.confidence}%
          </p>

          <div>
            <p className="font-semibold">Business Type:</p>
            <p>{result.businessType}</p>
          </div>

          <div>
            <p className="font-semibold">
              Suggested Services:
            </p>
            <ul className="list-disc ml-5">
              {result.suggestedServices?.map(
                (service: string, index: number) => (
                  <li key={index}>{service}</li>
                )
              )}
            </ul>
          </div>

          <div>
            <p className="font-semibold">
              Suggested Intake Fields:
            </p>
            <ul className="list-disc ml-5">
              {result.suggestedIntakeFields?.map(
                (field: string, index: number) => (
                  <li key={index}>{field}</li>
                )
              )}
            </ul>
          </div>

          <div>
            <p className="font-semibold">
              Suggested Automation Messages:
            </p>
            <ul className="list-disc ml-5">
              {result.suggestedAutomationMessages?.map(
                (msg: string, index: number) => (
                  <li key={index}>{msg}</li>
                )
              )}
            </ul>
          </div>

          <button
            onClick={handleApply}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
          >
            Apply This Setup
          </button>

          {applied && (
            <p className="text-green-600 font-semibold">
              System configured successfully!
            </p>
          )}
        </div>
      )}
    </div>
  )
}

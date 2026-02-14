"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function IntakePage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("bookingId")

  const [fields, setFields] = useState<string[]>([])
  const [formData, setFormData] = useState<any>({})
  const [submitted, setSubmitted] = useState(false)
  const [businessType, setBusinessType] = useState("Client")

  useEffect(() => {
    fetch("/api/system-config")
      .then((res) => res.json())
      .then((config) => {
        if (config?.suggestedIntakeFields) {
          setFields(config.suggestedIntakeFields)
        }

        if (config?.businessType) {
          if (config.businessType.includes("Medical")) {
            setBusinessType("Patient")
          } else if (config.businessType.includes("Beauty")) {
            setBusinessType("Client")
          } else if (config.businessType.includes("Fitness")) {
            setBusinessType("Member")
          } else {
            setBusinessType("Client")
          }
        }
      })
  }, [])

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await fetch("/api/intake-submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingId,
        formData,
      }),
    })

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-xl font-bold text-green-600">
            Intake Submitted Successfully
          </h2>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold">
          {businessType} Intake Form
        </h1>

        {bookingId && (
          <p className="text-sm text-gray-500">
            Booking ID: {bookingId}
          </p>
        )}

        {fields.map((field, index) => (
          <div key={index}>
            <label className="block text-sm font-medium mb-1">
              {field}
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              onChange={(e) =>
                handleChange(field, e.target.value)
              }
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
        >
          Submit Intake
        </button>
      </form>
    </div>
  )
}

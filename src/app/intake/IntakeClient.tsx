"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function IntakeClient() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("bookingId")

  const [stylist, setStylist] = useState("")
  const [previousTreatments, setPreviousTreatments] = useState("")
  const [allergies, setAllergies] = useState("")
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    await fetch("/api/intake-submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId,
        stylist,
        previousTreatments,
        allergies,
      }),
    })

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Intake Submitted Successfully
        </h1>
        <p className="text-gray-600">
          Thank you for completing your intake form.
        </p>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold">
          Client Intake Form
        </h1>

        <p className="text-sm text-gray-500">
          Booking ID: {bookingId}
        </p>

        <div>
          <label className="block text-sm font-medium mb-1">
            Preferred Stylist
          </label>
          <input
            type="text"
            value={stylist}
            onChange={(e) => setStylist(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Previous Treatments
          </label>
          <input
            type="text"
            value={previousTreatments}
            onChange={(e) => setPreviousTreatments(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Allergies to Products
          </label>
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

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

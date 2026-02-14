"use client"

import { useEffect, useState } from "react"

type Lead = {
  id: number
  name: string
  email: string
  message: string
  status: string
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])

  const fetchLeads = async () => {
    const res = await fetch("/api/leads")
    const data = await res.json()
    setLeads(data)
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const convertToBooking = async (lead: Lead) => {
    await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        service: "Consultation",
      }),
    })

    await fetch("/api/leads", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: lead.id,
      }),
    })

    fetchLeads()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Leads
      </h1>

      {leads.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">
            No leads yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white p-6 rounded-lg shadow space-y-2"
            >
              <h2 className="font-bold">
                {lead.name}
              </h2>
              <p className="text-gray-600">
                {lead.email}
              </p>
              <p>{lead.message}</p>

              <p className="text-sm">
                Status:
                <span
                  className={`ml-2 ${
                    lead.status === "Converted"
                      ? "text-green-600"
                      : "text-blue-600"
                  }`}
                >
                  {lead.status}
                </span>
              </p>

              {lead.status !== "Converted" && (
                <button
                  onClick={() =>
                    convertToBooking(lead)
                  }
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  Convert to Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

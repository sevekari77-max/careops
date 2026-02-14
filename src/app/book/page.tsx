"use client"

import { useEffect, useState } from "react"

export default function BookingPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [service, setService] = useState("")
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        date,
        time,
        service,
      }),
    })

    alert("Booking created successfully!")

    setName("")
    setEmail("")
    setDate("")
    setTime("")
    setService("")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">
          Book Appointment
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {services.length > 0 && (
          <select
            className="w-full mb-4 p-2 border rounded"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          >
            <option value="">Select Service</option>
            {services.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}

        <input
          type="date"
          className="w-full mb-4 p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="time"
          className="w-full mb-6 p-2 border rounded"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
        >
          Book Now
        </button>
      </form>
    </div>
  )
}

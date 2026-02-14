"use client"

import { useEffect, useState } from "react"

type Booking = {
  id: number
  name: string
  email: string
  service: string
  status: string
}

type IntakeSubmission = {
  bookingId: number
}

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [intakes, setIntakes] = useState<IntakeSubmission[]>([])

  useEffect(() => {
    const loadData = async () => {
      const bookingsRes = await fetch("/api/bookings")
      const bookingsData = await bookingsRes.json()
      setBookings(bookingsData)

      const intakeRes = await fetch("/api/intake-submissions")
      const intakeData = await intakeRes.json()
      setIntakes(intakeData)
    }

    loadData()
  }, [])

  const totalBookings = bookings.length
  const confirmed = bookings.filter(
    (b) => b.status === "Confirmed"
  ).length
  const completed = bookings.filter(
    (b) => b.status === "Completed"
  ).length

  const intakeCompletionRate =
    totalBookings === 0
      ? 0
      : Math.round((intakes.length / totalBookings) * 100)

  // 💰 Revenue Logic
  const servicePrices: Record<string, number> = {
    Consultation: 50,
    "Facial Treatment": 80,
    "Hair Coloring": 120,
  }

  const totalRevenue = bookings
    .filter((b) => b.status === "Completed")
    .reduce((sum, booking) => {
      return sum + (servicePrices[booking.service] || 0)
    }, 0)

  const averageBookingValue =
    completed === 0
      ? 0
      : Math.round(totalRevenue / completed)

  return (
    <div className="space-y-8">

      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold">
          Welcome to FlowOps
        </h1>
        <p className="opacity-80">
          Smart Operations Platform for Service Businesses
        </p>
      </div>

      {/* Operational Snapshot */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Operational Snapshot
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">

          <div className="bg-white p-6 rounded-xl shadow border-t-4 border-black">
            <p className="text-gray-500 text-sm">
              Total Bookings
            </p>
            <p className="text-2xl font-bold">
              {totalBookings}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border-t-4 border-blue-500">
            <p className="text-gray-500 text-sm">
              Confirmed
            </p>
            <p className="text-2xl font-bold text-blue-600">
              {confirmed}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border-t-4 border-green-500">
            <p className="text-gray-500 text-sm">
              Completed
            </p>
            <p className="text-2xl font-bold text-green-600">
              {completed}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border-t-4 border-purple-500">
            <p className="text-gray-500 text-sm">
              Intake Completion
            </p>
            <p className="text-2xl font-bold text-purple-600">
              {intakeCompletionRate}%
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border-t-4 border-yellow-500">
            <p className="text-gray-500 text-sm">
              Total Revenue
            </p>
            <p className="text-2xl font-bold text-yellow-600">
              ${totalRevenue}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border-t-4 border-emerald-500">
            <p className="text-gray-500 text-sm">
              Avg Booking Value
            </p>
            <p className="text-2xl font-bold text-emerald-600">
              ${averageBookingValue}
            </p>
          </div>

        </div>
      </div>

      {/* System Insight */}
      <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
        <h2 className="text-lg font-semibold mb-2">
          System Insight
        </h2>

        {totalBookings === 0 && (
          <p className="text-gray-600">
            No bookings yet. Activate your public booking page to start generating revenue.
          </p>
        )}

        {totalBookings > 0 && completed === 0 && (
          <p className="text-gray-600">
            Bookings exist but none completed. Focus on service execution.
          </p>
        )}

        {completed > 0 && (
          <p className="text-gray-600">
            Business generating revenue. Monitor intake completion to improve service quality.
          </p>
        )}
      </div>

      {/* Launch Public Experience */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          🚀 Launch Public Experience
        </h2>

        <div className="flex flex-wrap gap-4">
          <a
            href="/book"
            target="_blank"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            Open Booking Page
          </a>

          <a
            href="/contact"
            target="_blank"
            className="px-6 py-3 rounded-lg bg-gray-900 text-white font-semibold shadow hover:bg-black transition"
          >
            Open Contact Page
          </a>
        </div>
      </div>

    </div>
  )
}

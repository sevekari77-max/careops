"use client"

import { useEffect, useState } from "react"

type Booking = {
  id: number
  name: string
  email: string
  date: string
  time: string
  service?: string
  status: string
  logs: string[]
}

type IntakeSubmission = {
  id: number
  bookingId: string
  formData: {
    [key: string]: string
  }
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [intakeSubmissions, setIntakeSubmissions] = useState<
    IntakeSubmission[]
  >([])
  const [toast, setToast] = useState<string | null>(null)

  const fetchData = async () => {
    const bookingRes = await fetch("/api/bookings")
    const bookingData = await bookingRes.json()
    setBookings(bookingData)

    const intakeRes = await fetch("/api/intake-submissions")
    const intakeData = await intakeRes.json()
    setIntakeSubmissions(intakeData)
  }

  useEffect(() => {
    fetchData()

    // Auto refresh every 10 seconds
    const interval = setInterval(() => {
      fetchData()
    }, 10000)

    // Refresh when tab becomes active again
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchData()
      }
    }

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    )

    return () => {
      clearInterval(interval)
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      )
    }
  }, [])

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => {
      setToast(null)
    }, 2500)
  }

  const updateStatus = async (id: number, status: string) => {
    await fetch("/api/bookings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    })

    fetchData()

    if (status === "Confirmed") {
      showToast("Booking Confirmed Successfully")
    }

    if (status === "Completed") {
      showToast("Booking Marked as Completed")
    }
  }

  const getIntakeForBooking = (bookingId: number) => {
    return intakeSubmissions.find(
      (submission) =>
        submission.bookingId === String(bookingId)
    )
  }

  return (
    <div className="relative">
      <h1 className="text-2xl font-bold mb-6">
        Bookings
      </h1>

      {toast && (
        <div className="fixed top-5 right-5 bg-black text-white px-6 py-3 rounded shadow-lg">
          {toast}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">
            No bookings yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => {
            const intake = getIntakeForBooking(
              booking.id
            )

            return (
              <div
                key={booking.id}
                className="bg-white p-6 rounded-lg shadow space-y-4"
              >
                <div>
                  <h2 className="font-bold text-lg">
                    {booking.name}
                  </h2>

                  <p className="text-gray-600">
                    {booking.email}
                  </p>

                  <p>
                    {booking.date} at {booking.time}
                  </p>

                  {booking.service && (
                    <p className="text-sm">
                      Service: {booking.service}
                    </p>
                  )}
                </div>

                {/* Status Progress */}
                <div className="text-sm">
                  <div className="flex items-center gap-2 font-medium">
                    <span
                      className={`px-2 py-1 rounded ${
                        booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      Pending
                    </span>

                    <span>→</span>

                    <span
                      className={`px-2 py-1 rounded ${
                        booking.status === "Confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      Confirmed
                    </span>

                    <span>→</span>

                    <span
                      className={`px-2 py-1 rounded ${
                        booking.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      Completed
                    </span>
                  </div>
                </div>

                {/* Lifecycle Buttons */}
                {booking.status !== "Completed" && (
                  <div className="flex gap-2">
                    {booking.status === "Pending" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            booking.id,
                            "Confirmed"
                          )
                        }
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Confirm
                      </button>
                    )}

                    <button
                      onClick={() =>
                        updateStatus(
                          booking.id,
                          "Completed"
                        )
                      }
                      className="bg-green-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Complete
                    </button>
                  </div>
                )}

                {/* Intake Section */}
                {!intake ? (
                  <div>
                    <a
                      href={`/intake?bookingId=${booking.id}`}
                      target="_blank"
                      className="inline-block bg-purple-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Fill Intake Form
                    </a>
                  </div>
                ) : (
                  <div className="mt-2 border-t pt-3">
                    <p className="font-semibold mb-2">
                      Intake Responses:
                    </p>

                    <ul className="text-sm text-gray-700 space-y-1">
                      {Object.entries(
                        intake.formData
                      ).map(([key, value]) => (
                        <li key={key}>
                          <strong>{key}:</strong>{" "}
                          {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Activity Log */}
                <div>
                  <p className="text-sm font-semibold mb-1">
                    Activity Log:
                  </p>
                  <ul className="text-sm text-gray-600 list-disc ml-5">
                    {booking.logs.map(
                      (log, index) => (
                        <li key={index}>
                          {log}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

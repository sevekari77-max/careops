import { NextResponse } from "next/server"

const globalForBookings = global as unknown as {
  bookings: any[]
}

if (!globalForBookings.bookings) {
  globalForBookings.bookings = []
}

// CREATE BOOKING
export async function POST(request: Request) {
  const body = await request.json()

  const newBooking = {
    id: Date.now(),
    name: body.name,
    email: body.email,
    date: body.date || "TBD",
    time: body.time || "TBD",
    service: body.service || "Consultation",
    status: "Pending",
    logs: ["Booking Created"],
  }

  globalForBookings.bookings.push(newBooking)

  return NextResponse.json({ success: true })
}

// GET BOOKINGS
export async function GET() {
  return NextResponse.json(globalForBookings.bookings)
}

// UPDATE STATUS
export async function PUT(request: Request) {
  const body = await request.json()

  const bookingIndex = globalForBookings.bookings.findIndex(
    (b) => b.id === body.id
  )

  if (bookingIndex !== -1) {
    globalForBookings.bookings[bookingIndex].status = body.status

    if (body.status === "Confirmed") {
      globalForBookings.bookings[bookingIndex].logs.push(
        "Confirmation Email Sent"
      )
    }

    if (body.status === "Completed") {
      globalForBookings.bookings[bookingIndex].logs.push(
        "Follow-up Email Scheduled"
      )
    }
  }

  return NextResponse.json({ success: true })
}

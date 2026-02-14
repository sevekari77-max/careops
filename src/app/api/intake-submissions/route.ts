import { NextResponse } from "next/server"

const globalForIntake = global as unknown as {
  submissions: any[]
}

if (!globalForIntake.submissions) {
  globalForIntake.submissions = []
}

export async function POST(request: Request) {
  const body = await request.json()

  const newSubmission = {
    id: Date.now(),
    bookingId: body.bookingId,
    formData: body.formData,
  }

  globalForIntake.submissions.push(newSubmission)

  return NextResponse.json({ success: true })
}

export async function GET() {
  return NextResponse.json(globalForIntake.submissions)
}

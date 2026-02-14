import { NextResponse } from "next/server"

let seeded = false

export async function POST() {
  if (seeded) {
    return NextResponse.json({ message: "Already seeded" })
  }

  seeded = true

  return NextResponse.json({ message: "Demo seed ready" })
}

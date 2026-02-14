import { NextResponse } from "next/server"

const globalForConfig = global as unknown as {
  config: any
}

if (!globalForConfig.config) {
  globalForConfig.config = null
}

// SAVE CONFIG
export async function POST(request: Request) {
  const body = await request.json()

  globalForConfig.config = body

  return NextResponse.json({ success: true })
}

// GET CONFIG
export async function GET() {
  return NextResponse.json(globalForConfig.config)
}

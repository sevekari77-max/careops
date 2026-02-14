import { NextResponse } from "next/server"

const globalForLeads = global as unknown as {
  leads: any[]
}

if (!globalForLeads.leads) {
  globalForLeads.leads = []
}

export async function POST(request: Request) {
  const body = await request.json()

  const newLead = {
    id: Date.now(),
    name: body.name,
    email: body.email,
    message: body.message,
    status: "New",
  }

  globalForLeads.leads.push(newLead)

  return NextResponse.json({ success: true })
}

export async function GET() {
  return NextResponse.json(globalForLeads.leads)
}
export async function PUT(request: Request) {
  const body = await request.json()

  const lead = globalForLeads.leads.find(
    (l) => l.id === body.id
  )

  if (lead) {
    lead.status = "Converted"
  }

  return NextResponse.json({ success: true })
}

import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const description: string = body.description.toLowerCase()

  let businessType = "General Service Business"
  let suggestedServices: string[] = []
  let suggestedIntakeFields: string[] = []
  let suggestedAutomationMessages: string[] = []

  if (description.includes("clinic") || description.includes("dental") || description.includes("medical")) {
    businessType = "Medical Clinic"

    suggestedServices = [
      "General Consultation",
      "Dental Cleaning",
      "Implant Procedure",
    ]

    suggestedIntakeFields = [
      "Medical History",
      "Current Medications",
      "Allergies",
      "Emergency Contact",
    ]

    suggestedAutomationMessages = [
      "Appointment Confirmation Email",
      "Pre-Visit Reminder 24 Hours Before",
      "Post-Visit Follow-up Message",
    ]
  }

  else if (description.includes("salon") || description.includes("beauty")) {
    businessType = "Beauty Salon"

    suggestedServices = [
      "Haircut",
      "Hair Coloring",
      "Facial Treatment",
    ]

    suggestedIntakeFields = [
      "Preferred Stylist",
      "Previous Treatments",
      "Allergies to Products",
    ]

    suggestedAutomationMessages = [
      "Booking Confirmation SMS",
      "Reminder 2 Hours Before Appointment",
      "Thank You Message After Visit",
    ]
  }

  else if (description.includes("gym") || description.includes("fitness")) {
    businessType = "Fitness Center"

    suggestedServices = [
      "Personal Training",
      "Group Class",
      "Diet Consultation",
    ]

    suggestedIntakeFields = [
      "Fitness Goals",
      "Injury History",
      "Current Weight",
    ]

    suggestedAutomationMessages = [
      "Welcome Email",
      "Weekly Progress Reminder",
      "Membership Renewal Reminder",
    ]
  }

  else {
    suggestedServices = [
      "Standard Service",
      "Premium Service",
    ]

    suggestedIntakeFields = [
      "Basic Information",
      "Special Requests",
    ]

    suggestedAutomationMessages = [
      "Booking Confirmation",
      "Reminder Notification",
    ]
  }

  return NextResponse.json({
    businessType,
    suggestedServices,
    suggestedIntakeFields,
    suggestedAutomationMessages,
  })
}

import { Suspense } from "react"
import IntakeClient from "./IntakeClient"

export const dynamic = "force-dynamic"

export default function IntakePage() {
  return (
    <Suspense fallback={<div className="p-10">Loading intake form...</div>}>
      <IntakeClient />
    </Suspense>
  )
}

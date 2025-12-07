import { NextRequest, NextResponse } from "next/server"
import { strapiPublicClient } from "@/lib/strapi-client"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Utilisation du SDK Strapi avec collection().create()
    const volunteerApplications = strapiPublicClient.collection("volunteer-applications")

    await volunteerApplications.create({
      firstName: body.firstName ?? "",
      lastName: body.lastName ?? "",
      email: body.email ?? "",
      phone: body.phone ?? "",
      opportunityType: body.opportunityType || null,
      motivation: body.motivation ?? "",
      sourcePage: body.sourcePage ?? "/nous-rejoindre",
    })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    console.error("[volunteer-application] Failed to submit application", error)
    return NextResponse.json({ ok: false, error: "APPLICATION_SUBMIT_FAILED" }, { status: 500 })
  }
}

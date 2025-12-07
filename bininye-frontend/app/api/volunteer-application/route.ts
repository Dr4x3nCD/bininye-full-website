import { NextRequest, NextResponse } from "next/server"
import { fetchStrapi } from "@/lib/strapi-client"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const data = {
      firstName: body.firstName ?? "",
      lastName: body.lastName ?? "",
      email: body.email ?? "",
      phone: body.phone ?? "",
      opportunityType: body.opportunityType ?? null,
      motivation: body.motivation ?? "",
      sourcePage: body.sourcePage ?? "/nous-rejoindre",
    }

    await fetchStrapi("/volunteer-applications", {
      method: "POST",
      body: JSON.stringify({ data }),
      // Utiliser les permissions du rôle Public (create) plutôt que le token read-only
      withAuth: false,
    })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    console.error("[volunteer-application] Failed to submit application", error)
    return NextResponse.json({ ok: false, error: "APPLICATION_SUBMIT_FAILED" }, { status: 500 })
  }
}

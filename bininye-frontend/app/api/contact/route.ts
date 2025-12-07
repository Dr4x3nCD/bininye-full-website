import { NextRequest, NextResponse } from "next/server"
import { fetchStrapi } from "@/lib/strapi-client"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const data = {
      firstName: body.firstName ?? "",
      lastName: body.lastName ?? "",
      email: body.email ?? "",
      phone: body.phone ?? null,
      subject: body.subject ?? null,
      message: body.message ?? "",
      organization: body.organization ?? null,
      sourcePage: body.sourcePage ?? "/contact",
    }

    await fetchStrapi("/contact-messages", {
      method: "POST",
      body: JSON.stringify({ data }),
      withAuth: false,
    })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    console.error("[contact] Failed to submit contact message", error)
    return NextResponse.json({ ok: false, error: "CONTACT_SUBMIT_FAILED" }, { status: 500 })
  }
}

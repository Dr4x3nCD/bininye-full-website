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
      type: body.type ?? "financial",
      amountLabel: body.amountLabel ?? null,
      amountValue: typeof body.amountValue === "number" ? body.amountValue : null,
      materialCategory: body.materialCategory ?? null,
      materialDescription: body.materialDescription ?? null,
      message: body.message ?? null,
      sourcePage: body.sourcePage ?? "/contribuer",
    }

    await fetchStrapi("/donation-intents", {
      method: "POST",
      body: JSON.stringify({ data }),
      withAuth: false,
    })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    console.error("[donation-intent] Failed to submit donation intent", error)
    return NextResponse.json({ ok: false, error: "DONATION_INTENT_SUBMIT_FAILED" }, { status: 500 })
  }
}

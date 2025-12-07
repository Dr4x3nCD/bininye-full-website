// Usage :
//   cd bininye-frontend
//   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337 \
//   STRAPI_API_TOKEN={{TON_TOKEN_API}} \
//   node scripts/inspect-media-items.mjs
//
// Le script utilise directement les variables d'environnement du process
// (pas de dotenv) pour appeler /api/media-items?populate=thumbnail et
// afficher la structure JSON renvoyée par Strapi.

const baseURL = (process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/$/, "")
const token = process.env.STRAPI_API_TOKEN

async function main() {
  const url = `${baseURL}/api/media-items?populate=thumbnail&pagination[pageSize]=1`
  console.log("Fetching:", url)
  console.log("NEXT_PUBLIC_STRAPI_URL set:", !!process.env.NEXT_PUBLIC_STRAPI_URL)
  console.log("STRAPI_API_TOKEN present:", !!token)

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  console.log("Status:", res.status, res.statusText)

  const json = await res.json().catch((err) => {
    console.error("Error parsing JSON:", err)
    process.exit(1)
  })

  if (res.status === 403) {
    console.error("\n❌ 403 Forbidden :\n - Vérifie que le token API a bien la permission 'find' sur le content-type 'media-item'\n - Ou que le rôle Public a le droit 'find' si tu n'utilises pas de token\n")
  }

  console.dir(json, { depth: null })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

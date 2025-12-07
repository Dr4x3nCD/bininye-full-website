import { getGlobalSettings } from "@/lib/strapi-global-settings"
import { HeaderClient } from "./header-client"

export async function Header() {
  const settings = await getGlobalSettings()
  return <HeaderClient settings={settings} />
}

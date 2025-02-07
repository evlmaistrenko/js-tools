const STEAM_OPEN_ID_URL = "https://steamcommunity.com/openid/login"

let defaultRealm: URL | string | undefined
try {
	defaultRealm = new URL(window.location.href)
	defaultRealm.pathname = ""
	defaultRealm.search = ""
	defaultRealm.hash = ""
	defaultRealm.username = ""
	defaultRealm.password = ""
} catch {}

/**
 * Returns url to sign in via Steam
 *
 * @param returnUrl Return URL
 * @param realm OpenID realm
 */
export function getUrl(
	returnUrl: string | URL,
	realm: URL | string = defaultRealm!,
): URL {
	const url = new URL(STEAM_OPEN_ID_URL)
	const params = new URLSearchParams({
		"openid.ns": "http://specs.openid.net/auth/2.0",
		"openid.mode": "checkid_setup",
		"openid.return_to": returnUrl.toString(),
		"openid.realm": realm.toString(),
		"openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
		"openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
	}).toString()
	url.search = params.toString()
	return url
}

/**
 * Returns SteamID
 *
 * @param returnUrl Return URL
 * @param verify Whether to verify signature
 * @returns SteamID
 */
export async function getSteamId(
	returnUrl: string | URL,
	verify = true,
): Promise<string> {
	returnUrl = new URL(returnUrl)
	if (verify) {
		const response = await fetch(STEAM_OPEN_ID_URL, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams({
				"openid.assoc_handle": returnUrl.searchParams.get(
					"openid.assoc_handle",
				)!,
				"openid.signed": returnUrl.searchParams.get("openid.signed")!,
				"openid.sig": returnUrl.searchParams.get("openid.sig")!,
				"openid.ns": returnUrl.searchParams.get("openid.ns")!,
				"openid.mode": "check_authentication",
				...returnUrl.searchParams
					.get("openid.signed")!
					.split(",")
					.reduce<Record<string, string>>((signed, key) => {
						signed[`openid.${key}`] = returnUrl.searchParams.get(
							`openid.${key}`,
						)!
						return signed
					}, {}),
			}),
		}).then((response) => response.text())
		if (!response.includes("is_valid:true"))
			throw new Error("Steam OpenID verification failed.")
	}
	return returnUrl.searchParams.get("openid.claimed_id")!.split("/").pop()!
}

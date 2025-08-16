const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

export async function fetchJson(path, options = {}) {
	const res = await fetch(`${BASE}${path}`, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...(options.headers || {}),
		},
	})
	if (!res.ok) throw new Error(`Request failed: ${res.status}`)
	return res.json()
}

export const Api = {
	getCampaign: () => fetchJson('/campaign'),
	getVendors: () => fetchJson('/vendors'),
	getDonors: () => fetchJson('/donors'),
	createDonation: (payload) => fetchJson('/donations', { method: 'POST', body: JSON.stringify(payload) }),
}
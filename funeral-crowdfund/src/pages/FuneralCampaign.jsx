import { useMemo, useState } from 'react'
import CampaignHeader from '../components/CampaignHeader'
import DonationForm from '../components/DonationForm'
import VendorCard from '../components/VendorCard'
import DonorWall from '../components/DonorWall'

const sampleVendors = [
	{ id: 1, name: 'Serene Hearse Co.', logoUrl: 'https://via.placeholder.com/64x64?text=H', serviceType: 'Hearse', priceRange: '$$ - $$$', location: 'Nairobi', phone: '+254700000001', profileUrl: '#' },
	{ id: 2, name: 'Evergreen Caskets', logoUrl: 'https://via.placeholder.com/64x64?text=C', serviceType: 'Casket', priceRange: '$ - $$', location: 'Mombasa', phone: '+254700000002', profileUrl: '#' },
	{ id: 3, name: 'Comfort Catering', logoUrl: 'https://via.placeholder.com/64x64?text=K', serviceType: 'Catering', priceRange: '$$ - $$$', location: 'Kisumu', phone: '+254700000003', profileUrl: '#' },
	{ id: 4, name: 'Grace Flowers', logoUrl: 'https://via.placeholder.com/64x64?text=F', serviceType: 'Flowers', priceRange: '$ - $$', location: 'Nakuru', phone: '+254700000004', profileUrl: '#' },
]

const sampleDonors = Array.from({ length: 18 }).map((_, i) => ({
	id: i + 1,
	name: i % 3 === 0 ? 'Anonymous' : `Donor ${i + 1}`,
	amount: Math.floor(Math.random() * 5000) + 500,
	timestamp: Date.now() - i * 1000 * 60 * 60,
}))

export default function FuneralCampaign() {
	const [raised, setRaised] = useState(23500)
	const goal = 100000
	const [donors, setDonors] = useState(sampleDonors)
	const [donationOpen, setDonationOpen] = useState(false)

	const remaining = Math.max(0, goal - raised)
	const endDate = useMemo(() => Date.now() + 3 * 24 * 60 * 60 * 1000, [])
	const timeLeft = useMemo(() => {
		const diff = Math.max(0, endDate - Date.now())
		const days = Math.floor(diff / (1000 * 60 * 60 * 24))
		const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
		return `${days}d ${hours}h`
	}, [endDate, raised])

	function handleDonate({ donorName, amount }) {
		setRaised((r) => r + amount)
		setDonors((d) => [
			{ id: d.length + 1, name: donorName || 'Anonymous', amount, timestamp: Date.now() },
			...d,
		])
	}

	// Vendor filters
	const [query, setQuery] = useState('')
	const [serviceType, setServiceType] = useState('')
	const [location, setLocation] = useState('')
	const [price, setPrice] = useState('')

	const filteredVendors = sampleVendors.filter((v) => {
		const matchesQuery = v.name.toLowerCase().includes(query.toLowerCase())
		const matchesService = !serviceType || v.serviceType === serviceType
		const matchesLocation = !location || v.location === location
		const matchesPrice = !price || v.priceRange.includes(price)
		return matchesQuery && matchesService && matchesLocation && matchesPrice
	})

	return (
		<div className="min-h-screen">
			<CampaignHeader
				title="Support the Muriuki Family Funeral Fund"
				organizerName="Jane Muriuki"
				goalAmount={goal}
				raisedAmount={raised}
				donorCount={donors.length}
			/>

			<main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					<section className="lg:col-span-2">
						<div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
							<h2 className="text-lg font-semibold text-gray-900">Story</h2>
							<p className="mt-2 text-sm leading-6 text-gray-700">
								We are raising funds to support the funeral arrangements for our beloved father. Your contribution will assist with the hearse, casket, venue, and catering.
							</p>
							<div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
								<img src="https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop" alt="Memories 1" className="h-28 w-full rounded-lg object-cover" />
								<img src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=800&auto=format&fit=crop" alt="Memories 2" className="h-28 w-full rounded-lg object-cover" />
								<img src="https://images.unsplash.com/photo-1498359740250-90e0d7efb060?q=80&w=800&auto=format&fit=crop" alt="Memories 3" className="hidden h-28 w-full rounded-lg object-cover sm:block" />
							</div>
						</div>

						<div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
							<h2 className="text-lg font-semibold text-gray-900">Approved Vendors</h2>
							<div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:items-end">
								<div className="col-span-2 sm:col-span-1 sm:col-start-1">
									<label className="mb-1 block text-xs font-medium text-gray-700">Search</label>
									<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search vendors..." className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30" />
								</div>
								<div>
									<label className="mb-1 block text-xs font-medium text-gray-700">Service</label>
									<select value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30">
										<option value="">All</option>
										<option>Hearse</option>
										<option>Casket</option>
										<option>Catering</option>
										<option>Flowers</option>
									</select>
								</div>
								<div>
									<label className="mb-1 block text-xs font-medium text-gray-700">Location</label>
									<select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30">
										<option value="">All</option>
										<option>Nairobi</option>
										<option>Mombasa</option>
										<option>Kisumu</option>
										<option>Nakuru</option>
									</select>
								</div>
								<div>
									<label className="mb-1 block text-xs font-medium text-gray-700">Price</label>
									<select value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30">
										<option value="">Any</option>
										<option>$</option>
										<option>$$</option>
										<option>$$$</option>
									</select>
								</div>
							</div>
							<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
								{filteredVendors.map((v) => (
									<VendorCard key={v.id} vendor={v} />
								))}
								{filteredVendors.length === 0 && (
									<p className="text-sm text-gray-600">No vendors match your search.</p>
								)}
							</div>
						</div>
					</section>

					<aside className="space-y-6">
						<section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
							<h3 className="text-base font-semibold text-gray-900">Donation status</h3>
							<div className="mt-3 grid grid-cols-3 gap-2 text-center">
								<div className="rounded-lg bg-gray-100 p-3">
									<p className="text-xs text-gray-600">Raised</p>
									<p className="text-sm font-semibold text-gray-900">${raised.toLocaleString()}</p>
								</div>
								<div className="rounded-lg bg-gray-100 p-3">
									<p className="text-xs text-gray-600">Remaining</p>
									<p className="text-sm font-semibold text-gray-900">${remaining.toLocaleString()}</p>
								</div>
								<div className="rounded-lg bg-gray-100 p-3">
									<p className="text-xs text-gray-600">Time left</p>
									<p className="text-sm font-semibold text-gray-900">{timeLeft}</p>
								</div>
							</div>
							<button onClick={() => setDonationOpen(true)} className="mt-4 w-full rounded-lg bg-accent px-4 py-2.5 font-semibold text-white shadow-sm hover:bg-green-600">Donate Now</button>
						</section>

						<DonorWall donors={donors} />
					</aside>
				</div>
			</main>

			<DonationForm isOpen={donationOpen} onClose={() => setDonationOpen(false)} onDonate={handleDonate} />
		</div>
	)
}
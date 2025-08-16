import { motion } from 'framer-motion'

export default function VendorCard({ vendor }) {
	return (
		<motion.div
			whileHover={{ y: -4 }}
			className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
		>
			<div className="flex items-center gap-3">
				<img src={vendor.logoUrl} alt={vendor.name} className="h-12 w-12 rounded-lg object-cover" />
				<div className="min-w-0">
					<h4 className="truncate text-base font-semibold text-gray-900">{vendor.name}</h4>
					<p className="text-sm text-gray-600">{vendor.serviceType}</p>
				</div>
			</div>
			<div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
				<span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1">💲{vendor.priceRange}</span>
				<span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1">📍{vendor.location}</span>
			</div>
			<div className="mt-4 flex items-center gap-2">
				<a href={vendor.profileUrl} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50">View Profile</a>
				<a href={`tel:${vendor.phone}`} className="flex-1 rounded-lg bg-accent px-3 py-2 text-center text-sm font-semibold text-white hover:bg-green-600">Contact</a>
			</div>
		</motion.div>
	)
}
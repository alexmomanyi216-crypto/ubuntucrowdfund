import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DonorWall({ donors }) {
	const PAGE_SIZE = 8
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

	const visibleDonors = donors.slice(0, visibleCount)
	const hasMore = visibleCount < donors.length

	return (
		<section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
			<h3 className="mb-3 text-base font-semibold text-gray-900">Recent donors</h3>
			<div className="max-h-80 overflow-y-auto pr-2">
				<AnimatePresence initial={false}>
					{visibleDonors.map((donor) => (
						<motion.div
							key={donor.id}
							initial={{ opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0"
						>
							<div>
								<p className="text-sm font-medium text-gray-900">{donor.name}</p>
								<p className="text-xs text-gray-500">{new Date(donor.timestamp).toLocaleString()}</p>
							</div>
							<p className="text-sm font-semibold text-gray-900">${donor.amount.toLocaleString()}</p>
						</motion.div>
					))}
				</AnimatePresence>
			</div>
			{hasMore && (
				<button onClick={() => setVisibleCount((c) => c + PAGE_SIZE)} className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Load more</button>
			)}
		</section>
	)
}
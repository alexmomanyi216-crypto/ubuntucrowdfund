import { motion } from 'framer-motion'

export default function CampaignHeader({ title, organizerName, goalAmount, raisedAmount, donorCount }) {
	const progress = Math.min(100, Math.round((raisedAmount / goalAmount) * 100))

	return (
		<header className="bg-white shadow-sm">
			<div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">{title}</h1>
						<p className="mt-1 text-sm text-gray-600">Organized by <span className="font-medium text-gray-800">{organizerName}</span></p>
					</div>
					<div className="w-full sm:w-1/2">
						<div className="mb-2 flex items-center justify-between text-sm text-gray-600">
							<span>
								Raised: <span className="font-semibold text-gray-900">${raisedAmount.toLocaleString()}</span> / ${goalAmount.toLocaleString()}
							</span>
							<span>{donorCount} donors</span>
						</div>
						<div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
							<motion.div
								className="h-full rounded-full bg-accent"
								initial={{ width: 0 }}
								animate={{ width: `${progress}%` }}
								transition={{ type: 'spring', stiffness: 120, damping: 20 }}
							/>
						</div>
						<p className="mt-1 text-right text-xs text-gray-600">{progress}% of goal</p>
					</div>
				</div>
			</div>
		</header>
	)
}
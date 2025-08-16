import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DonationForm({ isOpen, onClose, onDonate }) {
	const [step, setStep] = useState('form')
	const [donorName, setDonorName] = useState('')
	const [amount, setAmount] = useState('')
	const [isAnonymous, setIsAnonymous] = useState(false)
	const [paymentMethod, setPaymentMethod] = useState('mpesa')

	const parsedAmount = Number(amount)
	const isValid = !Number.isNaN(parsedAmount) && parsedAmount > 0

	function resetForm() {
		setStep('form')
		setDonorName('')
		setAmount('')
		setIsAnonymous(false)
		setPaymentMethod('mpesa')
	}

	function handleSubmit(e) {
		e.preventDefault()
		if (!isValid) return
		setStep('confirm')
	}

	function handleConfirm() {
		onDonate({ donorName: isAnonymous ? 'Anonymous' : donorName || 'Anonymous', amount: parsedAmount, paymentMethod })
		resetForm()
		onClose()
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<div className="absolute inset-0 bg-black/40" onClick={() => { resetForm(); onClose() }} />
					<motion.div
						className="relative w-full max-w-lg rounded-t-2xl bg-white p-4 shadow-xl sm:rounded-2xl sm:p-6"
						initial={{ y: 30, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 30, opacity: 0 }}
						transition={{ type: 'spring', stiffness: 140, damping: 20 }}
					>
						<div className="mb-4 flex items-center justify-between">
							<h2 className="text-lg font-semibold text-gray-900">Donate to this campaign</h2>
							<button onClick={() => { resetForm(); onClose() }} className="rounded-md p-2 text-gray-500 hover:bg-gray-100" aria-label="Close">✕</button>
						</div>

						{step === 'form' && (
							<form className="space-y-4" onSubmit={handleSubmit}>
								<div>
									<label className="mb-1 block text-sm font-medium text-gray-700">Your name</label>
									<input
										type="text"
										value={donorName}
										onChange={(e) => setDonorName(e.target.value)}
										placeholder="Enter your name"
										className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
									/>
								</div>
								<div>
									<label className="mb-1 block text-sm font-medium text-gray-700">Amount</label>
									<input
										type="number"
										min="1"
										step="0.01"
										value={amount}
										onChange={(e) => setAmount(e.target.value)}
										placeholder="e.g. 1000"
										className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
									/>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<input id="anon" type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent" />
										<label htmlFor="anon" className="text-sm text-gray-700">Donate anonymously</label>
									</div>
									<span className="text-xs text-gray-500">You can still leave a message later</span>
								</div>

								<div>
									<label className="mb-2 block text-sm font-medium text-gray-700">Payment method</label>
									<div className="inline-flex rounded-lg border border-gray-200 p-1">
										<button type="button" onClick={() => setPaymentMethod('mpesa')} className={`rounded-md px-3 py-1.5 text-sm ${paymentMethod === 'mpesa' ? 'bg-accent text-white' : 'text-gray-700 hover:bg-gray-100'}`}>M-Pesa</button>
										<button type="button" onClick={() => setPaymentMethod('card')} className={`rounded-md px-3 py-1.5 text-sm ${paymentMethod === 'card' ? 'bg-accent text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Card</button>
									</div>
								</div>

								<button type="submit" disabled={!isValid} className="w-full rounded-lg bg-accent px-4 py-2.5 font-semibold text-white shadow-sm hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60">Continue</button>
							</form>
						)}

						{step === 'confirm' && (
							<div className="space-y-4">
								<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
									<h3 className="mb-2 text-sm font-semibold text-gray-900">Confirm your donation</h3>
									<ul className="space-y-1 text-sm">
										<li><span className="text-gray-600">Name:</span> <span className="font-medium">{isAnonymous ? 'Anonymous' : (donorName || 'Anonymous')}</span></li>
										<li><span className="text-gray-600">Amount:</span> <span className="font-medium">${parsedAmount.toLocaleString()}</span></li>
										<li><span className="text-gray-600">Payment:</span> <span className="font-medium capitalize">{paymentMethod}</span></li>
									</ul>
								</div>
								<div className="flex items-center gap-3">
									<button onClick={() => setStep('form')} className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 hover:bg-gray-50">Back</button>
									<button onClick={handleConfirm} className="flex-1 rounded-lg bg-accent px-4 py-2.5 font-semibold text-white shadow-sm hover:bg-green-600">Confirm & Pay</button>
								</div>
							</div>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
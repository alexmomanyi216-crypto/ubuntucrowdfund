import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const db = new Low(new JSONFile('./data.json'), { vendors: [], donors: [], campaign: { goal: 100000, raised: 23500 } })
await db.read()
if (!db.data) db.data = { vendors: [], donors: [], campaign: { goal: 100000, raised: 23500 } }
await db.write()

// Seed vendors if empty
if (db.data.vendors.length === 0) {
	db.data.vendors = [
		{ id: 1, name: 'Serene Hearse Co.', logoUrl: 'https://via.placeholder.com/64x64?text=H', serviceType: 'Hearse', priceRange: '$$ - $$$', location: 'Nairobi', phone: '+254700000001', profileUrl: '#' },
		{ id: 2, name: 'Evergreen Caskets', logoUrl: 'https://via.placeholder.com/64x64?text=C', serviceType: 'Casket', priceRange: '$ - $$', location: 'Mombasa', phone: '+254700000002', profileUrl: '#' },
		{ id: 3, name: 'Comfort Catering', logoUrl: 'https://via.placeholder.com/64x64?text=K', serviceType: 'Catering', priceRange: '$$ - $$$', location: 'Kisumu', phone: '+254700000003', profileUrl: '#' },
		{ id: 4, name: 'Grace Flowers', logoUrl: 'https://via.placeholder.com/64x64?text=F', serviceType: 'Flowers', priceRange: '$ - $$', location: 'Nakuru', phone: '+254700000004', profileUrl: '#' },
	]
	await db.write()
}

const base = process.env.PORT || 3001
const api = express.Router()

api.get('/vendors', async (req, res) => {
	res.json(db.data.vendors)
})

api.get('/donors', async (req, res) => {
	res.json(db.data.donors.sort((a, b) => b.timestamp - a.timestamp))
})

api.get('/campaign', async (req, res) => {
	res.json(db.data.campaign)
})

api.post('/donations', async (req, res) => {
	const { donorName, amount, paymentMethod } = req.body
	if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid amount' })

	// Simulate payment success
	const simulate = process.env.ENABLE_PAYMENT_SIMULATION === 'true'
	if (!simulate) {
		// Here you would integrate with Stripe/M-Pesa and verify payment
	}

	const donation = { id: db.data.donors.length + 1, name: donorName || 'Anonymous', amount: Number(amount), timestamp: Date.now(), paymentMethod }
	db.data.donors.unshift(donation)
	db.data.campaign.raised += Number(amount)
	await db.write()
	res.json({ success: true, donation })
})

app.use('/api', api)

app.listen(base, () => {
	console.log(`API running on http://localhost:${base}`)
})
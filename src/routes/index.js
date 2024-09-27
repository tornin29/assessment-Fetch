import express from 'express'
import receipt from './receipt.js'


const router = express.Router()

router.use('/receipts', receipt)

export default router
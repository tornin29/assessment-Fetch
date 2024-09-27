import express from 'express'
import { getPonts, processReceipt } from '../controller/receipt.js'


const router = express.Router()

router.post('/process', processReceipt)

router.get("/:id/points", getPonts);

export default router
import express from 'express'
import { createJournalEntry } from '../controllers/journalEntries.mjs'
const router = express.Router()

router.post('/', createJournalEntry)

export default router
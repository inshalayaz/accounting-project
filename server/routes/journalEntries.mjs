import express from 'express'
import { createJournalEntry, getAllJournalEntries, getCurrentJournalEntries } from '../controllers/journalEntries.mjs'
const router = express.Router()

router.get('/all-entries', getAllJournalEntries)
router.get('/current-entries', getCurrentJournalEntries)
router.post('/create-entry', createJournalEntry)

export default router
import express from 'express'

import { createAccount, getAccounts, getTAccounts } from '../controllers/accounts.mjs'

const router = express.Router()

router.post('/', createAccount)
router.get('/getAccounts', getAccounts)
router.post('/getTAcounts', getTAccounts)

export default router
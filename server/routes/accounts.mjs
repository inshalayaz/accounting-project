import express from 'express'

import { createAccount, getAccounts } from '../controllers/accounts.mjs'

const router = express.Router()

router.post('/', createAccount)
router.get('/getAccounts', getAccounts)

export default router